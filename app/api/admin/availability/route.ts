import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const availabilities = await prisma.availability.findMany({
      orderBy: [
        { dayOfWeek: "asc" },
        { startTime: "asc" }
      ],
    });

    return NextResponse.json(availabilities);
  } catch (error) {
    console.error("Error fetching availabilities:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Verfügbarkeiten" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const body = await request.json();
    const { dayOfWeek, startTime, endTime, isActive } = body;

    // Validate required fields
    if (!dayOfWeek || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Alle Pflichtfelder müssen ausgefüllt werden" },
        { status: 400 }
      );
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return NextResponse.json(
        { error: "Ungültiges Zeitformat. Bitte verwenden Sie HH:MM" },
        { status: 400 }
      );
    }

    // Validate that startTime is before endTime
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    if (startMinutes >= endMinutes) {
      return NextResponse.json(
        { error: "Startzeit muss vor der Endzeit liegen" },
        { status: 400 }
      );
    }

    const availability = await prisma.availability.create({
      data: {
        dayOfWeek,
        startTime,
        endTime,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error("Error creating availability:", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen der Verfügbarkeit" },
      { status: 500 }
    );
  }
}
