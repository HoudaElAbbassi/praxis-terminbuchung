# Deployment-Anleitung für Netlify

## Voraussetzungen

### 1. PostgreSQL-Datenbank einrichten

Ihre Applikation benötigt eine PostgreSQL-Datenbank. Empfohlene Anbieter:

- **Neon** (https://neon.tech) - Kostenloses Tier verfügbar
- **Supabase** (https://supabase.com) - Kostenloses Tier verfügbar
- **Vercel Postgres** (https://vercel.com/storage/postgres)

Kopieren Sie die `DATABASE_URL` (Connection String) von Ihrem Datenbank-Anbieter.

### 2. NEXTAUTH_SECRET generieren

Führen Sie lokal aus:
```bash
openssl rand -base64 32
```

Kopieren Sie das generierte Secret.

## Deployment auf Netlify

### Schritt 1: Netlify-Projekt erstellen

1. Gehen Sie zu https://app.netlify.com
2. Klicken Sie auf "Add new site" → "Import an existing project"
3. Verbinden Sie Ihr GitHub-Repository
4. Wählen Sie das Repository `praxis-terminbuchung` aus

### Schritt 2: Build-Einstellungen

Netlify sollte automatisch diese Einstellungen erkennen:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 20

Falls nicht, tragen Sie diese manuell ein.

### Schritt 3: Umgebungsvariablen setzen

Gehen Sie zu: **Site configuration** → **Environment variables**

Fügen Sie folgende Variablen hinzu:

| Variable | Wert | Beispiel |
|----------|------|----------|
| `DATABASE_URL` | Ihre PostgreSQL Connection String | `postgresql://user:pass@host.neon.tech/dbname?sslmode=require` |
| `NEXTAUTH_URL` | Ihre Netlify-URL | `https://ihre-app.netlify.app` |
| `NEXTAUTH_SECRET` | Generiertes Secret | `[output von openssl rand -base64 32]` |

**Optional:**
- `EMAIL_SERVER` - SMTP-Server für E-Mail-Benachrichtigungen
- `EMAIL_FROM` - Absender-E-Mail-Adresse
- `RESEND_API_KEY` - Resend API Key (falls Sie Resend verwenden)

### Schritt 4: Datenbank initialisieren

Nach dem ersten erfolgreichen Deployment:

1. Öffnen Sie ein Terminal auf Ihrem lokalen Rechner
2. Setzen Sie die Produktions-DATABASE_URL temporär:
   ```bash
   export DATABASE_URL="ihre-produktions-database-url"
   ```
3. Führen Sie aus:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

Dies erstellt die Datenbank-Tabellen und einen Admin-Benutzer:
- **Email:** admin@praxis.de
- **Passwort:** admin123

**WICHTIG:** Ändern Sie das Admin-Passwort sofort nach dem ersten Login!

### Schritt 5: Deploy auslösen

Klicken Sie auf "Deploy site" oder pushen Sie eine Änderung zu GitHub.

## Troubleshooting

### Build-Fehler: "@prisma/client did not initialize yet"

**Lösung:** Die `package.json` enthält bereits `postinstall: "prisma generate"`.
Stellen Sie sicher, dass die `DATABASE_URL` in den Netlify Environment Variables gesetzt ist.

### Build-Fehler: "UserRole not found"

**Lösung:** Bereits behoben in `lib/auth.ts` - UserRole ist als lokaler Type definiert.

### Runtime-Fehler: "Database connection failed"

**Ursachen:**
1. `DATABASE_URL` nicht gesetzt oder falsch
2. Datenbank nicht erreichbar
3. SSL-Modus falsch konfiguriert

**Lösung:** Prüfen Sie:
- Netlify Environment Variables korrekt gesetzt
- Connection String enthält `?sslmode=require` am Ende
- Datenbank-Firewall erlaubt Verbindungen von Netlify

### "Invalid NEXTAUTH_SECRET"

**Lösung:**
- Generieren Sie einen neuen Secret mit `openssl rand -base64 32`
- Setzen Sie ihn in den Netlify Environment Variables
- Triggern Sie einen neuen Deploy

## Nach dem Deployment

### 1. Admin-Login testen
- Gehen Sie zu `https://ihre-app.netlify.app/admin`
- Login mit: admin@praxis.de / admin123
- Ändern Sie sofort das Passwort!

### 2. Verfügbarkeiten einrichten
- Admin → Verfügbarkeit
- Fügen Sie Ihre Praxis-Öffnungszeiten hinzu

### 3. Rechtliche Seiten anpassen
- Bearbeiten Sie `/app/impressum/page.tsx`
- Bearbeiten Sie `/app/datenschutz/page.tsx`
- Ersetzen Sie alle `[BITTE ANPASSEN]` Platzhalter mit Ihren echten Daten

### 4. Footer anpassen
- Bearbeiten Sie `/components/Footer.tsx`
- Ersetzen Sie Platzhalter-Kontaktdaten

## Vercel als Alternative

Falls Sie Vercel bevorzugen:

1. Gehen Sie zu https://vercel.com
2. Import GitHub Repository
3. Vercel erkennt Next.js automatisch
4. Fügen Sie Environment Variables hinzu (wie bei Netlify)
5. Deploy!

Vercel Postgres kann direkt in Vercel unter "Storage" eingerichtet werden.

## Support

Bei Problemen:
- Prüfen Sie die Netlify Build-Logs
- Prüfen Sie die Netlify Function Logs (Runtime)
- Stellen Sie sicher, dass alle Environment Variables gesetzt sind
