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

export default function BuchenPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Kontaktdaten
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    notes: "",
  });

  // Lade Terminarten
  useEffect(() => {
    const fetchAppointmentTypes = async () => {
      try {
        const res = await fetch("/api/appointment-types");
        if (!res.ok) {
          setError("Die Terminarten konnten nicht geladen werden. Bitte kontaktieren Sie die Praxis.");
          return;
        }
        const data = await res.json();
        if (data.error) {
          setError("Die Terminarten konnten nicht geladen werden. Bitte kontaktieren Sie die Praxis.");
          return;
        }
        setAppointmentTypes(data);
      } catch (error) {
        console.error("Error fetching appointment types:", error);
        setError("Die Terminarten konnten nicht geladen werden. Bitte kontaktieren Sie die Praxis.");
      }
    };
    fetchAppointmentTypes();
  }, []);

  // Lade verfügbare Zeitslots wenn Datum gewählt wird
  useEffect(() => {
    if (selectedDate && selectedType) {
      fetchTimeSlots();
    }
  }, [selectedDate, selectedType]);

  const fetchTimeSlots = async () => {
    try {
      const res = await fetch(
        `/api/appointments/available-slots?date=${selectedDate}&typeId=${selectedType?.id}`
      );
      const data = await res.json();
      setTimeSlots(data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = async () => {
    setIsLoading(true);
    setError("");

    // Validierung
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.phone) {
      setError("Bitte füllen Sie alle Pflichtfelder aus");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/appointments/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentTypeId: selectedType?.id,
          date: selectedDate,
          time: selectedTime,
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

  // Get min date (today) and max date (3 months from now)
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] flex items-center justify-center px-4 py-12">
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
              className="text-4xl font-bold text-[#2c5f7c] mb-4"
              style={{fontFamily: "'Playfair Display', serif"}}
            >
              Termin erfolgreich gebucht!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Vielen Dank, <span className="font-semibold text-[#2c5f7c]">{contactData.firstName}</span>! Wir haben Ihren Termin erhalten und senden Ihnen eine Bestätigungsmail an <span className="font-semibold">{contactData.email}</span>.
            </p>
            <div className="bg-[#e8f4f2] border-2 border-[#4a9d8f] rounded-lg p-6 mb-8">
              <h3
                className="font-bold text-[#2c5f7c] mb-4 text-xl"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Ihre Termindetails:
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
                  <span className="font-medium">Datum:</span> {new Date(selectedDate).toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Uhrzeit:</span> {selectedTime} Uhr
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Dauer:</span> {selectedType?.duration} Minuten
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
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white bg-[#2c5f7c] hover:bg-[#1f4459] px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all mb-6"
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
              className="text-4xl font-bold text-[#2c5f7c] mb-3"
              style={{fontFamily: "'Playfair Display', serif"}}
            >
              Online-Terminbuchung
            </h1>
            <p className="text-lg text-gray-600">Wählen Sie Ihren Wunschtermin in nur wenigen Schritten</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? "text-[#2c5f7c]" : "text-gray-400"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-[#2c5f7c] text-white shadow-md" : "bg-gray-300 text-gray-600"}`}>
                {step > 1 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : "1"}
              </div>
              <span className="ml-3 hidden sm:inline font-semibold">Terminart</span>
            </div>
            <div className={`w-16 h-1 rounded ${step >= 2 ? "bg-[#2c5f7c]" : "bg-gray-300"}`}></div>
            <div className={`flex items-center ${step >= 2 ? "text-[#2c5f7c]" : "text-gray-400"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-[#2c5f7c] text-white shadow-md" : "bg-gray-300 text-gray-600"}`}>
                {step > 2 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : "2"}
              </div>
              <span className="ml-3 hidden sm:inline font-semibold">Datum & Zeit</span>
            </div>
            <div className={`w-16 h-1 rounded ${step >= 3 ? "bg-[#2c5f7c]" : "bg-gray-300"}`}></div>
            <div className={`flex items-center ${step >= 3 ? "text-[#2c5f7c]" : "text-gray-400"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-[#2c5f7c] text-white shadow-md" : "bg-gray-300 text-gray-600"}`}>
                {step > 3 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : "3"}
              </div>
              <span className="ml-3 hidden sm:inline font-semibold">Ihre Daten</span>
            </div>
            <div className={`w-16 h-1 rounded ${step >= 4 ? "bg-[#2c5f7c]" : "bg-gray-300"}`}></div>
            <div className={`flex items-center ${step >= 4 ? "text-[#2c5f7c]" : "text-gray-400"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= 4 ? "bg-[#2c5f7c] text-white shadow-md" : "bg-gray-300 text-gray-600"}`}>
                4
              </div>
              <span className="ml-3 hidden sm:inline font-semibold">Bestätigung</span>
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
                className="text-2xl font-bold text-[#2c5f7c] mb-6"
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
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#2c5f7c] hover:bg-[#e8f4f2] transition-all duration-300 text-left group shadow-sm hover:shadow-md"
                  >
                    <h3
                      className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2c5f7c]"
                      style={{fontFamily: "'Playfair Display', serif"}}
                    >
                      {type.name}
                    </h3>
                    <p className="text-gray-600 mb-2 font-medium">Dauer: {type.duration} Minuten</p>
                    {type.description && <p className="text-gray-500 text-sm">{type.description}</p>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Datum & Zeit wählen */}
          {step === 2 && (
            <div>
              <h2
                className="text-2xl font-bold text-[#2c5f7c] mb-4"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Wählen Sie Datum und Uhrzeit
              </h2>
              <div className="bg-[#e8f4f2] border border-[#4a9d8f] rounded-lg p-4 mb-6">
                <p className="text-gray-700">
                  <svg className="w-5 h-5 inline-block mr-2 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Gewählte Terminart: <span className="font-bold text-[#2c5f7c]">{selectedType?.name}</span> ({selectedType?.duration} Min)
                </p>
              </div>

              {/* Datum wählen */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                  Datum auswählen
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  max={maxDateStr}
                  className="input-field text-gray-900"
                />
              </div>

              {/* Zeit wählen */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                    Uhrzeit auswählen
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`py-3 px-3 rounded-lg border-2 text-sm font-semibold transition-all duration-300 relative ${
                          selectedTime === slot.time
                            ? "border-[#2c5f7c] bg-[#2c5f7c] text-white shadow-lg scale-105"
                            : slot.available
                            ? "border-gray-300 hover:border-[#2c5f7c] hover:bg-[#e8f4f2] text-gray-900 hover:scale-102"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {selectedTime === slot.time && (
                          <svg className="w-4 h-4 absolute top-1 right-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedDate("");
                    setSelectedTime("");
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-primary flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
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
                className="text-2xl font-bold text-[#2c5f7c] mb-4"
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
                    Geburtsdatum (optional)
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={contactData.dateOfBirth}
                    onChange={handleContactChange}
                    className="input-field text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                    Adresse (optional)
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={contactData.address}
                    onChange={handleContactChange}
                    placeholder="Musterstraße 123, 12345 Stadt"
                    className="input-field text-gray-900"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2d3748] mb-2">
                  Notizen (optional)
                </label>
                <textarea
                  name="notes"
                  value={contactData.notes}
                  onChange={handleContactChange}
                  rows={3}
                  className="input-field text-gray-900"
                  placeholder="Besondere Anmerkungen oder Wünsche..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.phone}
                  className="btn-primary flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
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
                className="text-2xl font-bold text-[#2c5f7c] mb-6"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                Zusammenfassung
              </h2>
              <div className="bg-[#e8f4f2] border-2 border-[#4a9d8f] p-6 rounded-lg mb-6">
                <h3
                  className="font-bold text-[#2c5f7c] mb-4 text-lg"
                  style={{fontFamily: "'Playfair Display', serif"}}
                >
                  Ihre Termindetails:
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
                    <span className="font-semibold">Datum:</span>
                    <span>{new Date(selectedDate).toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Uhrzeit:</span>
                    <span>{selectedTime} Uhr</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Dauer:</span>
                    <span>{selectedType?.duration} Minuten</span>
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
                  <span><strong>Hinweis:</strong> Nach der Buchung erhalten Sie eine Bestätigungs-E-Mail. Bitte erscheinen Sie 5 Minuten vor Ihrem Termin.</span>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Zurück
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={isLoading}
                  className="btn-primary flex-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                    "Jetzt verbindlich buchen"
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
