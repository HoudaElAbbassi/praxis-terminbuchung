import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { isActive } = body;

    const appointmentType = await prisma.appointmentType.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(appointmentType);
  } catch (error) {
    console.error("Error updating appointment type:", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren der Terminart" },
      { status: 500 }
    );
  }
}
