import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendAppointmentConfirmedEmail } from "@/lib/email";

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
    const { date, time } = body;

    if (!date || !time) {
      return NextResponse.json(
        { error: "Datum und Uhrzeit sind erforderlich" },
        { status: 400 }
      );
    }

    // Get appointment type to calculate duration
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        appointmentType: true,
        user: true,
      },
    });

    if (!existingAppointment) {
      return NextResponse.json(
        { error: "Termin nicht gefunden" },
        { status: 404 }
      );
    }

    // Parse date and time
    const [hours, minutes] = time.split(":").map(Number);
    const appointmentDate = new Date(date);
    const startTime = new Date(date);
    startTime.setHours(hours, minutes, 0, 0);

    // Calculate end time based on appointment duration
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + existingAppointment.appointmentType.duration);

    // Check if slot is available (no other confirmed appointments at this time)
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        id: { not: id }, // Exclude current appointment
        date: appointmentDate,
        startTime: {
          lte: endTime,
        },
        endTime: {
          gte: startTime,
        },
        status: {
          in: ["PENDING", "CONFIRMED"], // Check both pending and confirmed
        },
      },
    });

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: "Zu dieser Zeit ist bereits ein Termin eingeplant" },
        { status: 400 }
      );
    }

    // Update appointment with specific date/time and set status to CONFIRMED
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        date: appointmentDate,
        startTime,
        endTime,
        status: "CONFIRMED",
      },
      include: {
        appointmentType: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    // Format date and time for email
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

    // Send confirmation email to patient
    try {
      await sendAppointmentConfirmedEmail({
        patientName: `${updatedAppointment.user.firstName} ${updatedAppointment.user.lastName}`,
        patientEmail: updatedAppointment.user.email,
        date: formattedDate,
        time: formattedTime,
        appointmentType: updatedAppointment.appointmentType.name,
        doctorName: "Abdelkarim Alyandouzi",
      });
      console.log('✅ Appointment confirmation email sent successfully');
    } catch (emailError) {
      console.error('⚠️ Failed to send confirmation email:', emailError);
      // Continue - appointment is still valid even if email fails
    }

    return NextResponse.json({
      success: true,
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error setting appointment time:", error);
    return NextResponse.json(
      { error: "Fehler beim Festlegen des Termins" },
      { status: 500 }
    );
  }
}
