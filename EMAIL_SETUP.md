# Email-Benachrichtigungen Einrichtung

## Übersicht

Das System verwendet **Resend** als Email-Service, um automatische Benachrichtigungen an Patienten zu senden.

## Email-Typen

### 1. **Neue Terminanfrage**
Wird automatisch gesendet wenn ein Patient einen Termin bucht.
- Status: PENDING
- Inhalt: Bestätigung, dass die Anfrage eingegangen ist

### 2. **Termin bestätigt**
Wird gesendet wenn der Arzt einen Termin annimmt.
- Aktion: Admin klickt auf "Annehmen"
- Inhalt: Termindetails, wichtige Hinweise

### 3. **Termin abgelehnt**
Wird gesendet wenn der Arzt einen Termin ablehnt.
- Aktion: Admin klickt auf "Ablehnen"
- Inhalt: Information über Absage, Kontaktdaten für neue Buchung

### 4. **Alternativtermin vorgeschlagen**
Wird gesendet wenn der Arzt einen Alternativtermin anbietet.
- Aktion: Admin klickt auf "Alternativvorschlag"
- Inhalt: Ursprünglicher Termin, vorgeschlagener Alternativtermin, Hinweis

## Einrichtung

### 1. Resend Account erstellen

1. Gehe zu [https://resend.com](https://resend.com)
2. Erstelle einen kostenlosen Account
3. Verifiziere deine Email-Adresse

### 2. API Key generieren

1. Gehe zu: **Settings** → **API Keys**
2. Klicke auf: **Create API Key**
3. Name: `Praxis Terminbuchung Production`
4. Kopiere den API Key (wird nur einmal angezeigt!)

### 3. Domain konfigurieren (Optional aber empfohlen)

Für eine professionelle Absender-Adresse:

1. Gehe zu: **Domains**
2. Klicke auf: **Add Domain**
3. Füge hinzu: `praxis-remscheid.de` (deine Domain)
4. Folge den DNS-Konfigurations-Schritten
5. Warte auf Verifizierung (kann 24-48h dauern)

### 4. Environment Variables setzen

#### Lokal (.env)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@praxis-remscheid.de
```

#### Netlify/Vercel

1. Gehe zu: **Site configuration** → **Environment variables**
2. Füge hinzu:

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxxxxxxx` |
| `EMAIL_FROM` | `noreply@praxis-remscheid.de` |

3. Trigger Deploy: **Deploys** → **Trigger deploy**

## Testen

### Lokales Testen

1. Stelle sicher, dass `RESEND_API_KEY` in `.env` gesetzt ist
2. Starte den Dev-Server: `npm run dev`
3. Buche einen Testtermin
4. Prüfe dein Email-Postfach

### Test-Modus

Resend bietet automatisch einen Test-Modus:
- Emails werden nur an verifizierte Email-Adressen gesendet
- Im kostenlosen Plan: Max. 100 Emails/Tag
- Emails an nicht-verifizierte Adressen werden nur im Dashboard angezeigt

### Verifizierte Email-Adressen (für Tests)

1. Gehe zu: **Settings** → **Email Addresses**
2. Füge Test-Email-Adressen hinzu
3. Bestätige die Verifikations-Email

## Kosten

**Kostenloser Plan:**
- 3.000 Emails/Monat
- 100 Emails/Tag
- Perfekt für den Start!

**Pro Plan** ($20/Monat):
- 50.000 Emails/Monat
- Unbegrenzte Domains
- Erweiterte Analytics

## Email-Templates Anpassen

Die Email-Templates befinden sich in: `lib/email.ts`

Jede Funktion hat ihr eigenes HTML-Template:
- `sendAppointmentConfirmedEmail()`
- `sendAppointmentRejectedEmail()`
- `sendAlternativeAppointmentEmail()`
- `sendNewAppointmentNotification()`

### Anpassungen:

```typescript
// Beispiel: Farben ändern
const primaryColor = '#2c5f7c'; // Deine Praxis-Farbe
const accentColor = '#4a9d8f'; // Deine Akzent-Farbe

// Praxis-Daten anpassen
const practiceInfo = {
  name: 'Praxis für Gefäßmedizin Remscheid',
  doctor: 'Abdelkarim Alyandouzi',
  phone: '02191 6917400',
  email: 'info@praxis-remscheid.de',
};
```

## Troubleshooting

### Emails kommen nicht an

1. **Prüfe Spam-Ordner** - Erste Emails landen oft im Spam
2. **API Key korrekt?** - Prüfe Environment Variables
3. **Domain verifiziert?** - Bei eigener Domain: DNS-Records korrekt?
4. **Rate Limit?** - Im Resend Dashboard prüfen

### Fehler in Console

```
Error sending email: 401 Unauthorized
```
→ API Key ist falsch oder fehlt

```
Error sending email: 422 Validation Error
```
→ Email-Adresse ist nicht verifiziert (im Test-Modus)

## Production Checklist

- [ ] Resend API Key in Netlify/Vercel gesetzt
- [ ] EMAIL_FROM korrekt konfiguriert
- [ ] Domain verifiziert (optional)
- [ ] Test-Email an echte Patient-Adresse gesendet
- [ ] Spam-Filter getestet
- [ ] Email-Templates auf korrekte Praxis-Daten geprüft

## Alternative Email-Services

Falls du Resend nicht nutzen möchtest:

- **SendGrid** - Ähnlich, 100 Emails/Tag kostenlos
- **Mailgun** - Gut für höhere Volumen
- **Nodemailer + SMTP** - Nutze deinen eigenen Email-Server

Die Implementierung in `lib/email.ts` kann leicht angepasst werden.

## Support

Bei Problemen:
- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com
