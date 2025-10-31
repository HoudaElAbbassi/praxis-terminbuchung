import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const searchParams = req.nextUrl.searchParams;
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json({ error: "Datum erforderlich" }, { status: 400 });
    }

    const selectedDate = new Date(dateParam);
    selectedDate.setHours(0, 0, 0, 0);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: selectedDate,
        status: {
          in: ["PENDING", "CONFIRMED", "COMPLETED"],
        },
      },
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
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Termine" },
      { status: 500 }
    );
  }
}
