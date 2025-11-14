# Chatbot Implementierungs-Plan

## ✅ Schritt 1: Konversationsflüsse (FERTIG)

Die kompletten Chatbot-Dialoge sind definiert in:
```
lib/chatbot-flows.ts
```

### Was ist implementiert:

#### 📋 Hauptmenü
- Begrüßung
- 4 Hauptoptionen: Termin, Leistungen, FAQ, Kontakt

#### 📅 Terminbuchung
- Online buchen → Weiterleitung zu /termine/buchen
- Rückruf anfordern → Kontaktdaten anzeigen

#### 📋 Leistungen
- Diagnostik
- Behandlungen
- Vorsorge
- Link zu /leistungen

#### ❓ FAQ
- Öffnungszeiten
- Anfahrt & Parken
- Versicherungen
- Erstbesuch (was mitbringen)
- Notfall-Hinweise

#### 📞 Kontakt
- Telefon, E-Mail, Adresse
- Link zu Kontaktformular

#### 🤖 Intelligenz
- Keyword-Erkennung (z.B. "Termin", "Notfall")
- Fallback bei nicht verstandenen Eingaben
- Quick-Reply-Buttons für einfache Navigation

---

## 🔧 TODO: Platzhalter ausfüllen

In `lib/chatbot-flows.ts` müssen noch folgende Informationen ergänzt werden:

### 1. Telefonnummer
```typescript
// Suche nach: [TELEFONNUMMER EINFÜGEN]
// Ersetze mit: 0211 12345678 (Beispiel)
```

**Vorkommen:**
- Callback-Flow
- Kontakt-Flow

### 2. Adresse
```typescript
// Suche nach: [ADRESSE EINFÜGEN]
// Ersetze mit vollständiger Praxisadresse:
// Musterstraße 123
// 42853 Remscheid
```

**Vorkommen:**
- Location-Flow
- Kontakt-Flow

### 3. Optional: Bushaltestelle
```typescript
// Suche nach: Bushaltestelle "XYZ"
// Ersetze mit: Bushaltestelle "Hauptbahnhof"
```

---

## 📝 Nächste Schritte

### Schritt 2: UI entwickeln (TODO)

**Komponenten die erstellt werden müssen:**

1. **ChatWidget.tsx**
   - Floating Button (rechts unten)
   - Icon: 💬
   - Badge für neue Nachrichten

2. **ChatWindow.tsx**
   - Chat-Container
   - Header mit Titel & Schließen-Button
   - Message-Liste
   - Input-Feld
   - Quick-Reply-Buttons

3. **Message.tsx**
   - Bot-Nachricht (links, blau)
   - User-Nachricht (rechts, grau)
   - Timestamp
   - Animation beim Erscheinen

4. **QuickReply.tsx**
   - Button-Komponente
   - Hover-Effekt
   - Icon-Support

5. **TypingIndicator.tsx**
   - "Bot tippt..." Animation
   - 3 pulsierende Punkte

**Design-Specs:**
- Farben: `#2c5f7c` (Blau), `#4a9d8f` (Türkis)
- Schriftart: System-Font
- Responsive: Desktop & Mobile
- Animation: Smooth transitions

### Schritt 3: Logik implementieren (TODO)

**Dateien:**

1. **useChatbot.ts** (React Hook)
   - Chat-State Management
   - Message-Handling
   - Flow-Navigation

2. **ChatContext.tsx** (Context)
   - Globaler Chat-State
   - Öffnen/Schließen
   - History

### Schritt 4: Integration (TODO)

1. ChatWidget in `app/layout.tsx` einbinden
2. Z-Index korrekt setzen
3. Mobile-Optimierung
4. Performance-Check

### Schritt 5: Testing (TODO)

- [ ] Alle Flows durchklicken
- [ ] Mobile testen
- [ ] Navigation funktioniert
- [ ] Accessibility (Keyboard-Navigation)
- [ ] Performance (Bundle-Size)

---

## 🎨 Design-Vorschau

### Desktop
```
┌──────────────────────────────────┐
│                                  │
│     Website Content              │
│                                  │
│                          ┌─────┐ │
│                          │ 💬  │ │ ← Chat Button
│                          └─────┘ │
└──────────────────────────────────┘
```

### Chat geöffnet
```
┌────────────────────────┐
│ 🤖 Praxis-Assistent  ✕ │ ← Header
├────────────────────────┤
│ Bot: Hallo! ...        │
│                        │
│         User: Hi!      │
│                        │
│ Bot: Wie kann ich...   │
├────────────────────────┤
│ [Termin] [FAQ] [Mehr]  │ ← Quick Replies
├────────────────────────┤
│ Nachricht eingeben...  │ ← Input
└────────────────────────┘
```

---

## 📊 Geschätzte Entwicklungszeit

| Schritt | Zeit | Status |
|---------|------|--------|
| 1. Konversationsflüsse | 2h | ✅ FERTIG |
| 2. UI Komponenten | 4h | ⏳ TODO |
| 3. Logik | 2h | ⏳ TODO |
| 4. Integration | 1h | ⏳ TODO |
| 5. Testing | 1h | ⏳ TODO |
| **Gesamt** | **10h** | **10% fertig** |

---

## 🚀 Bereit für Schritt 2?

**Nächste Aufgabe:** Chat-Widget UI entwickeln

**Was wird erstellt:**
1. Floating Chat-Button (animiert)
2. Chat-Fenster mit Messages
3. Quick-Reply-Buttons
4. Responsive Design

**Geschätzte Dauer:** 3-4 Stunden

Soll ich mit der UI-Entwicklung beginnen?
