# Chatbot Intelligenz-Upgrades

## Option 1: Erweiterte Regelbasierte Intelligenz (Kein KI-API)

### 1.1 Fuzzy Matching & Synonyme

**Problem:** Chatbot versteht nur exakte Keywords
**Lösung:** Synonym-Wörterbuch

```typescript
// lib/chatbot-nlp.ts
const SYNONYMS = {
  appointment: ['termin', 'termine', 'buchung', 'reservierung', 'sprechstunde'],
  emergency: ['notfall', 'akut', 'dringend', 'sofort', 'hilfe'],
  hours: ['öffnungszeiten', 'sprechzeiten', 'zeiten', 'wann offen'],
  location: ['anfahrt', 'adresse', 'wo', 'standort', 'parken'],
};

function matchIntent(input: string): string {
  const normalized = input.toLowerCase();

  for (const [intent, keywords] of Object.entries(SYNONYMS)) {
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return intent;
    }
  }

  return 'unknown';
}
```

**Vorteil:** Versteht mehr Variationen
**Aufwand:** 2-3 Stunden

---

### 1.2 Kontext-Management (Session Memory)

**Problem:** Chatbot vergisst vorherige Nachrichten
**Lösung:** Session-State mit Kontext

```typescript
// hooks/useChatbot.ts (erweitert)
interface ChatContext {
  lastIntent?: string;
  userInfo?: {
    hasAppointment?: boolean;
    preferredTime?: string;
    urgency?: 'low' | 'medium' | 'high';
  };
  conversationStage?: number;
}

const [context, setContext] = useState<ChatContext>({});

// Beispiel: Intelligente Follow-ups
if (context.lastIntent === 'appointment' && input.includes('ja')) {
  // User hat "Ja" gesagt nach Terminfrage
  return getFlowById('book_online');
}
```

**Vorteil:** Natürlichere Konversation
**Aufwand:** 4-6 Stunden

---

### 1.3 Entity Extraction (Datum, Zeit, Namen)

**Problem:** User schreibt "Ich brauche morgen um 14 Uhr einen Termin"
**Lösung:** Parse Entitäten aus Text

```typescript
// lib/entity-extraction.ts
import { parse } from 'chrono-node'; // Library für Datum-Parsing

function extractEntities(text: string) {
  const entities = {
    date: null,
    time: null,
    urgency: 'normal',
  };

  // Datum/Zeit erkennen
  const dates = parse(text, new Date(), { forwardDate: true });
  if (dates.length > 0) {
    entities.date = dates[0].start.date();
  }

  // Dringlichkeit
  if (/dringend|sofort|schnell|asap/i.test(text)) {
    entities.urgency = 'high';
  }

  return entities;
}

// Verwendung:
User: "Ich brauche morgen um 14 Uhr einen Termin"
→ Extracts: { date: '2025-01-15', time: '14:00', urgency: 'normal' }
→ Bot: "Verstanden! Ich habe Sie für morgen 14 Uhr vorgemerkt..."
```

**Package:** `npm install chrono-node`
**Vorteil:** Versteht natürliche Sprache
**Aufwand:** 3-4 Stunden

---

### 1.4 Multi-Step Forms

**Problem:** Nutzer muss viele Buttons klicken
**Lösung:** Intelligente Formular-Führung

```typescript
// Beispiel: Termin-Assistent
Bot: "Ich helfe Ihnen beim Termin. Für was brauchen Sie einen Termin?"
User: "Beinschmerzen"
Bot: "Verstanden. Wann hätten Sie Zeit?"
User: "Nächste Woche Mittwoch"
Bot: "Vormittags oder Nachmittags?"
User: "Vormittag"
Bot: "Perfekt! Hier sind verfügbare Zeiten am Mittwoch Vormittag..."
```

**Vorteil:** Weniger Klicks, natürlicher
**Aufwand:** 6-8 Stunden

---

## Option 2: KI-Integration (OpenAI / Claude)

### 2.1 Hybrid-Ansatz (Empfohlen)

**Konzept:**
- Standard-Fragen → Regelbasiert (schnell, kostenlos)
- Komplexe Fragen → KI (intelligent, flexibel)

```typescript
// lib/chatbot-ai.ts
async function getAIResponse(message: string, context: ChatContext) {
  // Prüfe erst: Kann regelbasiert beantwortet werden?
  const ruleBasedResponse = findFlowByTrigger(message);
  if (ruleBasedResponse.id !== 'fallback') {
    return ruleBasedResponse; // Nutze bestehende Flows
  }

  // Falls nicht: Nutze KI
  const response = await fetch('/api/chatbot/ai', {
    method: 'POST',
    body: JSON.stringify({
      message,
      context,
      knowledgeBase: PRAXIS_INFO, // Deine Praxis-Infos
    }),
  });

  return response.json();
}
```

**API Route:**
```typescript
// app/api/chatbot/ai/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { message, context, knowledgeBase } = await request.json();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Günstigstes Modell
    messages: [
      {
        role: 'system',
        content: `Du bist ein Assistent für eine Gefäßmedizin-Praxis.

        Wichtige Regeln:
        - Gib KEINE medizinischen Diagnosen
        - Verweise bei Notfällen an 112/116117
        - Sei freundlich und professionell
        - Halte Antworten kurz (max 3 Sätze)

        Praxis-Infos:
        ${JSON.stringify(knowledgeBase)}`,
      },
      { role: 'user', content: message },
    ],
    max_tokens: 150,
    temperature: 0.7,
  });

  return Response.json({
    response: completion.choices[0].message.content,
  });
}
```

**Kosten:** ~0,15€ pro 1000 Nachrichten (GPT-4o-mini)
**Vorteil:** Versteht ALLES, sehr flexibel
**Aufwand:** 1-2 Tage

---

### 2.2 RAG (Retrieval Augmented Generation)

**Konzept:** KI + Deine Praxis-Wissensdatenbank

```typescript
// 1. Erstelle Wissensdatenbank
const KNOWLEDGE_BASE = [
  {
    topic: 'Öffnungszeiten',
    content: 'Mo-Fr 8-18 Uhr, Sa nach Vereinbarung',
  },
  {
    topic: 'Leistungen',
    content: 'Doppler-Ultraschall, ABI-Messung, Gefäßdiagnostik...',
  },
  // ... mehr Infos
];

// 2. Bei User-Frage: Finde relevante Infos
function findRelevantInfo(query: string) {
  // Simple Version: Keyword-Matching
  // Advanced: Vector-Search mit Embeddings
  return KNOWLEDGE_BASE.filter(item =>
    item.content.toLowerCase().includes(query.toLowerCase())
  );
}

// 3. KI nutzt nur diese Infos
const relevantInfo = findRelevantInfo(userMessage);
const aiResponse = await getAIResponse(userMessage, relevantInfo);
```

**Advanced mit Embeddings:**
```typescript
// Nutze Pinecone/Supabase Vector für semantische Suche
// "Gefäßuntersuchung" findet auch "Doppler-Ultraschall"
```

**Vorteil:** KI halluziniert nicht, nutzt nur deine Daten
**Kosten:** +5-10€/Monat für Vector-DB
**Aufwand:** 2-3 Tage

---

### 2.3 Conversation Memory (Langzeit-Gedächtnis)

**Problem:** KI vergisst vorherige Konversation
**Lösung:** Speichere Chat-Historie

```typescript
const messages = [
  { role: 'system', content: SYSTEM_PROMPT },
  { role: 'user', content: 'Ich brauche einen Termin' },
  { role: 'assistant', content: 'Gerne! Wofür brauchen Sie...' },
  { role: 'user', content: 'Beinschmerzen' },
  { role: 'assistant', content: 'Verstanden. Wann...' },
  { role: 'user', content: 'Morgen' }, // KI weiß: Es geht um Termin für Beinschmerzen
];
```

**Vorteil:** Natürliche Multi-Turn-Konversation
**Kosten:** ~0,30€ pro 1000 Nachrichten (mit Historie)

---

## Option 3: Voice Input (Spracheingabe)

**User spricht statt tippt:**

```typescript
// components/Chatbot/VoiceInput.tsx
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  sendMessage(transcript);
};

// Button: 🎤 zum Sprechen
```

**Vorteil:** Accessibility, bequemer auf Handy
**Kosten:** 0€ (Browser-API)
**Aufwand:** 2-3 Stunden

---

## 📊 Vergleich der Optionen

| Option | Intelligenz | Kosten | Aufwand | DSGVO |
|--------|-------------|--------|---------|-------|
| **Synonyme** | + | 0€ | 2h | ✅ |
| **Kontext** | ++ | 0€ | 4h | ✅ |
| **Entity Extraction** | +++ | 0€ | 4h | ✅ |
| **Multi-Step Forms** | +++ | 0€ | 8h | ✅ |
| **Hybrid (Rules + KI)** | ++++ | 5€/Monat | 2d | ⚠️ |
| **Full KI (GPT)** | +++++ | 10-50€/Monat | 2d | ⚠️ |
| **RAG + Vector DB** | +++++ | 15€/Monat | 3d | ⚠️ |
| **Voice Input** | +++ | 0€ | 3h | ✅ |

---

## 🎯 Meine Empfehlung

### **Phase 1 (JETZT - 1 Woche):**
1. ✅ Synonyme hinzufügen (2h)
2. ✅ Entity Extraction (4h)
3. ✅ Besseres Kontext-Management (4h)

**Ergebnis:** Deutlich intelligenter, keine Kosten, DSGVO-sicher

### **Phase 2 (Später - 1 Monat):**
4. Hybrid KI-Integration (OpenAI GPT-4o-mini)
5. RAG mit Praxis-Wissensdatenbank
6. Conversation Memory

**Ergebnis:** Sehr intelligent, ~10€/Monat

### **Phase 3 (Optional):**
7. Voice Input
8. Analytics & Learning
9. Personalisierung

---

## 💡 Schnellste Verbesserung (30 Min):

Ich kann JETZT sofort die **Synonym-Erkennung** verbessern:

```typescript
// Mehr Keywords für bessere Erkennung
const KEYWORDS = {
  termin: ['termin', 'termine', 'appointment', 'buchung', 'reservierung',
           'sprechstunde', 'konsultation', 'vereinbarung', 'anmelden'],
  notfall: ['notfall', 'emergency', 'akut', 'dringend', 'sofort',
            'hilfe', 'schnell', 'asap', 'eilig'],
  // etc.
};
```

**Frage:** Was soll ich machen?

**A)** Synonym-Erkennung jetzt verbessern (30 Min)
**B)** Entity Extraction implementieren (4h)
**C)** KI-Integration vorbereiten (Konzept)
**D)** Erstmal testen, später entscheiden