"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        const data = await res.json();
        setAppointmentTypes(data);
      } catch (error) {
        console.error("Error fetching appointment types:", error);
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
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Termin erfolgreich gebucht!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Vielen Dank, {contactData.firstName}! Wir haben Ihren Termin erhalten und senden Ihnen eine Bestätigungsmail an <span className="font-semibold">{contactData.email}</span>.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Ihre Termindetails:</h3>
              <div className="text-left space-y-2 text-gray-700">
                <p><span className="font-medium">Terminart:</span> {selectedType?.name}</p>
                <p><span className="font-medium">Datum:</span> {new Date(selectedDate).toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                <p><span className="font-medium">Uhrzeit:</span> {selectedTime} Uhr</p>
                <p><span className="font-medium">Dauer:</span> {selectedType?.duration} Minuten</p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Online-Terminbuchung</h1>
          <p className="text-lg text-gray-600">Wählen Sie Ihren Wunschtermin in nur wenigen Schritten</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? "text-primary-600" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                {step > 1 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : "1"}
              </div>
              <span className="ml-2 hidden sm:inline font-medium">Terminart</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? "text-primary-600" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                {step > 2 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : "2"}
              </div>
              <span className="ml-2 hidden sm:inline font-medium">Datum & Zeit</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 3 ? "text-primary-600" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                {step > 3 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : "3"}
              </div>
              <span className="ml-2 hidden sm:inline font-medium">Ihre Daten</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 4 ? "text-primary-600" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? "bg-primary-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                4
              </div>
              <span className="ml-2 hidden sm:inline font-medium">Bestätigung</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Terminart auswählen */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Wählen Sie eine Terminart</h2>
              <div className="grid gap-4">
                {appointmentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type);
                      setStep(2);
                    }}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600">{type.name}</h3>
                    <p className="text-gray-600 mb-2">Dauer: {type.duration} Minuten</p>
                    {type.description && <p className="text-gray-500 text-sm">{type.description}</p>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Datum & Zeit wählen */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Wählen Sie Datum und Uhrzeit</h2>
              <p className="text-gray-600 mb-6">
                Gewählte Terminart: <span className="font-semibold">{selectedType?.name}</span> ({selectedType?.duration} Min)
              </p>

              {/* Datum wählen */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Datum auswählen
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  max={maxDateStr}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Zeit wählen */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Uhrzeit auswählen
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`py-3 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedTime === slot.time
                            ? "border-primary-600 bg-primary-600 text-white"
                            : slot.available
                            ? "border-gray-300 hover:border-primary-500 hover:bg-primary-50"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
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
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Kontaktdaten */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Ihre Kontaktdaten</h2>
              <p className="text-gray-600 mb-6">
                Bitte geben Sie Ihre Daten ein, damit wir Ihren Termin bestätigen können.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vorname *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={contactData.firstName}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nachname *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={contactData.lastName}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={contactData.email}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={contactData.phone}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Geburtsdatum (optional)
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={contactData.dateOfBirth}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse (optional)
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={contactData.address}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notizen (optional)
                </label>
                <textarea
                  name="notes"
                  value={contactData.notes}
                  onChange={handleContactChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Besondere Anmerkungen oder Wünsche..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.phone}
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Weiter zur Bestätigung
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Bestätigung */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Zusammenfassung</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Ihre Termindetails:</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Name:</span>
                    <span>{contactData.firstName} {contactData.lastName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{contactData.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Telefon:</span>
                    <span>{contactData.phone}</span>
                  </div>
                  <div className="border-t border-gray-300 my-4"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Terminart:</span>
                    <span>{selectedType?.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Datum:</span>
                    <span>{new Date(selectedDate).toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Uhrzeit:</span>
                    <span>{selectedTime} Uhr</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Dauer:</span>
                    <span>{selectedType?.duration} Minuten</span>
                  </div>
                  {contactData.notes && (
                    <>
                      <div className="border-t border-gray-300 my-4"></div>
                      <div>
                        <span className="font-medium">Notizen:</span>
                        <p className="mt-1 text-gray-600">{contactData.notes}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Hinweis:</strong> Nach der Buchung erhalten Sie eine Bestätigungs-Email. Bitte erscheinen Sie 5 Minuten vor Ihrem Termin.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold disabled:bg-gray-400 transition-colors shadow-lg hover:shadow-xl"
                >
                  {isLoading ? "Wird gebucht..." : "Jetzt verbindlich buchen"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
