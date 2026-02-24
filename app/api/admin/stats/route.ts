import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Total appointments (nur nicht intern erledigt)
    const total = await prisma.appointment.count({
      where: {
        status: {
          in: ["PENDING", "CONFIRMED", "COMPLETED"],
        },
        handledInternally: false,
      },
    });

    // Today's appointments (nur nicht intern erledigt)
    const todayCount = await prisma.appointment.count({
      where: {
        date: today,
        status: {
          in: ["PENDING", "CONFIRMED", "COMPLETED"],
        },
        handledInternally: false,
      },
    });

    // Upcoming appointments (nur nicht intern erledigt)
    const upcoming = await prisma.appointment.count({
      where: {
        OR: [
          {
            date: {
              gte: today,
            },
            status: {
              in: ["PENDING", "CONFIRMED"],
            },
            handledInternally: false,
          },
          {
            date: null,
            status: "PENDING",
            handledInternally: false,
          },
        ],
      },
    });

    // Open requests (PENDING status only)
    const openRequests = await prisma.appointment.count({
      where: {
        status: "PENDING",
      },
    });

    return NextResponse.json({
      total,
      today: todayCount,
      upcoming,
      openRequests,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Statistiken" },
      { status: 500 }
    );
  }
}
