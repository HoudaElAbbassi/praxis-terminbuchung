# KI-Chatbot & DSGVO - Kompletter Leitfaden

## ⚖️ Rechtliche Grundlagen

### Was sagt die DSGVO?

**Art. 28 DSGVO - Auftragsverarbeitung:**
- KI-Anbieter ist "Auftragsverarbeiter"
- Du bist "Verantwortlicher"
- **AVV (Auftragsverarbeitungsvertrag) erforderlich**
- Anbieter muss EU-DSGVO-konform sein

**Art. 9 DSGVO - Besondere Kategorien:**
- **Gesundheitsdaten sind besonders schützenswert**
- Höhere Anforderungen als normale Daten
- Medizinische Schweigepflicht (§ 203 StGB)

**Art. 44-49 DSGVO - Datenübermittlung in Drittländer:**
- USA = Drittland (kein Angemessenheitsbeschluss mehr)
- Privacy Shield ungültig seit 2020
- **Problem:** OpenAI, Anthropic = US-Unternehmen

---

## 🚫 Probleme mit US-Anbietern

### OpenAI (ChatGPT)
❌ **Hauptsitz:** USA (San Francisco)
❌ **Server-Standort:** Primär USA
❌ **CLOUD Act:** US-Behörden können auf Daten zugreifen
❌ **AVV:** Vorhanden, aber USA-Problematik bleibt
⚠️ **EU-Datenschützer:** Kritisch betrachtet

### Anthropic (Claude)
❌ **Hauptsitz:** USA (San Francisco)
❌ **Server-Standort:** USA + global
❌ **Gleiche Problematik** wie OpenAI
✅ **Bessere Privacy-Policies**, aber immer noch USA

### Microsoft Azure OpenAI
⚠️ **Kann EU-konform sein:**
- ✅ Server in EU-Rechenzentren möglich
- ✅ AVV für DSGVO verfügbar
- ✅ Datenverarbeitung in EU
- ✅ Enterprise-Garantien
- ❌ **Kosten:** Teurer als direkte OpenAI-API
- ✅ **Empfehlung:** Beste US-Option für DSGVO

---

## ✅ DSGVO-konforme Alternativen

### Option 1: EU-basierte KI-Anbieter

#### **Aleph Alpha (Deutschland)** ⭐ EMPFOHLEN
```
Hauptsitz: Heidelberg, Deutschland
Server: 100% Deutschland/EU
DSGVO: Voll konform
AVV: Verfügbar
Zertifizierung: ISO 27001

Vorteile:
✅ Deutsche KI (100% EU)
✅ Keine Datenübermittlung in Drittländer
✅ Speziell für regulierte Branchen
✅ Medizinsektor-geeignet
✅ Deutscher Support

Nachteile:
❌ Teurer als OpenAI (~0,50€ per 1000 tokens)
❌ Kleineres Modell (weniger intelligent als GPT-4)

API-Beispiel:
const response = await fetch('https://api.aleph-alpha.com/complete', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.ALEPH_ALPHA_KEY}`,
  },
  body: JSON.stringify({
    model: 'luminous-extended',
    prompt: userMessage,
  }),
});
```

**Preis:** Ab 99€/Monat + Usage
**Website:** https://aleph-alpha.com

---

#### **Mistral AI (Frankreich)**
```
Hauptsitz: Paris, Frankreich
Server: EU
DSGVO: Konform
AVV: Verfügbar

Vorteile:
✅ EU-Unternehmen (französisch)
✅ Open-Source-Modelle verfügbar
✅ Günstigere Preise als Aleph Alpha
✅ Gute Performance

Nachteile:
⚠️ Noch relativ neu
⚠️ Weniger Enterprise-Support

API-Beispiel:
const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'mistral-small',
    messages: [{ role: 'user', content: userMessage }],
  }),
});
```

**Preis:** Ab 0,14€ per 1M tokens
**Website:** https://mistral.ai

---

### Option 2: Self-Hosting (Volle Kontrolle)

#### **Llama 3 (Meta) - Lokal gehostet**
```
Lizenz: Open Source (kostenlos)
Hosting: Dein eigener Server
DSGVO: 100% konform (keine Drittanbieter)

Vorteile:
✅ Komplett unter deiner Kontrolle
✅ Keine API-Kosten
✅ Keine Datenübermittlung
✅ Maximum Privacy

Nachteile:
❌ Benötigt eigenen Server mit GPU
❌ Technisches Know-how erforderlich
❌ Wartungsaufwand

Setup:
# Via Ollama (einfachste Methode)
curl https://ollama.ai/install.sh | sh
ollama pull llama3
ollama serve

# In deiner App:
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llama3',
    prompt: userMessage,
  }),
});
```

**Kosten:** Server-Hosting (ab 50€/Monat für GPU-Server)
**Empfehlung:** Nur wenn technisch versiert

---

### Option 3: Hybrid-Ansatz (Best Practice)

**Konzept:** Kombiniere regelbasiert + EU-KI

```typescript
async function getChatbotResponse(message: string) {
  // 1. Prüfe: Kann regelbasiert beantwortet werden?
  const ruleBasedResponse = findFlowByTrigger(message);

  if (ruleBasedResponse.id !== 'fallback') {
    // Einfache Fragen → Regelbasiert
    return ruleBasedResponse; // Keine KI nötig!
  }

  // 2. Nur bei komplexen Fragen → EU-KI nutzen
  return await getAlephAlphaResponse(message);
}
```

**Vorteile:**
- ✅ 80% der Fragen regelbasiert (kostenlos, DSGVO-sicher)
- ✅ 20% komplexe Fragen → EU-KI (teurer, aber konform)
- ✅ Kosteneffizient
- ✅ Maximale DSGVO-Sicherheit

---

## 🛡️ Technische Schutzmaßnahmen

### 1. Datensparsamkeit (Privacy by Design)

**Sende NIEMALS an KI:**
```javascript
❌ VERBOTEN:
- Echte Namen
- Geburtsdaten
- Adressen
- Telefonnummern
- Diagnosen
- Patientenakten

✅ ERLAUBT:
- Anonyme Fragen
- Allgemeine Symptom-Beschreibungen
- FAQ-Themen
```

**Implementierung:**
```typescript
// Sanitize user input BEVOR KI-Aufruf
function sanitizeInput(text: string): string {
  // Entferne Telefonnummern
  text = text.replace(/\d{3,}/g, '[TELEFON]');

  // Entferne Email-Adressen
  text = text.replace(/[\w.-]+@[\w.-]+\.\w+/g, '[EMAIL]');

  // Entferne Namen (Basic)
  text = text.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[NAME]');

  return text;
}

const cleanedMessage = sanitizeInput(userMessage);
// Nur gecleanedMessage an KI senden!
```

---

### 2. Anonymisierung

```typescript
// Generate anonymous session ID
const sessionId = crypto.randomUUID();

// Speichere Mapping (nur lokal, nicht in KI)
sessionMapping.set(sessionId, {
  userId: actualUserId,
  createdAt: new Date(),
});

// An KI nur Session-ID senden
await sendToAI({
  sessionId, // Anonym
  message: cleanedMessage,
});
```

---

### 3. Daten-Retention (Aufbewahrung)

```typescript
// Lösche Chat-Logs nach 24 Stunden
const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

await prisma.chatSession.create({
  data: {
    id: sessionId,
    expiresAt: expiryTime,
  },
});

// Cron-Job: Lösche abgelaufene Sessions
async function cleanupExpiredSessions() {
  await prisma.chatSession.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });
}
```

---

### 4. End-to-End Encryption (Optional)

```typescript
// Verschlüssle Nachrichten BEVOR Speicherung
import { encrypt, decrypt } from './crypto';

const encryptedMessage = encrypt(userMessage, process.env.ENCRYPTION_KEY);

// Speichere nur verschlüsselte Version
await prisma.message.create({
  data: {
    content: encryptedMessage, // Nicht lesbar ohne Key
  },
});
```

---

## 📜 AVV & Verträge

### Auftragsverarbeitungsvertrag (AVV)

**Was muss drinstehen:**
- Datenverarbeitungszweck
- Art der Daten
- Kategorien betroffener Personen
- Löschfristen
- Technische & organisatorische Maßnahmen (TOM)
- Weisungsgebundenheit
- Unterauftragnehmer-Regelung

**Wo bekomme ich das?**

| Anbieter | AVV verfügbar? | Abrufen |
|----------|----------------|---------|
| OpenAI | ✅ Ja | https://openai.com/policies/dpa |
| Anthropic | ✅ Ja | Auf Anfrage (Enterprise) |
| Azure OpenAI | ✅ Ja | Im Azure-Portal |
| Aleph Alpha | ✅ Ja | Teil des Vertrags |
| Mistral AI | ✅ Ja | https://mistral.ai/terms |

**Wichtig:** AVV allein reicht NICHT bei USA-Anbietern!

---

## 🏥 Spezifische Anforderungen für Arztpraxen

### § 203 StGB - Verletzung von Privatgeheimnissen

**Ärztliche Schweigepflicht:**
- Gilt auch für technische Dienstleister
- KI-Anbieter muss Schweigepflicht einhalten
- **Problem:** US-Anbieter kennen deutsche Schweigepflicht nicht

**Lösung:**
1. ✅ EU-Anbieter nutzen (Aleph Alpha, Mistral)
2. ✅ Keine Gesundheitsdaten an KI senden
3. ✅ Nur allgemeine Informationen

---

### Empfehlung Datenschutzbeauftragter

**Vor KI-Einsatz:**
1. ✅ Datenschutz-Folgenabschätzung (DSFA) durchführen
2. ✅ Datenschutzbeauftragten konsultieren
3. ✅ Verzeichnis von Verarbeitungstätigkeiten (VVT) anpassen
4. ✅ Datenschutzerklärung aktualisieren
5. ✅ Patienten informieren (Transparenz)

**Vorlage DSFA:**
```
Titel: KI-Chatbot auf Praxis-Website

Verarbeitungszweck:
- Beantwortung häufiger Fragen
- Terminbuchungs-Assistenz

Datenarten:
- Keine personenbezogenen Gesundheitsdaten
- Optional: Anonyme Chat-Logs

Risiken:
- Niedrig (keine sensiblen Daten)

Maßnahmen:
- EU-Anbieter (Aleph Alpha)
- Anonymisierung
- Datensparsamkeit
- 24h Löschfrist
```

---

## 🎯 Konkrete Implementierungs-Empfehlungen

### Variante A: Maximum DSGVO-Sicherheit (EMPFOHLEN)

**Setup:**
```
Basis: Regelbasierter Chatbot (90%)
Ergänzung: Aleph Alpha oder Mistral (10%)
Kosten: ~20€/Monat
DSGVO-Risiko: Minimal
```

**Vorteile:**
- ✅ 100% EU
- ✅ Keine USA-Problematik
- ✅ AVV verfügbar
- ✅ Medizinsektor-geeignet

**Code-Beispiel:**
```typescript
// app/api/chatbot/ai/route.ts
import AlephAlpha from 'aleph-alpha-client';

const client = new AlephAlpha(process.env.ALEPH_ALPHA_KEY);

export async function POST(request: Request) {
  const { message } = await request.json();

  // 1. Sanitize
  const cleanMessage = sanitizeInput(message);

  // 2. Aleph Alpha Request
  const response = await client.complete({
    model: 'luminous-extended',
    prompt: `Du bist Assistent für eine Arztpraxis.

    Wichtig:
    - Gib keine medizinische Beratung
    - Verweise bei Notfällen an 112

    Frage: ${cleanMessage}`,
    maximum_tokens: 100,
  });

  return Response.json({
    response: response.completions[0].completion,
  });
}
```

---

### Variante B: Komplett ohne Drittanbieter

**Setup:**
```
Basis: Regelbasierter Chatbot
Ergänzung: Llama 3 (selbst gehostet)
Kosten: ~50€/Monat (GPU-Server)
DSGVO-Risiko: Null (alles eigene Infrastruktur)
```

**Vorteile:**
- ✅ Maximale Kontrolle
- ✅ Kein Drittanbieter
- ✅ Keine AVV nötig

**Nachteile:**
- ❌ Technisch anspruchsvoll
- ❌ Wartungsaufwand

---

### Variante C: Azure OpenAI (EU-Region)

**Setup:**
```
Anbieter: Microsoft Azure OpenAI Service
Region: West Europe (Amsterdam)
Kosten: ~30€/Monat
```

**Konfiguration:**
```typescript
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

const client = new OpenAIClient(
  'https://YOUR-RESOURCE.openai.azure.com/',
  new AzureKeyCredential(process.env.AZURE_OPENAI_KEY)
);

// WICHTIG: In Azure-Portal sicherstellen:
// - Region: West Europe
// - Data Residency: EU
// - AVV herunterladen
```

**Vorteile:**
- ✅ GPT-4 Qualität
- ✅ EU-Server
- ✅ Enterprise-AVV
- ✅ Microsoft-Support

**Nachteile:**
- ⚠️ Immer noch Microsoft = USA-Unternehmen
- ⚠️ Teurer als direkte OpenAI-API

---

## 📋 Checkliste für DSGVO-konforme KI

### Vor Implementation:

- [ ] Datenschutz-Folgenabschätzung durchgeführt
- [ ] Datenschutzbeauftragten informiert
- [ ] EU-Anbieter oder EU-Server gewählt
- [ ] AVV vorhanden
- [ ] Datenschutzerklärung aktualisiert
- [ ] Verzeichnis Verarbeitungstätigkeiten erweitert

### Im Code:

- [ ] Sanitize-Funktion implementiert
- [ ] Keine Gesundheitsdaten an KI
- [ ] Anonymisierung aktiv
- [ ] Automatische Löschung nach 24h
- [ ] Logging minimiert
- [ ] Verschlüsselung (optional)

### Nach Go-Live:

- [ ] Patienten informiert (Website-Hinweis)
- [ ] Monitoring aktiv
- [ ] Regelmäßige Audits
- [ ] Dokumentation gepflegt

---

## 🚦 Ampel-System: Welcher Anbieter?

### 🟢 GRÜN (Unbedenklich)
- ✅ Aleph Alpha (Deutschland)
- ✅ Mistral AI (Frankreich)
- ✅ Self-Hosted Llama (eigener Server)

### 🟡 GELB (Mit Vorsicht)
- ⚠️ Azure OpenAI (EU-Region, AVV)
- ⚠️ Google Vertex AI (EU-Region)

### 🔴 ROT (Problematisch)
- ❌ OpenAI direkt (USA)
- ❌ Anthropic direkt (USA)
- ❌ Google Gemini (USA)

---

## 💰 Kosten-Vergleich (1000 Patienten-Anfragen/Monat)

| Option | Kosten | DSGVO | Qualität |
|--------|--------|-------|----------|
| **Nur Regeln** | 0€ | ✅✅✅ | ⭐⭐⭐ |
| **Regeln + Aleph Alpha** | ~25€ | ✅✅✅ | ⭐⭐⭐⭐ |
| **Regeln + Mistral** | ~15€ | ✅✅✅ | ⭐⭐⭐⭐ |
| **Azure OpenAI** | ~35€ | ✅✅ | ⭐⭐⭐⭐⭐ |
| **Self-Hosted Llama** | ~50€ | ✅✅✅ | ⭐⭐⭐⭐ |

---

## 🎯 Finale Empfehlung

### Für Arztpraxis (wie deine):

**Option 1 (BEST):**
```
90% Regelbasiert (kostenlos, sicher)
+ 10% Mistral AI (EU, günstig)
= ~10-15€/Monat
```

**Warum:**
- ✅ DSGVO-konform
- ✅ EU-Anbieter
- ✅ Kosteneffizient
- ✅ Gute Qualität
- ✅ Einfache Integration

**Option 2 (Paranoid):**
```
100% Regelbasiert
+ Erweiterte NLP (ohne KI)
= 0€/Monat
```

**Warum:**
- ✅ Null Risiko
- ✅ Keine Drittanbieter
- ✅ Kostenlos

---

## 📞 Nächste Schritte

**Wenn du KI nutzen möchtest:**

1. **Mistral AI Account erstellen** (5 Min)
   - https://console.mistral.ai/
   - Kreditkarte hinterlegen
   - API-Key erhalten

2. **AVV herunterladen** (2 Min)
   - In Mistral Console verfügbar
   - Abspeichern für Dokumentation

3. **Code anpassen** (1h)
   - Mistral-Integration statt OpenAI
   - Sanitize-Funktion hinzufügen
   - Testen

4. **Datenschutz updaten** (30 Min)
   - Datenschutzerklärung erweitern
   - VVT anpassen
   - DSB informieren

**Willst du, dass ich Mistral AI Integration implementiere?**
