import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const { id } = await params;

    // Check if appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { proposals: true },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Termin nicht gefunden" },
        { status: 404 }
      );
    }

    // Delete related proposals first
    if (appointment.proposals.length > 0) {
      await prisma.appointmentProposal.deleteMany({
        where: { appointmentId: id },
      });
    }

    // Delete the appointment
    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Termin erfolgreich gelöscht" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Fehler beim Löschen des Termins" },
      { status: 500 }
    );
  }
}
