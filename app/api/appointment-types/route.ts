import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Cache für 5 Minuten (300 Sekunden)
export const revalidate = 300;

export async function GET() {
  try {
    const appointmentTypes = await prisma.appointmentType.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      // Nur benötigte Felder auswählen für schnellere Abfrage
      select: {
        id: true,
        name: true,
        duration: true,
        description: true,
      },
    });

    return NextResponse.json(appointmentTypes, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error("Error fetching appointment types:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Terminarten" },
      { status: 500 }
    );
  }
}
