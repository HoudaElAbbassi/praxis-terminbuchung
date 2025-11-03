import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendAppointmentConfirmedEmail, sendAppointmentRejectedEmail } from "@/lib/email";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Ungültiger Status" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        appointmentType: true,
      },
    });

    // Send email notification to patient about status change
    const appointmentDate = new Date(appointment.date).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const appointmentTime = new Date(appointment.startTime).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const emailData = {
      patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
      patientEmail: appointment.user.email,
      date: appointmentDate,
      time: appointmentTime,
      appointmentType: appointment.appointmentType.name,
      doctorName: "Dr. med. Abdelkarim Alyandouzi",
    };

    if (status === "CONFIRMED") {
      await sendAppointmentConfirmedEmail(emailData);
    } else if (status === "CANCELLED") {
      await sendAppointmentRejectedEmail(emailData);
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren des Terminstatus" },
      { status: 500 }
    );
  }
}
