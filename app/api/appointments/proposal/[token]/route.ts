import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    // Await params (Next.js 15+ requirement)
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Token ist erforderlich" },
        { status: 400 }
      );
    }

    // Find proposal by token
    const proposal = await prisma.appointmentProposal.findUnique({
      where: { token },
      include: {
        appointment: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            appointmentType: {
              select: {
                name: true,
                duration: true,
                description: true,
              },
            },
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
    const alreadyResponded = !!proposal.patientResponse;

    // Format data for response
    const response = {
      proposal: {
        id: proposal.id,
        proposedDate: proposal.proposedDate.toISOString().split('T')[0],
        proposedTime: proposal.proposedStartTime.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        proposedEndTime: proposal.proposedEndTime.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: proposal.status,
        patientResponse: proposal.patientResponse,
        rejectionReason: proposal.rejectionReason,
        respondedAt: proposal.respondedAt,
        alreadyResponded,
        appointment: {
          appointmentType: proposal.appointment.appointmentType,
          user: proposal.appointment.user,
          preferredDays: proposal.appointment.preferredDays,
          preferredTimeSlots: proposal.appointment.preferredTimeSlots,
          urgency: proposal.appointment.urgency,
          specialRemarks: proposal.appointment.specialRemarks,
          insuranceType: proposal.appointment.insuranceType,
          isFirstVisit: proposal.appointment.isFirstVisit,
          reasonForVisit: proposal.appointment.reasonForVisit,
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden des Terminvorschlags" },
      { status: 500 }
    );
  }
}
