import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email erforderlich" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User nicht gefunden" }, { status: 404 });
    }

    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error) {
    console.error("Error checking role:", error);
    return NextResponse.json({ error: "Server-Fehler" }, { status: 500 });
  }
}
