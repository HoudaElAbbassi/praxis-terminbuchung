"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type AppointmentType = {
  id: string;
  name: string;
  duration: number;
  description: string | null;
};

type TimeSlot = {
  time: string;
  available: boolean;
};

interface BuchenClientProps {
  initialAppointmentTypes: AppointmentType[];
}

export default function BuchenClient({ initialAppointmentTypes }: BuchenClientProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [appointmentTypes] = useState<AppointmentType[]>(initialAppointmentTypes);
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(null);

  // Verfügbarkeits-Präferenzen
  const [preferredTimeSlots, setPreferredTimeSlots] = useState<string[]>([]);
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [specialRemarks, setSpecialRemarks] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Kontaktdaten
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    notes: "",
    insuranceType: "",
    isFirstVisit: "",
    reasonForVisit: "",
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = async () => {
    setIsLoading(true);
    setError("");

    // Validierung
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.phone || !contactData.address || !contactData.notes) {
      setError("Bitte füllen Sie alle Pflichtfelder aus");
      setIsLoading(false);
      return;
    }

    if (preferredTimeSlots.length === 0 || preferredDays.length === 0) {
      setError("Bitte wählen Sie mindestens ein Zeitfenster und einen Wochentag");
      setIsLoading(false);
      return;
    }

    if (!privacyAccepted) {
      setError("Bitte akzeptieren Sie die Datenschutzerklärung");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/appointments/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentTypeId: selectedType?.id,
          preferredTimeSlots: JSON.stringify(preferredTimeSlots),
          preferredDays: JSON.stringify(preferredDays),
          specialRemarks,
          ...contactData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Buchung fehlgeschlagen");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler für Zeitfenster-Auswahl
  const toggleTimeSlot = (slot: string) => {
    if (preferredTimeSlots.includes(slot)) {
      setPreferredTimeSlots(preferredTimeSlots.filter(s => s !== slot));
    } else {
      setPreferredTimeSlots([...preferredTimeSlots, slot]);
    }
  };

  // Handler für Wochentag-Auswahl
  const toggleDay = (day: string) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter(d => d !== day));
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo.jpeg"
                alt="Praxis Logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-200">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold text-primary-600 mb-4"
              style={{fontFamily: "'Playfair Display', serif"}}
            >
              Terminanfrage erfolgreich gesendet!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Vielen Dank, <span className="font-semibold text-primary-600">{contactData.firstName}</span>! Wir haben Ihre Terminanfrage erhalten und werden schnellstmöglich versuchen, Ihnen einen passenden Termin anzubieten. Die Praxis wird sich zeitnah mit konkreten Terminvorschlägen bei Ihnen melden. Eine Bestätigungsmail wurde an <span className="font-semibold">{contactData.email}</span> gesendet.
            </p>
            <div className="bg-[#e8f4f2] border-2 border-[#4a9d8f] rounded-lg p-6 mb-8">
              <h3
                className="font-bold text-primary-600 mb-4 text-xl"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Ihre Angaben:
              </h3>
              <div className="text-left space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Terminart:</span> {selectedType?.name}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Bevorzugte Tage:</span> {preferredDays.map(day => {
                    const dayNames: {[key: string]: string} = {
                      'MONDAY': 'Montag', 'TUESDAY': 'Dienstag', 'WEDNESDAY': 'Mittwoch',
                      'THURSDAY': 'Donnerstag', 'FRIDAY': 'Freitag'
                    };
                    return dayNames[day];
                  }).join(', ')}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Bevorzugte Zeiten:</span> {preferredTimeSlots.map(slot => {
                    const slotNames: {[key: string]: string} = {
                      'morning': 'Vormittags (8-12 Uhr)',
                      'afternoon': 'Nachmittags (12-17 Uhr)'
                    };
                    return slotNames[slot];
                  }).join(', ')}
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="btn-primary inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo.jpeg"
                alt="Praxis Logo"
                width={80}
                height={80}
                className="rounded-lg shadow-md"
              />
            </div>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-3"
              style={{fontFamily: "'Playfair Display', serif"}}
            >
              Online-Terminbuchung
            </h1>
            <p className="text-base sm:text-lg text-gray-600">Wählen Sie Ihren Wunschtermin in nur wenigen Schritten</p>
          </div>
        </div>

        {/* Progress Steps - Mobile Optimiert */}
        <div className="mb-8 sm:mb-12">
          {/* Mobile: Kompakte Anzeige */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-primary-600">Schritt {step} von 4</span>
              <span className="text-xs text-gray-600">
                {step === 1 && "Terminart"}
                {step === 2 && "Datum & Zeit"}
                {step === 3 && "Ihre Daten"}
                {step === 4 && "Bestätigung"}
              </span>
            </div>
            <div className="flex gap-1">
              <div className={`flex-1 h-2 rounded ${step >= 1 ? "bg-primary-600" : "bg-gray-300"}`}></div>
              <div className={`flex-1 h-2 rounded ${step >= 2 ? "bg-primary-600" : "bg-gray-300"}`}></div>
              <div className={`flex-1 h-2 rounded ${step >= 3 ? "bg-primary-600" : "bg-gray-300"}`}></div>
              <div className={`flex-1 h-2 rounded ${step >= 4 ? "bg-primary-600" : "bg-gray-300"}`}></div>
            </div>
          </div>

          {/* Desktop: Volle Anzeige */}
          <div className="hidden sm:flex justify-center">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${step >= 1 ? "text-primary-600" : "text-gray-400"}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-primary-600 text-white shadow-md" : "bg-gray-300 text-gray-600"}`}>
                  {step > 1 ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : "1"}
                </div>
                <span className="ml-3 font-semibold">Terminart</span>
              </div>
              <div className={`w-16 h-1 rounded ${step >= 2 ? "bg-primary-600" : "bg-gray-300"}`}></div>
              <div className={`flex items-center ${step >= 2 ? "text-primary-600" : "text-gray-400"}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-primary-600 text-white shadow-md" : "bg-gray-300 text-gray-600"}`}>
                  {step > 2 ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : "2"}
                </div>
                <span className="ml-3 font-semibold">Datum & Zeit</span>
              </div>
              <div className={`w-16 h-1 rounded ${step >= 3 ? "bg-primary-600" : "bg-gray-300"}`}></div>
              <div className={`flex items-center ${step >= 3 ? "text-primary-600" : "text-gray-400"}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-primary-600 text-white shadow-md" : "bg-gray-300 text-gray-600"}`}>
                  {step > 3 ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : "3"}
                </div>
                <span className="ml-3 font-semibold">Ihre Daten</span>
              </div>
              <div className={`w-16 h-1 rounded ${step >= 4 ? "bg-primary-600" : "bg-gray-300"}`}></div>
              <div className={`flex items-center ${step >= 4 ? "text-primary-600" : "text-gray-400"}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= 4 ? "bg-primary-600 text-white shadow-md" : "bg-gray-300 text-gray-600"}`}>
                  4
                </div>
                <span className="ml-3 font-semibold">Bestätigung</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <div className="card">
          {/* Step 1: Terminart auswählen */}
          {step === 1 && (
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-primary-600 mb-4 sm:mb-6"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Wählen Sie eine Terminart
              </h2>
              <div className="grid gap-4">
                {appointmentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type);
                      setStep(2);
                    }}
                    className="p-4 sm:p-6 border-2 border-gray-200 rounded-lg hover:border-primary-600 active:border-primary-600 hover:bg-primary-50 active:bg-primary-50 transition-all duration-300 text-left group shadow-sm hover:shadow-md touch-manipulation"
                  >
                    <h3
                      className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600"
                      style={{fontFamily: "'Playfair Display', serif"}}
                    >
                      {type.name}
                    </h3>
                    {type.description && <p className="text-gray-500 text-xs sm:text-sm">{type.description}</p>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Verfügbarkeit angeben */}
          {step === 2 && (
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-primary-600 mb-4"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Wann könnten Sie zu uns kommen?
              </h2>
              <div className="bg-[#e8f4f2] border border-[#4a9d8f] rounded-lg p-4 mb-6">
                <p className="text-gray-700 mb-2">
                  <svg className="w-5 h-5 inline-block mr-2 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Gewählte Terminart: <span className="font-bold text-primary-600">{selectedType?.name}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Bitte geben Sie uns Ihre zeitlichen Präferenzen an. Wir melden uns bei Ihnen mit einem passenden Terminvorschlag.
                </p>
              </div>

              {/* Zeitfenster wählen */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-3">
                  Bevorzugte Tageszeit (mehrere auswählbar)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'morning', label: 'Vormittags', desc: '8:00 - 12:00 Uhr' },
                    { value: 'afternoon', label: 'Nachmittags', desc: '12:00 - 17:00 Uhr' }
                  ].map((slot) => (
                    <button
                      key={slot.value}
                      onClick={() => toggleTimeSlot(slot.value)}
                      className={`p-4 border-2 rounded-lg text-left transition-all duration-200 touch-manipulation ${
                        preferredTimeSlots.includes(slot.value)
                          ? "border-primary-600 bg-primary-600 text-white shadow-lg"
                          : "border-gray-300 hover:border-primary-600 hover:bg-primary-50 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-base">{slot.label}</div>
                          <div className={`text-sm ${preferredTimeSlots.includes(slot.value) ? 'text-white opacity-90' : 'text-gray-600'}`}>
                            {slot.desc}
                          </div>
                        </div>
                        {preferredTimeSlots.includes(slot.value) && (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wochentage wählen */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-3">
                  Bevorzugte Wochentage (mehrere auswählbar)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { value: 'MONDAY', label: 'Montag' },
                    { value: 'TUESDAY', label: 'Dienstag' },
                    { value: 'WEDNESDAY', label: 'Mittwoch' },
                    { value: 'THURSDAY', label: 'Donnerstag' },
                    { value: 'FRIDAY', label: 'Freitag' }
                  ].map((day) => (
                    <button
                      key={day.value}
                      onClick={() => toggleDay(day.value)}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200 relative touch-manipulation ${
                        preferredDays.includes(day.value)
                          ? "border-primary-600 bg-primary-600 text-white shadow-lg"
                          : "border-gray-300 hover:border-primary-600 hover:bg-primary-50 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{day.label}</span>
                        {preferredDays.includes(day.value) && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Besondere Anmerkungen */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                  Besondere Anmerkungen oder Einschränkungen (optional)
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  z.B. "Ich kann nur vormittags" oder "Bitte nicht in der KW 45"
                </p>
                <textarea
                  name="specialRemarks"
                  value={specialRemarks}
                  onChange={(e) => setSpecialRemarks(e.target.value)}
                  rows={3}
                  className="input-field text-gray-900 resize-none"
                  placeholder="Ihre besonderen Wünsche oder Einschränkungen..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setStep(1);
                    setPreferredTimeSlots([]);
                    setPreferredDays([]);
                  }}
                  className="px-6 py-4 sm:py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-50 font-semibold transition-all duration-300 shadow-sm hover:shadow-md touch-manipulation text-base sm:text-base"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={preferredTimeSlots.length === 0 || preferredDays.length === 0}
                  className="btn-primary flex-1 py-4 sm:py-3 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none touch-manipulation text-base sm:text-base"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Kontaktdaten */}
          {step === 3 && (
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-primary-600 mb-4"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Ihre Kontaktdaten
              </h2>
              <p className="text-gray-600 mb-6">
                Bitte geben Sie Ihre Daten ein, damit wir Ihren Termin bestätigen können.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                    Vorname *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={contactData.firstName}
                    onChange={handleContactChange}
                    placeholder="Max"
                    className="input-field text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                    Nachname *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={contactData.lastName}
                    onChange={handleContactChange}
                    placeholder="Mustermann"
                    className="input-field text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={contactData.email}
                    onChange={handleContactChange}
                    placeholder="ihre.email@beispiel.de"
                    className="input-field text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={contactData.phone}
                    onChange={handleContactChange}
                    placeholder="+49 123 456789"
                    className="input-field text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                    Versicherungsart *
                  </label>
                  <select
                    name="insuranceType"
                    required
                    value={contactData.insuranceType}
                    onChange={handleContactChange}
                    className="input-field text-gray-900"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="STATUTORY">Gesetzlich versichert</option>
                    <option value="PRIVATE">Privat versichert</option>
                    <option value="SELF_PAYER">Selbstzahler</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                    Besuchsart *
                  </label>
                  <select
                    name="isFirstVisit"
                    required
                    value={contactData.isFirstVisit}
                    onChange={handleContactChange}
                    className="input-field text-gray-900"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="true">Ersttermin (Neuer Patient)</option>
                    <option value="false">Folgetermin (Bestehender Patient)</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                  Grund des Besuchs *
                </label>
                <select
                  name="reasonForVisit"
                  required
                  value={contactData.reasonForVisit}
                  onChange={handleContactChange}
                  className="input-field text-gray-900"
                >
                  <option value="">Bitte wählen</option>
                  <optgroup label="Diagnostik">
                    <option value="Farbduplexsonographie">Farbduplexsonographie</option>
                    <option value="Laufband-Messung">Laufband-Messung</option>
                    <option value="Gefäßuntersuchung">Allgemeine Gefäßuntersuchung</option>
                  </optgroup>
                  <optgroup label="Venenerkrankungen">
                    <option value="Besenreiser">Besenreiser</option>
                    <option value="Beinschwellungen">Beinschwellungen</option>
                    <option value="Krampfadern">Krampfadern / Varizen</option>
                    <option value="Venenthrombose">Verdacht auf Venenthrombose</option>
                  </optgroup>
                  <optgroup label="Arterielle Erkrankungen">
                    <option value="pAVK">pAVK / Schaufensterkrankheit</option>
                    <option value="Carotisstenose">Carotisstenose (Halsschlagader)</option>
                    <option value="Aneurysma">Aneurysma-Kontrolle</option>
                  </optgroup>
                  <optgroup label="Lymphatische Erkrankungen">
                    <option value="Lymphödem">Lymphödem</option>
                    <option value="Lipödem">Lipödem</option>
                  </optgroup>
                  <optgroup label="Sonstiges">
                    <option value="Kontrolle">Kontroll-Termin</option>
                    <option value="Beratung">Beratung / Zweitmeinung</option>
                    <option value="Sonstiges">Sonstiges</option>
                  </optgroup>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                  Geburtsdatum (optional)
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={contactData.dateOfBirth}
                  onChange={handleContactChange}
                  placeholder="TT.MM.JJJJ"
                  className="input-field text-gray-900"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={contactData.address}
                  onChange={handleContactChange}
                  placeholder="Musterstraße 123, 12345 Stadt"
                  className="input-field text-gray-900"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                  Warum möchten Sie einen Termin? *
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  Bitte beschreiben Sie kurz Ihr Anliegen und warum Sie einen Termin benötigen. Dies hilft uns, Sie bestmöglich vorzubereiten.
                </p>
                <textarea
                  name="notes"
                  required
                  value={contactData.notes}
                  onChange={handleContactChange}
                  rows={4}
                  className="input-field text-gray-900"
                  placeholder="Beispiel: Ich habe Schmerzen beim Gehen und möchte eine Untersuchung meiner Beingefäße..."
                />
              </div>

              <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 mr-3 h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    required
                  />
                  <span className="text-sm text-gray-800">
                    Ich habe die{" "}
                    <Link href="/datenschutz" target="_blank" className="text-primary-600 hover:text-primary-700 font-semibold underline">
                      Datenschutzerklärung
                    </Link>{" "}
                    zur Kenntnis genommen und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Terminanfrage gespeichert und verarbeitet werden. *
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-4 sm:py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-50 font-semibold transition-all duration-300 shadow-sm hover:shadow-md touch-manipulation text-base"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.phone || !contactData.address || !contactData.notes || !contactData.insuranceType || !contactData.isFirstVisit || !contactData.reasonForVisit || !privacyAccepted}
                  className="btn-primary flex-1 py-4 sm:py-3 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none touch-manipulation text-base"
                >
                  Weiter zur Bestätigung
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Bestätigung */}
          {step === 4 && (
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold text-primary-600 mb-4 sm:mb-6"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Zusammenfassung
              </h2>
              <div className="bg-[#e8f4f2] border-2 border-[#4a9d8f] p-6 rounded-lg mb-6">
                <h3
                  className="font-bold text-primary-600 mb-4 text-lg"
                  style={{fontFamily: "'Playfair Display', serif"}}
                >
                  Ihre Angaben im Überblick:
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Name:</span>
                    <span>{contactData.firstName} {contactData.lastName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">E-Mail:</span>
                    <span>{contactData.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Telefon:</span>
                    <span>{contactData.phone}</span>
                  </div>
                  <div className="border-t-2 border-[#4a9d8f] my-4"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Terminart:</span>
                    <span>{selectedType?.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Versicherung:</span>
                    <span>
                      {contactData.insuranceType === 'STATUTORY' && 'Gesetzlich versichert'}
                      {contactData.insuranceType === 'PRIVATE' && 'Privat versichert'}
                      {contactData.insuranceType === 'SELF_PAYER' && 'Selbstzahler'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Besuchsart:</span>
                    <span>{contactData.isFirstVisit === 'true' ? 'Ersttermin' : 'Folgetermin'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Grund:</span>
                    <span>{contactData.reasonForVisit}</span>
                  </div>
                  <div className="border-t-2 border-[#4a9d8f] my-4"></div>
                  <div>
                    <span className="font-semibold">Bevorzugte Tage:</span>
                    <p className="mt-1">
                      {preferredDays.map(day => {
                        const dayNames: {[key: string]: string} = {
                          'MONDAY': 'Montag', 'TUESDAY': 'Dienstag', 'WEDNESDAY': 'Mittwoch',
                          'THURSDAY': 'Donnerstag', 'FRIDAY': 'Freitag'
                        };
                        return dayNames[day];
                      }).join(', ')}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold">Bevorzugte Zeiten:</span>
                    <p className="mt-1">
                      {preferredTimeSlots.map(slot => {
                        const slotNames: {[key: string]: string} = {
                          'morning': 'Vormittags (8-12 Uhr)',
                          'afternoon': 'Nachmittags (12-17 Uhr)'
                        };
                        return slotNames[slot];
                      }).join(', ')}
                    </p>
                  </div>
                  {contactData.notes && (
                    <>
                      <div className="border-t-2 border-[#4a9d8f] my-4"></div>
                      <div>
                        <span className="font-semibold">Notizen:</span>
                        <p className="mt-1 text-gray-700">{contactData.notes}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Hinweis:</strong> Nach dem Absenden erhalten Sie eine Bestätigungs-E-Mail. Die Praxis wird schnellstmöglich versuchen, Ihnen einen passenden Termin anzubieten und meldet sich zeitnah mit konkreten Terminvorschlägen basierend auf Ihren Präferenzen.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-4 sm:py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-50 font-semibold transition-all duration-300 shadow-sm hover:shadow-md touch-manipulation text-base"
                >
                  Zurück
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={isLoading}
                  className="btn-primary flex-1 py-4 sm:py-3 disabled:bg-gray-400 disabled:cursor-not-allowed touch-manipulation text-base font-semibold"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wird gebucht...
                    </span>
                  ) : (
                    "Terminanfrage senden"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
