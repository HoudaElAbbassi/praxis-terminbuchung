# Netlify Environment Variables Checkliste

## ❌ Fehler: "There is a problem with the server configuration"

Dieser Fehler tritt auf, wenn **NEXTAUTH_SECRET** nicht in Netlify gesetzt ist.

---

## ✅ Lösung: Environment Variables in Netlify setzen

### Schritt 1: Gehen Sie zu Netlify

1. Öffnen Sie: https://app.netlify.com
2. Wählen Sie Ihr Projekt aus
3. Gehen Sie zu: **Site configuration** → **Environment variables**

### Schritt 2: Prüfen Sie diese 3 Variablen

**WICHTIG:** Alle 3 Variablen müssen gesetzt sein!

#### 1. DATABASE_URL ✅
- **Name:** `DATABASE_URL`
- **Wert:** Ihre PostgreSQL Connection String
- **Beispiel:** `postgresql://user:password@host.neon.tech/dbname?sslmode=require`

#### 2. NEXTAUTH_URL ✅
- **Name:** `NEXTAUTH_URL`
- **Wert:** Ihre Netlify-URL
- **Beispiel:** `https://arzt.netlify.app`

#### 3. NEXTAUTH_SECRET ⚠️ **FEHLT WAHRSCHEINLICH!**
- **Name:** `NEXTAUTH_SECRET`
- **Wert:** Ein sicherer, zufälliger String

**So generieren Sie einen sicheren Secret:**

```bash
# Auf Ihrem lokalen Rechner ausführen:
openssl rand -base64 32
```

**Beispiel-Output:**
```
xK9mP2vN8qL5tR7wY4sB1dF6hJ3kM0pV
```

Kopieren Sie diesen String und fügen Sie ihn als `NEXTAUTH_SECRET` in Netlify hinzu.

---

### Schritt 3: Deployment neu starten

Nach dem Hinzufügen der Environment-Variablen:

1. Gehen Sie zu: **Deploys**
2. Klicken Sie auf: **Trigger deploy** → **Clear cache and deploy site**
3. Warten Sie, bis der Deploy abgeschlossen ist

---

## 🧪 Testen Sie die Konfiguration

Nach dem Deployment:

1. Besuchen Sie: `https://arzt.netlify.app`
2. Gehen Sie zu: `https://arzt.netlify.app/auth/login`
3. Versuchen Sie, sich anzumelden

**Wenn es immer noch nicht funktioniert:**

### A. Datenbank noch nicht initialisiert?

Führen Sie auf Ihrem lokalen Rechner aus:

```bash
export DATABASE_URL="ihre-database-url-von-netlify"
./scripts/init-db.sh
```

### B. Netlify Build-Logs prüfen

1. Gehen Sie zu: **Deploys** → Wählen Sie den letzten Deploy
2. Klicken Sie auf: **Deploy log**
3. Suchen Sie nach Fehlermeldungen mit "NEXTAUTH_SECRET" oder "AUTH_SECRET"

---

## 📋 Vollständige Checkliste

- [ ] `DATABASE_URL` gesetzt
- [ ] `NEXTAUTH_URL` gesetzt (z.B. `https://arzt.netlify.app`)
- [ ] `NEXTAUTH_SECRET` gesetzt (mit `openssl rand -base64 32` generiert)
- [ ] Deployment neu gestartet (Clear cache and deploy)
- [ ] Datenbank initialisiert (mit `./scripts/init-db.sh`)
- [ ] Login-Seite funktioniert
- [ ] Admin-Login funktioniert: `admin@praxis.de` / `admin123`

---

## ❓ Immer noch Probleme?

**Häufige Fehlerquellen:**

1. **NEXTAUTH_SECRET ist leer oder enthält Leerzeichen**
   - Lösung: Generieren Sie einen neuen Secret ohne Leerzeichen

2. **NEXTAUTH_URL zeigt auf falsche Domain**
   - Lösung: Prüfen Sie, dass es auf Ihre echte Netlify-URL zeigt

3. **DATABASE_URL ist falsch formatiert**
   - Lösung: Prüfen Sie, dass `?sslmode=require` am Ende steht

4. **Datenbank-Tabellen existieren nicht**
   - Lösung: Führen Sie `./scripts/init-db.sh` aus

---

## 🎉 Erfolg!

Wenn alles funktioniert:

- ✅ Sie können die Homepage besuchen
- ✅ Kein "server configuration" Fehler
- ✅ Login-Seite lädt ohne Fehler
- ✅ Sie können sich einloggen

**Admin-Login:**
- Email: `admin@praxis.de`
- Passwort: `admin123`

**⚠️ WICHTIG:** Ändern Sie das Admin-Passwort sofort nach dem ersten Login!
