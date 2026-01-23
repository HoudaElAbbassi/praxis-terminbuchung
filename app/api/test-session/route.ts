import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  return NextResponse.json({
    session,
    hasSession: !!session,
    hasUser: !!session?.user,
    userRole: session?.user?.role,
    userId: session?.user?.id,
    userEmail: session?.user?.email,
  }, { status: 200 });
}
