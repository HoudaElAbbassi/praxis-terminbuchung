import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const appointmentTypes = await prisma.appointmentType.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(appointmentTypes);
  } catch (error) {
    console.error("Error fetching appointment types:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Terminarten" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const body = await req.json();
    const { name, duration, description } = body;

    if (!name || !duration) {
      return NextResponse.json(
        { error: "Name und Dauer sind erforderlich" },
        { status: 400 }
      );
    }

    const appointmentType = await prisma.appointmentType.create({
      data: {
        name,
        duration: parseInt(duration),
        description: description || null,
        isActive: true,
      },
    });

    return NextResponse.json(appointmentType, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment type:", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen der Terminart" },
      { status: 500 }
    );
  }
}
