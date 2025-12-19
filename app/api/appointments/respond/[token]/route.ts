import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendProposalAcceptanceConfirmation,
  sendProposalAcceptedEmailToAdmin,
  sendProposalRejectedEmailToAdmin,
} from "@/lib/email";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    // Await params (Next.js 15+ requirement)
    const { token } = await params;
    const body = await request.json();
    const { action, rejectionReason } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Token ist erforderlich" },
        { status: 400 }
      );
    }

    if (!action || !["accept", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Ungültige Aktion. Muss 'accept' oder 'reject' sein" },
        { status: 400 }
      );
    }

    // Find proposal by token
    const proposal = await prisma.appointmentProposal.findUnique({
      where: { token },
      include: {
        appointment: {
          include: {
            user: true,
            appointmentType: true,
          },
        },
      },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: "Terminvorschlag nicht gefunden" },
        { status: 404 }
      );
    }

    // Check if already responded
    if (proposal.patientResponse) {
      return NextResponse.json(
        {
          error: "Sie haben bereits auf diesen Vorschlag geantwortet",
          alreadyResponded: true,
          previousResponse: proposal.patientResponse,
        },
        { status: 400 }
      );
    }

    // Check if status is PENDING
    if (proposal.status !== "PENDING") {
      return NextResponse.json(
        { error: "Dieser Vorschlag ist nicht mehr aktiv" },
        { status: 400 }
      );
    }

    const appointment = proposal.appointment;
    const patientName = `${appointment.user.firstName} ${appointment.user.lastName}`;
    const formattedDate = proposal.proposedDate.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = proposal.proposedStartTime.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (action === "accept") {
      // ACCEPT FLOW

      // Update proposal status to ACCEPTED
      await prisma.appointmentProposal.update({
        where: { id: proposal.id },
        data: {
          status: "ACCEPTED",
          patientResponse: "ACCEPTED",
          respondedAt: new Date(),
        },
      });

      // Update appointment with confirmed date/time and status
      await prisma.appointment.update({
        where: { id: appointment.id },
        data: {
          date: proposal.proposedDate,
          startTime: proposal.proposedStartTime,
          endTime: proposal.proposedEndTime,
          status: "CONFIRMED",
        },
      });

      // Send confirmation email to patient (non-blocking)
      try {
        await sendProposalAcceptanceConfirmation({
          patientName,
          patientEmail: appointment.user.email,
          date: formattedDate,
          time: formattedTime,
          appointmentType: appointment.appointmentType.name,
        });
        console.log('✅ Acceptance confirmation sent to patient');
      } catch (emailError) {
        console.error('⚠️ Failed to send patient confirmation:', emailError);
      }

      // Send notification email to admin (non-blocking)
      try {
        await sendProposalAcceptedEmailToAdmin({
          patientName,
          patientEmail: appointment.user.email,
          date: formattedDate,
          time: formattedTime,
          appointmentType: appointment.appointmentType.name,
        });
        console.log('✅ Admin notification sent');
      } catch (emailError) {
        console.error('⚠️ Failed to send admin notification:', emailError);
      }

      return NextResponse.json({
        success: true,
        action: "accepted",
        message: "Termin erfolgreich angenommen",
        appointment: {
          date: formattedDate,
          time: formattedTime,
          type: appointment.appointmentType.name,
        },
      });
    } else {
      // REJECT FLOW

      // Update proposal status to REJECTED
      await prisma.appointmentProposal.update({
        where: { id: proposal.id },
        data: {
          status: "REJECTED",
          patientResponse: "REJECTED",
          rejectionReason: rejectionReason || null,
          respondedAt: new Date(),
        },
      });

      // Update appointment status back to PENDING
      await prisma.appointment.update({
        where: { id: appointment.id },
        data: {
          status: "PENDING",
        },
      });

      // Send notification email to admin (non-blocking)
      try {
        await sendProposalRejectedEmailToAdmin({
          patientName,
          patientEmail: appointment.user.email,
          date: formattedDate,
          time: formattedTime,
          appointmentType: appointment.appointmentType.name,
          rejectionReason,
        });
        console.log('✅ Admin rejection notification sent');
      } catch (emailError) {
        console.error('⚠️ Failed to send admin rejection notification:', emailError);
      }

      return NextResponse.json({
        success: true,
        action: "rejected",
        message: "Ihre Rückmeldung wurde übermittelt",
      });
    }
  } catch (error) {
    console.error("Error processing response:", error);
    return NextResponse.json(
      { error: "Fehler beim Verarbeiten Ihrer Antwort" },
      { status: 500 }
    );
  }
}
