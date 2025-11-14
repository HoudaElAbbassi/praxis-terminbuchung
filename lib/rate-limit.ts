/**
 * Simple In-Memory Rate Limiter
 *
 * Achtung: Funktioniert nur auf einem Server
 * Für Multi-Server-Setup: Upstash Redis verwenden
 *
 * Verwendung:
 * import { rateLimit } from '@/lib/rate-limit';
 *
 * const limiter = rateLimit({ interval: 60000, limit: 10 });
 * const allowed = await limiter.check('user-ip-or-id');
 */

interface RateLimitConfig {
  interval: number; // Zeitfenster in ms (z.B. 60000 = 1 Minute)
  limit: number;    // Max. Anfragen im Zeitfenster
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;

    // Cleanup alle 5 Minuten
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  async check(identifier: string): Promise<boolean> {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // Neuer Eintrag oder abgelaufen
    if (!entry || now > entry.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.interval,
      });
      return true;
    }

    // Limit noch nicht erreicht
    if (entry.count < this.config.limit) {
      entry.count++;
      return true;
    }

    // Limit erreicht
    return false;
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

// Vordefinierte Rate Limiter für verschiedene Endpoints
export const publicApiLimiter = new RateLimiter({
  interval: 60 * 1000, // 1 Minute
  limit: 30,           // 30 Anfragen pro Minute
});

export const appointmentLimiter = new RateLimiter({
  interval: 60 * 60 * 1000, // 1 Stunde
  limit: 5,                 // 5 Terminbuchungen pro Stunde
});

export const authLimiter = new RateLimiter({
  interval: 15 * 60 * 1000, // 15 Minuten
  limit: 5,                 // 5 Login-Versuche
});

/**
 * Helper-Funktion um IP-Adresse aus Request zu extrahieren
 */
export function getClientIp(request: Request): string {
  // Netlify/Vercel fügen Real IP in Header ein
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return (
    forwarded?.split(',')[0] ||
    realIp ||
    'unknown'
  );
}
