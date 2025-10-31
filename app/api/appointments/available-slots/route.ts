import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Konfiguration - später aus Settings-Tabelle laden
const OPENING_TIME = 8; // 8:00 Uhr
const CLOSING_TIME = 16; // 16:00 Uhr
const SLOT_DURATION = 15; // Basis-Slot: 15 Minuten
const BUFFER_TIME = 5; // Pufferzeit zwischen Terminen: 5 Minuten

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get("date");
    const typeId = searchParams.get("typeId");

    if (!date || !typeId) {
      return NextResponse.json(
        { error: "Datum und Terminart sind erforderlich" },
        { status: 400 }
      );
    }

    // Get appointment type
    const appointmentType = await prisma.appointmentType.findUnique({
      where: { id: typeId },
    });

    if (!appointmentType) {
      return NextResponse.json(
        { error: "Terminart nicht gefunden" },
        { status: 404 }
      );
    }

    // Parse selected date
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return NextResponse.json([]);
    }

    // Check if it's a weekend (Saturday = 6, Sunday = 0)
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return NextResponse.json([]);
    }

    // Get all appointments for this date
    const appointments = await prisma.appointment.findMany({
      where: {
        date: selectedDate,
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    // Generate all possible time slots
    const slots = [];
    const appointmentDuration = appointmentType.duration;
    const totalSlotTime = appointmentDuration + BUFFER_TIME;

    // Start from opening time
    let currentTime = OPENING_TIME * 60; // Convert to minutes
    const closingTimeMinutes = CLOSING_TIME * 60;

    while (currentTime + appointmentDuration <= closingTimeMinutes) {
      const hours = Math.floor(currentTime / 60);
      const minutes = currentTime % 60;
      const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

      // Create start and end time for this slot
      const slotStart = new Date(selectedDate);
      slotStart.setHours(hours, minutes, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + appointmentDuration);

      // Check if this slot conflicts with any existing appointment
      const isAvailable = !appointments.some((appointment) => {
        const appointmentStart = new Date(appointment.startTime);
        const appointmentEnd = new Date(appointment.endTime);

        // Add buffer time to existing appointments
        appointmentEnd.setMinutes(appointmentEnd.getMinutes() + BUFFER_TIME);

        // Check for overlap
        return slotStart < appointmentEnd && slotEnd > appointmentStart;
      });

      // If it's today, check if the time has already passed
      const now = new Date();
      const isInPast = selectedDate.getTime() === today.getTime() && slotStart <= now;

      slots.push({
        time: timeString,
        available: isAvailable && !isInPast,
      });

      // Move to next slot (use SLOT_DURATION for grid, not totalSlotTime)
      currentTime += SLOT_DURATION;
    }

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der verfügbaren Zeitslots" },
      { status: 500 }
    );
  }
}
