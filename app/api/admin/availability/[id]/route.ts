import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const body = await request.json();
    const { dayOfWeek, startTime, endTime, isActive } = body;

    // Validate time format if provided
    if (startTime || endTime) {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (startTime && !timeRegex.test(startTime)) {
        return NextResponse.json(
          { error: "Ungültiges Zeitformat für Startzeit" },
          { status: 400 }
        );
      }
      if (endTime && !timeRegex.test(endTime)) {
        return NextResponse.json(
          { error: "Ungültiges Zeitformat für Endzeit" },
          { status: 400 }
        );
      }
    }

    // Validate that startTime is before endTime if both are provided
    if (startTime && endTime) {
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
    }

    const availability = await prisma.availability.update({
      where: { id: params.id },
      data: {
        ...(dayOfWeek && { dayOfWeek }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren der Verfügbarkeit" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    await prisma.availability.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting availability:", error);
    return NextResponse.json(
      { error: "Fehler beim Löschen der Verfügbarkeit" },
      { status: 500 }
    );
  }
}
