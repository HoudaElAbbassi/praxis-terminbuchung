/**
 * Chatbot Konversationsflüsse
 *
 * Definiert alle möglichen Gesprächspfade und Antworten
 */

export type MessageType = 'bot' | 'user';

export interface QuickReply {
  label: string;
  value: string;
  action?: 'navigate' | 'message';
  href?: string;
}

export interface ChatMessage {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
}

export interface ChatFlow {
  id: string;
  trigger: string | string[];
  response: string;
  quickReplies?: QuickReply[];
  nextFlow?: string;
}

/**
 * Hauptmenü - Wird bei Chat-Start und "Zurück" angezeigt
 */
export const MAIN_MENU: ChatFlow = {
  id: 'main_menu',
  trigger: 'START',
  response: `👋 Hallo! Ich bin der digitale Assistent der Praxis für Gefäßmedizin Remscheid.

⚠️ **Wichtiger Hinweis:**
Bitte beachten Sie, dass ich nur eine KI bin und kein Arzt. Bei lebensbedrohlichen Zuständen (z.B. Herzinfarkt, Schlaganfall, schwere Unfälle, Atemnot) wählen Sie bitte umgehend die **112**, um den Rettungsdienst zu alarmieren.

Für akute, aber nicht lebensbedrohliche Probleme außerhalb der Sprechzeiten (z.B. hohes Fieber, Magenprobleme), die nicht bis zum nächsten Tag warten können, ist der ärztliche Bereitschaftsdienst unter der Nummer **116 117** die richtige Anlaufstelle.

Wie kann ich Ihnen helfen?`,
  quickReplies: [
    { label: '📅 Termin buchen', value: 'appointment' },
    { label: '📋 Unsere Leistungen', value: 'services' },
    { label: '❓ Häufige Fragen', value: 'faq' },
    { label: '📞 Kontakt', value: 'contact' },
  ],
};

/**
 * Alle Konversationsflüsse
 */
export const CHAT_FLOWS: Record<string, ChatFlow> = {
  // ============================================
  // TERMINBUCHUNG
  // ============================================
  appointment: {
    id: 'appointment',
    trigger: 'appointment',
    response: `📅 Gerne helfe ich Ihnen bei der Terminbuchung!

Möchten Sie direkt online buchen oder bevorzugen Sie einen Rückruf von unserem Praxisteam?`,
    quickReplies: [
      {
        label: '🌐 Online buchen',
        value: 'book_online',
        action: 'navigate',
        href: '/termine/buchen',
      },
      { label: '📞 Rückruf anfordern', value: 'callback' },
      { label: '« Zurück zum Menü', value: 'main_menu' },
    ],
  },

  book_online: {
    id: 'book_online',
    trigger: 'book_online',
    response: `✅ Perfekt! Ich leite Sie jetzt zur Online-Terminbuchung weiter.

Dort können Sie:
• Ihren Wunschtermin auswählen
• Ihre bevorzugten Tage & Zeiten angeben
• Alle wichtigen Informationen eingeben

Einen Moment bitte...`,
    quickReplies: [
      {
        label: '→ Zur Terminbuchung',
        value: 'navigate_booking',
        action: 'navigate',
        href: '/termine/buchen',
      },
    ],
  },

  callback: {
    id: 'callback',
    trigger: 'callback',
    response: `📞 Gerne rufen wir Sie zurück!

Bitte kontaktieren Sie uns telefonisch oder per E-Mail:

📞 **Telefon:** 02191 6917400
✉️ **E-Mail:** info@gefaessmedizinremscheid.de

**Sprechzeiten:**
Montag und Mittwoch: 08:00 – 12:00, 12:30 – 16:00 Uhr
Dienstag und Donnerstag: 10:00 – 14:00, 14:30 – 17:00 Uhr
Freitag: 08:00 – 12:00 Uhr`,
    quickReplies: [
      { label: 'Doch lieber online buchen', value: 'book_online' },
      { label: '« Zurück zum Menü', value: 'main_menu' },
    ],
  },

  // ============================================
  // LEISTUNGEN
  // ============================================
  services: {
    id: 'services',
    trigger: 'services',
    response: `📋 Wir bieten Ihnen umfassende gefäßmedizinische Versorgung:

**Unsere Schwerpunkte:**
• Diagnostik von Gefäßerkrankungen
• Behandlung von Durchblutungsstörungen
• Vorsorgeuntersuchungen
• Therapie & Nachsorge

Welcher Bereich interessiert Sie?`,
    quickReplies: [
      { label: '🔬 Diagnostik', value: 'diagnostics' },
      { label: '💉 Behandlungen', value: 'treatments' },
      { label: '🏥 Vorsorge', value: 'prevention' },
      {
        label: '📄 Alle Leistungen',
        value: 'all_services',
        action: 'navigate',
        href: '/leistungen',
      },
      { label: '« Zurück zum Menü', value: 'main_menu' },
    ],
  },

  diagnostics: {
    id: 'diagnostics',
    trigger: 'diagnostics',
    response: `🔬 **Diagnostische Leistungen:**

• Ultraschall-Untersuchungen (Doppler/Duplex)
• ABI-Messung (Knöchel-Arm-Index)
• Gefäßultraschall
• Labordiagnostik
• Laufbandergometrie

Mehr Informationen zu unseren Diagnosemethoden finden Sie auf unserer Leistungsseite.`,
    quickReplies: [
      {
        label: 'Mehr erfahren',
        value: 'more_diagnostics',
        action: 'navigate',
        href: '/leistungen',
      },
      { label: 'Termin buchen', value: 'appointment' },
      { label: '« Zurück', value: 'services' },
    ],
  },

  treatments: {
    id: 'treatments',
    trigger: 'treatments',
    response: `💉 **Behandlungsmöglichkeiten:**

• Medikamentöse Therapie
• Kompressionstherapie
• Sklerosierung (Verödung)
• Wundbehandlung
• Nachsorge & Verlaufskontrolle

Für eine individuelle Beratung vereinbaren Sie gerne einen Termin.`,
    quickReplies: [
      { label: 'Termin vereinbaren', value: 'appointment' },
      { label: '« Zurück', value: 'services' },
    ],
  },

  prevention: {
    id: 'prevention',
    trigger: 'prevention',
    response: `🏥 **Vorsorgeleistungen:**

• Gefäß-Check-up
• Risiko-Screening
• Früherkennung von Durchblutungsstörungen
• Individuelle Beratung
• Präventionskonzepte

Vorsorge ist besser als Nachsorge! Vereinbaren Sie einen Check-up Termin.`,
    quickReplies: [
      { label: 'Check-up Termin buchen', value: 'appointment' },
      { label: '« Zurück', value: 'services' },
    ],
  },

  // ============================================
  // FAQ (Häufige Fragen)
  // ============================================
  faq: {
    id: 'faq',
    trigger: 'faq',
    response: `❓ **Häufig gestellte Fragen**

Wählen Sie ein Thema:`,
    quickReplies: [
      { label: '🕐 Öffnungszeiten', value: 'opening_hours' },
      { label: '🚗 Anfahrt & Parken', value: 'location' },
      { label: '💳 Versicherungen', value: 'insurance' },
      { label: '📄 Erstbesuch - Was mitbringen?', value: 'first_visit' },
      { label: '🚨 Notfall', value: 'emergency' },
      { label: '« Zurück zum Menü', value: 'main_menu' },
    ],
  },

  opening_hours: {
    id: 'opening_hours',
    trigger: 'opening_hours',
    response: `🕐 **Unsere Sprechzeiten:**

**Montag und Mittwoch:**
08:00 – 12:00, 12:30 – 16:00 Uhr

**Dienstag und Donnerstag:**
10:00 – 14:00, 14:30 – 17:00 Uhr

**Freitag:**
08:00 – 12:00 Uhr

**Samstag-Sonntag:**
Geschlossen

⚠️ **Wichtig:** Termine nur nach vorheriger Vereinbarung.`,
    quickReplies: [
      { label: 'Jetzt Termin buchen', value: 'appointment' },
      { label: '« Zurück zu FAQ', value: 'faq' },
    ],
  },

  location: {
    id: 'location',
    trigger: 'location',
    response: `🚗 **Anfahrt & Parken:**

**Adresse:**
Ärztehaus Remscheid
Remscheid

**Parkmöglichkeiten:**
• Parkplätze direkt vor der Praxis
• Öffentliche Parkplätze in der Nähe

**ÖPNV:**
Bushaltestelle "XYZ" (5 Min. Fußweg)`,
    quickReplies: [
      {
        label: 'In Google Maps öffnen',
        value: 'maps',
        action: 'navigate',
        href: '/kontakt',
      },
      { label: '« Zurück zu FAQ', value: 'faq' },
    ],
  },

  insurance: {
    id: 'insurance',
    trigger: 'insurance',
    response: `💳 **Versicherungen & Abrechnung:**

Wir behandeln Patienten aller Versicherungsarten:

✅ **Gesetzliche Krankenversicherung**
✅ **Private Krankenversicherung**
✅ **Selbstzahler**

Bitte bringen Sie zum ersten Termin Ihre Versichertenkarte mit.`,
    quickReplies: [
      { label: 'Termin buchen', value: 'appointment' },
      { label: '« Zurück zu FAQ', value: 'faq' },
    ],
  },

  first_visit: {
    id: 'first_visit',
    trigger: 'first_visit',
    response: `📄 **Erstbesuch - Das sollten Sie mitbringen:**

✅ **Versichertenkarte** (Krankenkassenkarte)
✅ **Überweisungsschein** (falls vorhanden)
✅ **Vorbefunde & Arztbriefe**
✅ **Medikamentenliste** (aktuell eingenommene Medikamente)
✅ **Bildgebung** (falls vorhanden: CDs, Röntgenbilder etc.)

**Tipp:** Kommen Sie bitte 10 Minuten vor Ihrem Termin, um die Anmeldung auszufüllen.`,
    quickReplies: [
      { label: 'Ersttermin buchen', value: 'appointment' },
      { label: '« Zurück zu FAQ', value: 'faq' },
    ],
  },

  emergency: {
    id: 'emergency',
    trigger: ['emergency', 'notfall', 'akut', 'dringend'],
    response: `⚠️ **Notfall oder dringender Termin?**

Bitte wählen Sie die passende Option:`,
    quickReplies: [
      { label: '🚨 Medizinischer Notfall', value: 'medical_emergency' },
      { label: '⚡ Dringender Termin benötigt', value: 'urgent_appointment' },
      { label: '« Zurück zum Menü', value: 'main_menu' },
    ],
  },

  medical_emergency: {
    id: 'medical_emergency',
    trigger: 'medical_emergency',
    response: `🚨 **Bei lebensbedrohlichen Situationen:**

Wenden Sie sich bitte SOFORT an:

🚑 **Notruf:** 112
📞 **Ärztlicher Bereitschaftsdienst:** 116 117

**Beispiele für Notfälle:**
• Plötzliche starke Schmerzen
• Starke Blutungen
• Bewusstlosigkeit
• Atemnot

**Unsere Praxis ist KEINE Notaufnahme!**`,
    quickReplies: [
      { label: 'Doch kein Notfall - Termin buchen', value: 'urgent_appointment' },
      { label: '« Zurück zum Menü', value: 'main_menu' },
    ],
  },

  urgent_appointment: {
    id: 'urgent_appointment',
    trigger: 'urgent_appointment',
    response: `⚡ **Dringender Termin benötigt**

Wir verstehen, dass Ihr Anliegen dringend ist.

Für einen kurzfristigen Termin haben Sie folgende Möglichkeiten:`,
    quickReplies: [
      {
        label: '📞 SOFORT anrufen',
        value: 'call_practice',
      },
      {
        label: '🌐 Dringenden Termin online anfragen',
        value: 'urgent_online',
      },
      { label: '« Zurück', value: 'emergency' },
    ],
  },

  call_practice: {
    id: 'call_practice',
    trigger: 'call_practice',
    response: `📞 **Rufen Sie uns JETZT an:**

**Telefon:** 02191 6917400

**Sprechzeiten:**
Montag und Mittwoch: 08:00 – 12:00, 12:30 – 16:00 Uhr
Dienstag und Donnerstag: 10:00 – 14:00, 14:30 – 17:00 Uhr
Freitag: 08:00 – 12:00 Uhr

Schildern Sie am Telefon, dass es dringend ist. Wir finden eine Lösung für Sie!

⚠️ **Außerhalb der Sprechzeiten:**
Ärztlicher Bereitschaftsdienst: **116 117**`,
    quickReplies: [
      { label: 'Doch lieber online anfragen', value: 'urgent_online' },
      { label: '« Zurück zum Menü', value: 'main_menu' },
    ],
  },

  urgent_online: {
    id: 'urgent_online',
    trigger: 'urgent_online',
    response: `🌐 **Dringenden Termin online anfragen**

Bei der Online-Terminbuchung können Sie:

✅ **"Dringender Termin"** als Grund angeben
✅ Ihre **bevorzugten Zeiten** (auch kurzfristig) auswählen
✅ Ihr Anliegen genau beschreiben

Unser Praxisteam wird Ihre Anfrage **prioritär bearbeiten** und sich schnellstmöglich bei Ihnen melden!

**Bearbeitungszeit:** In der Regel innerhalb von 1-2 Stunden während der Sprechzeiten.`,
    quickReplies: [
      {
        label: '→ Zur dringenden Terminanfrage',
        value: 'book_urgent',
        action: 'navigate',
        href: '/termine/buchen',
      },
      { label: 'Doch lieber anrufen', value: 'call_practice' },
      { label: '« Zurück', value: 'urgent_appointment' },
    ],
  },

  // ============================================
  // KONTAKT
  // ============================================
  contact: {
    id: 'contact',
    trigger: 'contact',
    response: `📞 **Kontaktmöglichkeiten:**

**Telefon:** 02191 6917400
**Fax:** 02191 4694938
**E-Mail:** info@gefaessmedizinremscheid.de

**Sprechzeiten:**
Montag und Mittwoch: 08:00 – 12:00, 12:30 – 16:00 Uhr
Dienstag und Donnerstag: 10:00 – 14:00, 14:30 – 17:00 Uhr
Freitag: 08:00 – 12:00 Uhr
Samstag-Sonntag: Geschlossen

**Adresse:**
Freiheitsstraße 203
42853 Remscheid

Sie können uns auch über unser Kontaktformular erreichen.`,
    quickReplies: [
      {
        label: 'Kontaktformular',
        value: 'contact_form',
        action: 'navigate',
        href: '/kontakt',
      },
      { label: 'Termin buchen', value: 'appointment' },
      { label: '« Zurück zum Menü', value: 'main_menu' },
    ],
  },

  // ============================================
  // FALLBACK / NICHT VERSTANDEN
  // ============================================
  fallback: {
    id: 'fallback',
    trigger: 'FALLBACK',
    response: `Entschuldigung, das habe ich nicht ganz verstanden. 🤔

Versuchen Sie es mit einer der folgenden Optionen:`,
    quickReplies: [
      { label: '📅 Termin buchen', value: 'appointment' },
      { label: '📋 Leistungen', value: 'services' },
      { label: '❓ Häufige Fragen', value: 'faq' },
      { label: '📞 Kontakt', value: 'contact' },
    ],
  },
};

/**
 * Hilfsfunktion: Flow anhand Trigger finden
 */
export function findFlowByTrigger(input: string): ChatFlow {
  const normalizedInput = input.toLowerCase().trim();

  // Direkte Matches
  for (const flow of Object.values(CHAT_FLOWS)) {
    if (Array.isArray(flow.trigger)) {
      if (flow.trigger.some(t => normalizedInput.includes(t.toLowerCase()))) {
        return flow;
      }
    } else if (flow.trigger === normalizedInput) {
      return flow;
    }
  }

  // Keyword-basierte Matches
  if (normalizedInput.includes('notfall') || normalizedInput.includes('akut') || normalizedInput.includes('dringend') || normalizedInput.includes('sofort')) {
    return CHAT_FLOWS.emergency;
  }
  if (normalizedInput.includes('termin') || normalizedInput.includes('buchung')) {
    return CHAT_FLOWS.appointment;
  }
  if (normalizedInput.includes('leistung') || normalizedInput.includes('behandlung')) {
    return CHAT_FLOWS.services;
  }
  if (normalizedInput.includes('öffnung') || normalizedInput.includes('zeit')) {
    return CHAT_FLOWS.opening_hours;
  }
  if (normalizedInput.includes('kontakt') || normalizedInput.includes('telefon') || normalizedInput.includes('anruf')) {
    return CHAT_FLOWS.contact;
  }

  // Fallback
  return CHAT_FLOWS.fallback;
}

/**
 * Hilfsfunktion: Flow anhand ID finden
 */
export function getFlowById(id: string): ChatFlow {
  if (id === 'main_menu' || id === 'START') {
    return MAIN_MENU;
  }
  return CHAT_FLOWS[id] || CHAT_FLOWS.fallback;
}
