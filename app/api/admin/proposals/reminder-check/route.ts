import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendAdminProposalReminder } from "@/lib/email";

export async function POST(request: Request) {
  try {
    // Admin authentication check
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    // Get reminder threshold from environment (default 3 days)
    const reminderDays = parseInt(process.env.PROPOSAL_REMINDER_DAYS || "3");
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - reminderDays);

    // Find all PENDING proposals older than threshold
    const pendingProposals = await prisma.appointmentProposal.findMany({
      where: {
        status: "PENDING",
        createdAt: {
          lte: thresholdDate,
        },
      },
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
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc", // Oldest first
      },
    });

    if (pendingProposals.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Keine ausstehenden Vorschläge gefunden",
        count: 0,
      });
    }

    // Group proposals by urgency
    const groupedByUrgency = {
      URGENT: pendingProposals.filter((p) => p.appointment.urgency === "URGENT"),
      NORMAL: pendingProposals.filter((p) => p.appointment.urgency === "NORMAL"),
      FLEXIBLE: pendingProposals.filter((p) => p.appointment.urgency === "FLEXIBLE"),
    };

    // Send reminder email to admin
    try {
      await sendAdminProposalReminder(pendingProposals);
      console.log(`✅ Admin reminder sent for ${pendingProposals.length} proposals`);
    } catch (emailError) {
      console.error("⚠️ Failed to send admin reminder:", emailError);
      return NextResponse.json(
        { error: "Fehler beim Senden der Erinnerung" },
        { status: 500 }
      );
    }

    // Update reminder tracking for all proposals
    const now = new Date();
    await Promise.all(
      pendingProposals.map((proposal) =>
        prisma.appointmentProposal.update({
          where: { id: proposal.id },
          data: {
            reminderSentAt: now,
            reminderCount: proposal.reminderCount + 1,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: `Erinnerung für ${pendingProposals.length} ausstehende Vorschläge gesendet`,
      summary: {
        total: pendingProposals.length,
        urgent: groupedByUrgency.URGENT.length,
        normal: groupedByUrgency.NORMAL.length,
        flexible: groupedByUrgency.FLEXIBLE.length,
      },
    });
  } catch (error) {
    console.error("Error checking proposal reminders:", error);
    return NextResponse.json(
      { error: "Fehler beim Prüfen der Erinnerungen" },
      { status: 500 }
    );
  }
}

// Also support GET for easier manual triggering/cron jobs
export async function GET(request: Request) {
  return POST(request);
}
