import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAlternativeAppointmentEmail } from "@/lib/email";
import { auth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { alternativeDate, alternativeTime, reason } = await request.json();

    if (!alternativeDate || !alternativeTime) {
      return NextResponse.json(
        { error: "Alternative date and time are required" },
        { status: 400 }
      );
    }

    // Get appointment with user details
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        user: true,
        appointmentType: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Update appointment status to CANCELLED
    await prisma.appointment.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    // Format dates for email (if appointment has confirmed date/time)
    const originalDate = appointment.date
      ? new Date(appointment.date).toLocaleDateString("de-DE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Noch nicht festgelegt";

    const originalTime = appointment.startTime
      ? new Date(appointment.startTime).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Noch nicht festgelegt";

    const altDate = new Date(alternativeDate).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Send alternative appointment email (non-blocking)
    let emailSent = false;
    try {
      const emailResult = await sendAlternativeAppointmentEmail({
        patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
        patientEmail: appointment.user.email,
        date: originalDate,
        time: originalTime,
        appointmentType: appointment.appointmentType.name,
        alternativeDate: altDate,
        alternativeTime: alternativeTime,
        reason: reason,
      });

      if (emailResult.success) {
        console.log('✅ Alternative appointment email sent successfully');
        emailSent = true;
      } else {
        console.error("⚠️ Failed to send alternative appointment email:", emailResult.error);
      }
    } catch (emailError) {
      console.error("⚠️ Error sending alternative appointment email:", emailError);
      // Continue - alternative suggestion is still valid even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Alternative appointment suggested",
      emailSent: emailSent,
    });
  } catch (error) {
    console.error("Error suggesting alternative appointment:", error);
    return NextResponse.json(
      { error: "Failed to suggest alternative appointment" },
      { status: 500 }
    );
  }
}
