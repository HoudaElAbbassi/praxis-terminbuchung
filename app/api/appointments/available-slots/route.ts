import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SLOT_DURATION = 15; // Basis-Slot: 15 Minuten
const BUFFER_TIME = 5; // Pufferzeit zwischen Terminen: 5 Minuten

// Map JavaScript day to DayOfWeek enum
const dayOfWeekMap: Record<number, string> = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
};

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

    // Get day of week for selected date
    const dayOfWeek = selectedDate.getDay();
    const dayOfWeekString = dayOfWeekMap[dayOfWeek];

    // Get availabilities for this day of week
    const availabilities = await prisma.availability.findMany({
      where: {
        dayOfWeek: dayOfWeekString as any,
        isActive: true,
      },
    });

    // If no availabilities defined for this day, return empty
    if (availabilities.length === 0) {
      return NextResponse.json([]);
    }

    // Get all appointments for this date
    const appointments = await prisma.appointment.findMany({
      where: {
        date: selectedDate,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    // Generate time slots for all availability periods
    const slots: { time: string; available: boolean }[] = [];
    const appointmentDuration = appointmentType.duration;

    for (const availability of availabilities) {
      // Parse availability times (format: "HH:MM")
      const [startHour, startMinute] = availability.startTime.split(":").map(Number);
      const [endHour, endMinute] = availability.endTime.split(":").map(Number);

      let currentTime = startHour * 60 + startMinute; // Convert to minutes
      const endTimeMinutes = endHour * 60 + endMinute;

      while (currentTime + appointmentDuration <= endTimeMinutes) {
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

        // Only add if not already in slots array (avoid duplicates if availability periods overlap)
        const existingSlot = slots.find((s) => s.time === timeString);
        if (!existingSlot) {
          slots.push({
            time: timeString,
            available: isAvailable && !isInPast,
          });
        }

        // Move to next slot
        currentTime += SLOT_DURATION;
      }
    }

    // Sort slots by time
    slots.sort((a, b) => a.time.localeCompare(b.time));

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der verfügbaren Zeitslots" },
      { status: 500 }
    );
  }
}
