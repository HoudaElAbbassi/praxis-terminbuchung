import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Health Check Endpoint
 *
 * Wird verwendet um zu prüfen ob:
 * - Die API erreichbar ist
 * - Die Datenbank-Verbindung funktioniert
 * - Wichtige Environment Variables gesetzt sind
 *
 * Für Monitoring-Tools wie UptimeRobot, Pingdom, etc.
 */
export async function GET() {
  const startTime = Date.now();

  try {
    // 1. Prüfe Datenbank-Verbindung
    await prisma.$queryRaw`SELECT 1`;

    // 2. Prüfe wichtige Environment Variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'NEXTAUTH_URL',
      'NEXTAUTH_SECRET',
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          error: 'Missing environment variables',
          missing: missingEnvVars,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    // 3. Response Time messen
    const responseTime = Date.now() - startTime;

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
    });

  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 } // Service Unavailable
    );
  }
}
