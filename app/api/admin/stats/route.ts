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

    // Total appointments
    const total = await prisma.appointment.count({
      where: {
        status: {
          in: ["PENDING", "CONFIRMED", "COMPLETED"],
        },
      },
    });

    // Today's appointments
    const todayCount = await prisma.appointment.count({
      where: {
        date: today,
        status: {
          in: ["PENDING", "CONFIRMED", "COMPLETED"],
        },
      },
    });

    // Upcoming appointments (from tomorrow onwards)
    const upcoming = await prisma.appointment.count({
      where: {
        date: {
          gte: tomorrow,
        },
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
    });

    return NextResponse.json({
      total,
      today: todayCount,
      upcoming,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Statistiken" },
      { status: 500 }
    );
  }
}
