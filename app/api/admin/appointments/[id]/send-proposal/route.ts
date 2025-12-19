import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendAppointmentProposalEmail } from "@/lib/email";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Admin authentication check
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    // Await params (Next.js 15+ requirement)
    const { id } = await params;

    const body = await request.json();
    const { proposedDate, proposedTime } = body;

    if (!proposedDate || !proposedTime) {
      return NextResponse.json(
        { error: "Datum und Uhrzeit sind erforderlich" },
        { status: 400 }
      );
    }

    // Get appointment with related data
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        user: true,
        appointmentType: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Termin nicht gefunden" },
        { status: 404 }
      );
    }

    // Parse date and time
    const appointmentDate = new Date(proposedDate);
    const [hours, minutes] = proposedTime.split(":");
    const proposedStartTime = new Date(proposedDate);
    proposedStartTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Calculate end time based on appointment type duration
    const proposedEndTime = new Date(proposedStartTime);
    proposedEndTime.setMinutes(
      proposedEndTime.getMinutes() + appointment.appointmentType.duration
    );

    // Check for conflicts with existing confirmed appointments
    const conflictingAppointments = await prisma.appointment.findMany({
      where: {
        status: { in: ["CONFIRMED", "PROPOSAL_SENT"] },
        date: appointmentDate,
        NOT: { id },
        OR: [
          {
            AND: [
              { startTime: { lte: proposedStartTime } },
              { endTime: { gt: proposedStartTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: proposedEndTime } },
              { endTime: { gte: proposedEndTime } },
            ],
          },
          {
            AND: [
              { startTime: { gte: proposedStartTime } },
              { endTime: { lte: proposedEndTime } },
            ],
          },
        ],
      },
    });

    if (conflictingAppointments.length > 0) {
      return NextResponse.json(
        { error: "Dieser Zeitslot ist bereits belegt" },
        { status: 409 }
      );
    }

    // Mark existing proposals for this appointment as SUPERSEDED
    await prisma.appointmentProposal.updateMany({
      where: {
        appointmentId: id,
        status: "PENDING",
      },
      data: {
        status: "SUPERSEDED",
      },
    });

    // Create new proposal
    const proposal = await prisma.appointmentProposal.create({
      data: {
        appointmentId: id,
        proposedDate: appointmentDate,
        proposedStartTime,
        proposedEndTime,
        status: "PENDING",
      },
    });

    // Update appointment status to PROPOSAL_SENT
    await prisma.appointment.update({
      where: { id },
      data: {
        status: "PROPOSAL_SENT",
      },
    });

    // Send proposal email to patient (non-blocking)
    try {
      const formattedDate = proposedDate;
      const formattedTime = proposedTime;

      await sendAppointmentProposalEmail({
        patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
        patientEmail: appointment.user.email,
        date: new Date(proposedDate).toLocaleDateString('de-DE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        time: proposedTime,
        appointmentType: appointment.appointmentType.name,
        token: proposal.token,
      });
      console.log(`✅ Proposal email sent to ${appointment.user.email}`);
    } catch (emailError) {
      console.error('⚠️ Failed to send proposal email:', emailError);
      // Continue - proposal is created even if email fails
    }

    console.log(`✅ Proposal created for appointment ${id}`);
    console.log(`   Token: ${proposal.token}`);

    return NextResponse.json({
      success: true,
      proposal: {
        id: proposal.id,
        token: proposal.token,
        proposedDate,
        proposedTime,
      },
      message: "Terminvorschlag erfolgreich erstellt",
    });
  } catch (error) {
    console.error("Error creating proposal:", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen des Vorschlags" },
      { status: 500 }
    );
  }
}
