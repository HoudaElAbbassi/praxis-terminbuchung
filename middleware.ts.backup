import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  // Public routes
  const publicRoutes = ["/", "/auth/login", "/auth/register"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  // Protect admin routes
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Protect patient routes
  if (pathname.startsWith("/termine") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
