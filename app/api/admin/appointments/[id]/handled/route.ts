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
    const { handledInternally } = await req.json();

    if (typeof handledInternally !== "boolean") {
      return NextResponse.json({ error: "Ungültiger Wert" }, { status: 400 });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { handledInternally },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error updating handledInternally:", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren des Termins" },
      { status: 500 }
    );
  }
}
