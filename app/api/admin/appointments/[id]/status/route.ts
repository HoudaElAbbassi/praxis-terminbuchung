import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

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
      where: { id: params.id },
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

    // TODO: Send email notification to patient about status change

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren des Terminstatus" },
      { status: 500 }
    );
  }
}
