import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendAppointmentConfirmedEmail, sendAppointmentCancelledEmail, sendAppointmentRejectedEmail } from "@/lib/email";

// Helper: Präferenzen in lesbaren Text umwandeln
function formatPreferredDays(preferredDays: string | null): string {
  if (!preferredDays) return "Keine Angabe";
  try {
    const days = JSON.parse(preferredDays);
    const dayNames: Record<string, string> = {
      MONDAY: "Montag",
      TUESDAY: "Dienstag",
      WEDNESDAY: "Mittwoch",
      THURSDAY: "Donnerstag",
      FRIDAY: "Freitag",
    };
    return days.map((d: string) => dayNames[d] || d).join(", ");
  } catch {
    return preferredDays;
  }
}

function formatPreferredTimeSlots(preferredTimeSlots: string | null): string {
  if (!preferredTimeSlots) return "Keine Angabe";
  try {
    const slots = JSON.parse(preferredTimeSlots);
    const slotNames: Record<string, string> = {
      morning: "Vormittags (8-12 Uhr)",
      afternoon: "Nachmittags (12-17 Uhr)",
    };
    return slots.map((s: string) => slotNames[s] || s).join(", ");
  } catch {
    return preferredTimeSlots;
  }
}

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

    // Prüfen ob ein konkreter Termin festgelegt wurde
    const hasConcreteAppointment = appointment.date && appointment.startTime;

    // Send email notifications (non-blocking)
    try {
      if (status === "CONFIRMED" && hasConcreteAppointment) {
        // Bestätigung eines konkreten Termins
        const appointmentDate = new Date(appointment.date!).toLocaleDateString("de-DE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const appointmentTime = new Date(appointment.startTime!).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        });

        await sendAppointmentConfirmedEmail({
          patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
          patientEmail: appointment.user.email,
          date: appointmentDate,
          time: appointmentTime,
          appointmentType: appointment.appointmentType.name,
          doctorName: "Abdelkarim Alyandouzi",
        });
        console.log('✅ Appointment confirmation email sent successfully');

      } else if (status === "CANCELLED") {
        if (hasConcreteAppointment) {
          // Absage eines bestätigten/konkreten Termins
          const appointmentDate = new Date(appointment.date!).toLocaleDateString("de-DE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const appointmentTime = new Date(appointment.startTime!).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          });

          await sendAppointmentCancelledEmail({
            patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
            patientEmail: appointment.user.email,
            date: appointmentDate,
            time: appointmentTime,
            appointmentType: appointment.appointmentType.name,
            doctorName: "Abdelkarim Alyandouzi",
          });
          console.log('✅ Appointment cancellation email sent successfully');

        } else {
          // Ablehnung einer Anfrage (noch kein konkreter Termin)
          const preferredDays = formatPreferredDays(appointment.preferredDays);
          const preferredTimeSlots = formatPreferredTimeSlots(appointment.preferredTimeSlots);

          await sendAppointmentRejectedEmail({
            patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
            patientEmail: appointment.user.email,
            date: preferredDays,
            time: preferredTimeSlots,
            appointmentType: appointment.appointmentType.name,
            doctorName: "Abdelkarim Alyandouzi",
          });
          console.log('✅ Appointment rejection email sent successfully');
        }
      }
    } catch (emailError) {
      console.error('⚠️ Failed to send status change email:', emailError);
      // Continue - status change is still valid even if email fails
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
