import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DayOfWeek } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const typeId = searchParams.get("typeId");

    if (!typeId) {
      return NextResponse.json(
        { error: "Terminart-ID erforderlich" },
        { status: 400 }
      );
    }

    // Get appointment type to know duration
    const appointmentType = await prisma.appointmentType.findUnique({
      where: { id: typeId },
    });

    if (!appointmentType) {
      return NextResponse.json(
        { error: "Terminart nicht gefunden" },
        { status: 404 }
      );
    }

    // Search for next available slot in the next 30 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() + i);

      // Skip weekends
      if (checkDate.getDay() === 0 || checkDate.getDay() === 6) {
        continue;
      }

      // Get availability for this date
      // Map JavaScript getDay() (0-6) to DayOfWeek enum
      const dayOfWeekMapping: DayOfWeek[] = [
        DayOfWeek.SUNDAY,
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
        DayOfWeek.SATURDAY,
      ];
      const dayOfWeek = dayOfWeekMapping[checkDate.getDay()];

      const availability = await prisma.availability.findFirst({
        where: {
          dayOfWeek: dayOfWeek,
        },
      });

      if (!availability || !availability.isActive) {
        continue;
      }

      // Generate time slots for this day
      const startHour = parseInt(availability.startTime.split(":")[0]);
      const startMinute = parseInt(availability.startTime.split(":")[1]);
      const endHour = parseInt(availability.endTime.split(":")[0]);
      const endMinute = parseInt(availability.endTime.split(":")[1]);

      const slots: string[] = [];
      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute < endMinute)
      ) {
        const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
        slots.push(timeString);

        currentMinute += 15;
        if (currentMinute >= 60) {
          currentMinute = 0;
          currentHour++;
        }
      }

      // Check each slot for availability
      for (const time of slots) {
        const [hours, minutes] = time.split(":").map(Number);
        const slotStart = new Date(checkDate);
        slotStart.setHours(hours, minutes, 0, 0);

        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + appointmentType.duration);

        // Check if this slot conflicts with existing appointments
        const existingAppointment = await prisma.appointment.findFirst({
          where: {
            date: checkDate,
            startTime: {
              lte: slotEnd,
            },
            endTime: {
              gte: slotStart,
            },
            status: {
              not: "CANCELLED",
            },
          },
        });

        if (!existingAppointment) {
          // Found first available slot!
          return NextResponse.json({
            date: checkDate.toISOString().split("T")[0],
            time: time,
            dateFormatted: checkDate.toLocaleDateString("de-DE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          });
        }
      }
    }

    // No available slot found in the next 30 days
    return NextResponse.json(
      { error: "Keine freien Termine in den nächsten 30 Tagen verfügbar" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error finding next available slot:", error);
    return NextResponse.json(
      { error: "Fehler beim Suchen des nächsten freien Termins" },
      { status: 500 }
    );
  }
}
