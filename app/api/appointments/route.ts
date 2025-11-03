import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendNewAppointmentNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
    }

    const body = await req.json();
    const { appointmentTypeId, date, time } = body;

    if (!appointmentTypeId || !date || !time) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich" },
        { status: 400 }
      );
    }

    // Parse date and time
    const [hours, minutes] = time.split(":").map(Number);
    const appointmentDate = new Date(date);
    const startTime = new Date(date);
    startTime.setHours(hours, minutes, 0, 0);

    // Get appointment type to calculate end time
    const appointmentType = await prisma.appointmentType.findUnique({
      where: { id: appointmentTypeId },
    });

    if (!appointmentType) {
      return NextResponse.json(
        { error: "Terminart nicht gefunden" },
        { status: 404 }
      );
    }

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + appointmentType.duration);

    // Check if slot is still available
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
        startTime: {
          lte: endTime,
        },
        endTime: {
          gte: startTime,
        },
        status: {
          not: "CANCELLED",
        },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: "Dieser Termin ist nicht mehr verfügbar" },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: session.user.id,
        appointmentTypeId,
        date: appointmentDate,
        startTime,
        endTime,
        status: "PENDING", // Changed from CONFIRMED to PENDING - doctor must confirm first
      },
      include: {
        appointmentType: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Send email notification to patient
    const formattedDate = appointmentDate.toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = startTime.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    await sendNewAppointmentNotification({
      patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
      patientEmail: appointment.user.email,
      date: formattedDate,
      time: formattedTime,
      appointmentType: appointment.appointmentType.name,
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen des Termins" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: session.user.id,
        status: {
          not: "CANCELLED",
        },
      },
      include: {
        appointmentType: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Termine" },
      { status: 500 }
    );
  }
}
