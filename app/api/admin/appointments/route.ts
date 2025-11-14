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

    if (dateParam) {
      // If date is provided, filter by that specific date
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
              address: true,
              dateOfBirth: true,
            },
          },
          appointmentType: true,
        },
        orderBy: {
          startTime: "asc",
        },
      });

      return NextResponse.json(appointments);
    } else {
      // If no date provided, show:
      // 1. PENDING appointments without a date (new appointment requests)
      // 2. Upcoming appointments with dates (from today onwards)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const appointments = await prisma.appointment.findMany({
        where: {
          OR: [
            // PENDING appointments without a date (waiting for admin to set time)
            {
              status: "PENDING",
              date: null,
            },
            // Appointments with dates >= today
            {
              date: {
                gte: today,
              },
              status: {
                in: ["PENDING", "CONFIRMED", "COMPLETED"],
              },
            },
          ],
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              address: true,
              dateOfBirth: true,
            },
          },
          appointmentType: true,
        },
        orderBy: [
          // PENDING appointments without dates first
          { date: "asc" }, // null dates will come first
          { startTime: "asc" },
        ],
        take: 50, // Limit to 50 appointments
      });

      return NextResponse.json(appointments);
    }
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Termine" },
      { status: 500 }
    );
  }
}
