# 🏥 Praxis Terminbuchungssystem

Ein modernes, DSGVO-konformes Online-Terminbuchungssystem für Arztpraxen, entwickelt mit Next.js, TypeScript und PostgreSQL.

## ✨ Features

### Für Patienten:
- ✅ Benutzerregistrierung mit vollständigem Profil (Name, Email, Telefon, Geburtsdatum, Adresse)
- ✅ Sichere Authentifizierung
- ✅ Intuitive Terminbuchung mit Kalenderansicht
- ✅ Auswahl aus verschiedenen Terminarten (Erstgespräch, Standard-Konsultation, Spezialbehandlungen)
- ✅ Übersicht über gebuchte Termine
- ✅ Responsive Design für Mobile, Tablet und Desktop

### Für die Praxis (Admin):
- ✅ Admin-Dashboard mit Tagesübersicht
- ✅ Statistiken (Gesamttermine, heute, bevorstehend)
- ✅ Terminverwaltung nach Datum
- ✅ Patientendetails einsehen
- ✅ Terminarten konfigurieren (Name, Dauer, Beschreibung)
- ✅ Aktivieren/Deaktivieren von Terminarten

### Technische Features:
- ✅ Intelligente Terminslot-Berechnung (8:00-16:00 Uhr)
- ✅ Pufferzeit zwischen Terminen (5 Minuten)
- ✅ Automatische Kollisionsvermeidung
- ✅ Wochenenden automatisch ausgeschlossen
- ✅ Vergangene Zeitslots werden nicht angezeigt

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Datenbank:** PostgreSQL
- **ORM:** Prisma
- **Authentifizierung:** NextAuth.js v5
- **Password Hashing:** bcrypt

## 📋 Voraussetzungen

- Node.js 18+
- PostgreSQL Datenbank (lokal oder remote)
- npm oder yarn

## 🔧 Installation & Setup

### 1. Repository klonen / Projekt kopieren

```bash
cd praxis-terminbuchung
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Datenbank konfigurieren

Kopieren Sie die `.env.example` Datei zu `.env`:

```bash
cp .env.example .env
```

Bearbeiten Sie die `.env` Datei und fügen Sie Ihre Datenbank-URL ein:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/praxis_terminbuchung"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl"
```

**NEXTAUTH_SECRET generieren:**
```bash
openssl rand -base64 32
```

### 4. Datenbank-Schema erstellen

```bash
npm run db:push
```

Dies erstellt alle notwendigen Tabellen in Ihrer Datenbank.

### 5. Seed-Daten initialisieren

```bash
npm run db:seed
```

Dies erstellt:
- **Admin-Benutzer:**
  - Email: `admin@praxis.de`
  - Passwort: `admin123`
- **Standard-Terminarten:**
  - Erstgespräch (45 Min)
  - Standard-Konsultation (30 Min)
  - Spezialbehandlung (60 Min)

### 6. Development Server starten

```bash
npm run dev
```

Die Anwendung ist nun erreichbar unter: **http://localhost:3000**

## 📱 Verwendung

### Als Patient:

1. Gehen Sie zu **http://localhost:3000**
2. Klicken Sie auf **"Jetzt registrieren"**
3. Füllen Sie das Registrierungsformular aus
4. Nach der Registrierung melden Sie sich an
5. Klicken Sie auf **"Termin buchen"**
6. Wählen Sie:
   - Terminart
   - Datum
   - Uhrzeit
7. Bestätigen Sie Ihre Buchung

### Als Admin:

1. Gehen Sie zu **http://localhost:3000/admin**
2. Melden Sie sich mit den Admin-Zugangsdaten an:
   - Email: `admin@praxis.de`
   - Passwort: `admin123`
3. Sie sehen das Dashboard mit:
   - Statistiken
   - Terminübersicht für den ausgewählten Tag
4. Über **"Einstellungen"** können Sie:
   - Neue Terminarten hinzufügen
   - Bestehende Terminarten aktivieren/deaktivieren

## 🗂️ Projektstruktur

```
praxis-terminbuchung/
├── app/
│   ├── (auth)/          # Authentifizierungs-Routen
│   │   ├── login/
│   │   └── register/
│   ├── admin/           # Admin-Bereich
│   │   ├── page.tsx     # Dashboard
│   │   └── einstellungen/
│   ├── termine/         # Patienten-Termine
│   │   ├── buchen/      # Terminbuchung
│   │   └── meine/       # Meine Termine
│   ├── api/             # API Routes
│   │   ├── auth/
│   │   ├── appointments/
│   │   └── admin/
│   ├── layout.tsx
│   └── page.tsx         # Homepage
├── components/          # React Komponenten
├── lib/                 # Utilities & Helpers
│   ├── prisma.ts       # Prisma Client
│   └── auth.ts         # Auth Config
├── prisma/
│   ├── schema.prisma   # Datenbank-Schema
│   └── seed.ts         # Seed-Daten
└── public/             # Static Files
```

## 🔐 Sicherheit

- ✅ Passwörter werden mit bcrypt gehasht (10 Rounds)
- ✅ Session-basierte Authentifizierung mit JWT
- ✅ Protected Routes mit Middleware
- ✅ RBAC (Role-Based Access Control) für Admin
- ✅ Input-Validierung auf Client- und Server-Seite

## ⚙️ Konfiguration

### Öffnungszeiten anpassen

Die Öffnungszeiten sind aktuell fest konfiguriert in:
`app/api/appointments/available-slots/route.ts`

```typescript
const OPENING_TIME = 8;  // 8:00 Uhr
const CLOSING_TIME = 16; // 16:00 Uhr
```

### Slot-Dauer und Pufferzeit

```typescript
const SLOT_DURATION = 15;  // Basis-Slot: 15 Minuten
const BUFFER_TIME = 5;     // Pufferzeit: 5 Minuten
```

## 🚀 Deployment

### Vercel (empfohlen für Next.js)

1. Erstellen Sie ein Vercel-Konto
2. Verbinden Sie Ihr GitHub-Repository
3. Konfigurieren Sie die Umgebungsvariablen in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
4. Deploy!

### Production Build lokal testen

```bash
npm run build
npm run start
```

## 📊 Datenbank-Management

```bash
# Prisma Studio öffnen (GUI für Datenbank)
npm run db:studio

# Datenbank-Schema aktualisieren
npm run db:push

# Seed-Daten neu laden
npm run db:seed
```

## 🎨 Anpassungen

### Farben ändern

Bearbeiten Sie `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... weitere Farben
    600: '#0284c7',  // Hauptfarbe
  },
}
```

### Praxisname ändern

Bearbeiten Sie `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Ihre Praxis - Terminbuchung",
  description: "Online Terminbuchung für Ihre Praxis",
};
```

## 🐛 Troubleshooting

### Datenbank-Verbindung fehlgeschlagen
- Überprüfen Sie die `DATABASE_URL` in `.env`
- Stellen Sie sicher, dass PostgreSQL läuft
- Testen Sie die Verbindung: `psql -U user -d praxis_terminbuchung`

### NextAuth Fehler
- Überprüfen Sie `NEXTAUTH_URL` und `NEXTAUTH_SECRET`
- Bei Production: NEXTAUTH_URL muss die echte Domain sein

### Build Fehler
- Löschen Sie `.next` Ordner: `rm -rf .next`
- Node Modules neu installieren: `rm -rf node_modules && npm install`

## 📝 Geplante Erweiterungen

- [ ] Email-Benachrichtigungen bei Terminbuchung
- [ ] SMS-Erinnerungen
- [ ] Patienten können Termine selbst stornieren (konfigurierbar)
- [ ] Kalender-Export (iCal)
- [ ] Video-Sprechstunde Integration
- [ ] Mehrere Ärzte/Behandlungsräume
- [ ] Erweiterte Statistiken und Reports
- [ ] PVS-Integration

## 👥 Support

Bei Fragen oder Problemen:
- Überprüfen Sie diese README
- Schauen Sie in die Konsole nach Fehlermeldungen
- Prüfen Sie die Browser-Developer-Tools

## 📄 Lizenz

Dieses Projekt ist für den privaten/kommerziellen Gebrauch bestimmt.

---

**Entwickelt mit ❤️ für moderne Arztpraxen**
