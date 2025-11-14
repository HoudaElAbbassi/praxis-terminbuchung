# Deployment & Hosting - Stabilitäts-Checkliste

## 📋 Übersicht

Diese Checkliste hilft dir, die Praxis-Website stabil und sicher in Produktion zu betreiben.

---

## ✅ Sofort-Maßnahmen (Priorität 1)

### 1. Environment Variables absichern

**Netlify Dashboard prüfen:**
```
Site Settings → Environment Variables
```

**Erforderliche Variablen:**
- ✅ `DATABASE_URL` - Neon Connection String mit Pooling
- ✅ `NEXTAUTH_URL` - Production URL (https://...)
- ✅ `NEXTAUTH_SECRET` - Sicherer Random String
- ✅ `SMTP_HOST` - Strato SMTP Server
- ✅ `SMTP_PORT` - 587
- ✅ `SMTP_USER` - Email-Adresse
- ✅ `SMTP_PASSWORD` - Email-Passwort
- ✅ `EMAIL_FROM` - Absender-Email
- ✅ `PRACTICE_EMAIL` - Praxis-Email für Benachrichtigungen

**Sicherheit:**
- ❌ NIEMALS Secrets in Code committen
- ❌ NIEMALS `.env` in Git pushen (ist in `.gitignore`)
- ✅ Secrets nur in Netlify Environment Variables

---

### 2. Datenbank Connection Pooling

**Problem:** Serverless Functions öffnen viele DB-Connections
**Lösung:** Connection Pooling aktivieren

**In Neon Dashboard:**
1. Gehe zu Connection Details
2. Kopiere "Pooled connection" String
3. Füge in Netlify unter `DATABASE_URL` ein

**Format:**
```
postgresql://user:password@host/database?pgbouncer=true&connection_limit=5
```

**Wichtig:** `connection_limit=5` verhindert zu viele Connections

---

### 3. Health Check einrichten

**Bereits implementiert:** `/api/health`

**Testen:**
```bash
curl https://deine-domain.netlify.app/api/health
```

**Erwartete Antwort:**
```json
{
  "status": "healthy",
  "database": "connected",
  "responseTime": "45ms",
  "timestamp": "2025-01-14T10:30:00.000Z"
}
```

---

### 4. Monitoring Setup

#### Option A: UptimeRobot (Kostenlos, empfohlen)

1. Account erstellen: https://uptimerobot.com
2. Monitor hinzufügen:
   - Type: **HTTP(s)**
   - URL: `https://deine-domain.netlify.app/api/health`
   - Interval: **5 Minuten**
   - Alert Contacts: Deine Email

**Benachrichtigung bei:**
- ❌ Website offline
- ❌ Health Check fehlschlägt
- ❌ Antwortzeit > 10 Sekunden

#### Option B: Netlify Analytics (Kostenpflichtig)

- Build-Performance
- Traffic-Statistiken
- Error-Tracking

**Preis:** ~9€/Monat

---

## 🔒 Sicherheits-Checkliste

### 1. HTTPS erzwingen

**In Netlify:**
```
Site Settings → Domain Management → HTTPS
✅ Force HTTPS aktivieren
```

### 2. Security Headers setzen

**Datei erstellen:** `netlify.toml` im Root

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

### 3. Rate Limiting aktivieren

**Bereits implementiert in:** `lib/rate-limit.ts`

**Anwenden in kritischen Endpoints:**

```typescript
// Beispiel: app/api/appointments/public/route.ts
import { appointmentLimiter, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  // Rate Limiting Check
  const clientIp = getClientIp(request);
  const allowed = await appointmentLimiter.check(clientIp);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
      { status: 429 }
    );
  }

  // Rest der Logik...
}
```

**Endpoints die geschützt werden sollten:**
- ✅ `/api/appointments/public` - Terminbuchung
- ✅ `/api/auth/login` - Login-Versuche
- ✅ `/api/contact` - Kontaktformular (wenn vorhanden)

---

## 📊 Performance-Optimierung

### 1. Prisma Connection optimieren

**In `lib/prisma.ts`:**

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**Vorteile:**
- ✅ Verhindert zu viele Prisma Clients
- ✅ Reduziert Memory-Usage
- ✅ Bessere Performance

### 2. Next.js Caching nutzen

**Statische Seiten:**
```typescript
// app/leistungen/page.tsx
export const revalidate = 3600; // 1 Stunde Cache

export default function LeistungenPage() {
  // ...
}
```

### 3. Image Optimization

**Immer Next.js Image Component verwenden:**
```tsx
import Image from 'next/image';

<Image
  src="/images/logo.jpg"
  alt="Praxis Logo"
  width={200}
  height={200}
  priority // Für above-the-fold Images
/>
```

---

## 🗄️ Backup-Strategie

### 1. Datenbank-Backups (Neon)

**Automatische Backups:**
- Neon Free: Keine automatischen Backups
- Neon Pro (19$/Monat): Tägliche Backups + Point-in-Time Recovery

**Manuelles Backup (empfohlen für Free Tier):**

```bash
# Alle 7 Tage ausführen
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Hochladen zu sicherem Speicher (z.B. Dropbox, Google Drive)
```

**Automatisierung mit GitHub Actions:**

```yaml
# .github/workflows/backup.yml
name: Database Backup

on:
  schedule:
    - cron: '0 2 * * 0' # Sonntags um 2 Uhr

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Backup Database
        run: |
          pg_dump ${{ secrets.DATABASE_URL }} > backup.sql
          # Upload zu Cloud Storage
```

### 2. Code-Backups

**Bereits automatisch durch Git/GitHub:**
- ✅ Jeder Commit ist ein Backup
- ✅ GitHub speichert komplette Historie

**Zusätzlich empfohlen:**
- Lokales Backup auf externem Laufwerk
- Oder: GitHub Repository auf privates GitLab/Bitbucket spiegeln

---

## 🚨 Incident Response Plan

### Was tun bei Ausfall?

#### 1. **Website nicht erreichbar**

**Checkliste:**
1. Prüfe Health Check: `https://domain/api/health`
2. Prüfe Netlify Status: https://www.netlifystatus.com/
3. Prüfe Netlify Deploy Logs
4. Prüfe Netlify Functions Logs

**Netlify Logs prüfen:**
```
Netlify Dashboard → Site → Deploys → [Latest Deploy] → Deploy Log
Netlify Dashboard → Site → Functions → [Function Name] → Logs
```

#### 2. **Datenbank-Fehler**

**Symptome:**
- 500 Error bei Terminbuchung
- "Too many connections"
- "Connection timeout"

**Sofort-Maßnahmen:**
1. Prüfe Neon Dashboard → Connections
2. Falls > 20 Connections: Connection Pooling aktivieren
3. Notfall: Database neu starten (Neon Dashboard)

#### 3. **Email-Versand funktioniert nicht**

**Symptome:**
- Bestätigungsemail kommt nicht an
- "Authentication failed" in Logs

**Prüfen:**
1. SMTP-Credentials korrekt in Netlify?
2. Strato-Email-Account aktiv?
3. Prüfe Netlify Functions Logs nach Error-Details

**Test:**
```bash
# Lokal testen
npm run dev
# Terminbuchung durchführen
# Console-Output prüfen
```

---

## 📈 Skalierungs-Überlegungen

### Aktuelles Setup (Kostenlos/Günstig):

```
Netlify Free Tier:
- 100 GB Bandbreite/Monat
- 300 Build-Minuten/Monat
- 125.000 Function-Aufrufe/Monat

Neon Free Tier:
- 0.5 GB Speicher
- 20 gleichzeitige Connections
- Shared CPU

Ausreichend für: ~1.000 Terminbuchungen/Monat
```

### Wann Upgrade nötig?

**Netlify Pro ($19/Monat) wenn:**
- > 100 GB Traffic/Monat
- > 300 Build-Minuten/Monat
- Analytics gewünscht

**Neon Pro ($19/Monat) wenn:**
- > 20 gleichzeitige DB-Connections
- Automatische Backups gewünscht
- Point-in-Time Recovery nötig

**Alternative: Vercel ($20/Monat):**
- Bessere Next.js Integration
- Mehr Function-Laufzeit
- Edge Functions verfügbar

---

## 🔍 Logging & Debugging

### Produktions-Logs einsehen

**Netlify Function Logs:**
```
Dashboard → Functions → [Function Name] → Logs
```

**Filtern nach Errors:**
```
Suche nach: "error" oder "failed"
```

### Strukturiertes Logging nutzen

**Bereits implementiert:** `lib/logger.ts`

**Verwendung in Code:**
```typescript
import { logger } from '@/lib/logger';

// Info
logger.info('Appointment created', { appointmentId: '123' });

// Error
logger.error('Database connection failed', error);

// Debug (nur Development)
logger.debug('Processing request', { userId: '456' });
```

**In Produktion:**
Logs werden als JSON ausgegeben → einfach zu parsen

---

## ✨ Best Practices

### 1. Deployment-Workflow

```
1. Lokale Entwicklung
   ↓
2. Tests durchführen (npm run build)
   ↓
3. Commit + Push zu GitHub
   ↓
4. Netlify baut automatisch
   ↓
5. Preview-URL prüfen
   ↓
6. Bei Erfolg: Production Deploy
```

### 2. Environment-basierte Config

**Development:**
```env
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
```

**Production (Netlify):**
```env
NODE_ENV=production
NEXTAUTH_URL=https://praxis-terminbuchung.netlify.app
```

### 3. Graceful Degradation

**Email-Fehler:**
```typescript
try {
  await sendEmail(...)
} catch (error) {
  logger.error('Email failed', error);
  // Termin wird trotzdem gespeichert!
  // Admin erhält Termin in Dashboard
}
```

**Vorteil:** System bleibt funktional auch bei Teil-Ausfällen

---

## 📝 Wartungs-Checkliste

### Täglich:
- ✅ Prüfe UptimeRobot Benachrichtigungen
- ✅ Kurzer Blick auf Netlify Dashboard

### Wöchentlich:
- ✅ Netlify Build Logs durchsehen
- ✅ Function Logs auf Errors prüfen
- ✅ Performance: Antwortzeiten prüfen

### Monatlich:
- ✅ Dependencies updaten (`npm outdated`)
- ✅ Sicherheits-Updates (`npm audit`)
- ✅ Neon Database Speicher prüfen
- ✅ Netlify Bandwidth-Nutzung prüfen
- ✅ Manuelles DB-Backup erstellen (wenn Free Tier)

### Quartalsweise:
- ✅ Vollständige Security-Audit
- ✅ Performance-Review
- ✅ Backup-Recovery testen
- ✅ Disaster-Recovery-Plan durchspielen

---

## 🆘 Support-Kontakte

**Netlify:**
- Status: https://www.netlifystatus.com/
- Support: https://www.netlify.com/support/
- Community: https://answers.netlify.com/

**Neon:**
- Status: https://neonstatus.com/
- Discord: https://discord.gg/neon
- Docs: https://neon.tech/docs

**Next.js:**
- Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js
- Discord: https://nextjs.org/discord

---

## 📚 Weiterführende Ressourcen

- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)
- [Netlify Security](https://docs.netlify.com/security/secure-access-to-sites/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [DSGVO für Websites](https://www.datenschutz.org/dsgvo-website/)

---

**Letzte Aktualisierung:** Januar 2025
**Version:** 1.0
