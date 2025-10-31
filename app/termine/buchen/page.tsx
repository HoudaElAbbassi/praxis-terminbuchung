"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session, status } = useSession();
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

  const handleBookAppointment = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentTypeId: selectedType?.id,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Buchung fehlgeschlagen");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/termine/meine");
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Lädt...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  // Get min date (today) and max date (3 months from now)
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Termin buchen
        </h1>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? "text-primary-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary-600 text-white" : "bg-gray-300"}`}>
                1
              </div>
              <span className="ml-2 hidden sm:inline">Terminart</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? "text-primary-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary-600 text-white" : "bg-gray-300"}`}>
                2
              </div>
              <span className="ml-2 hidden sm:inline">Datum & Zeit</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 3 ? "text-primary-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary-600 text-white" : "bg-gray-300"}`}>
                3
              </div>
              <span className="ml-2 hidden sm:inline">Bestätigung</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            Termin erfolgreich gebucht! Sie werden weitergeleitet...
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
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.name}</h3>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
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
                        className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedTime === slot.time
                            ? "border-primary-600 bg-primary-600 text-white"
                            : slot.available
                            ? "border-gray-300 hover:border-primary-500"
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
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Bestätigung */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Bestätigung</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Ihre Termindetails:</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Patient:</span> {session?.user?.name}</p>
                  <p><span className="font-medium">Terminart:</span> {selectedType?.name}</p>
                  <p><span className="font-medium">Dauer:</span> {selectedType?.duration} Minuten</p>
                  <p><span className="font-medium">Datum:</span> {new Date(selectedDate).toLocaleDateString("de-DE")}</p>
                  <p><span className="font-medium">Uhrzeit:</span> {selectedTime} Uhr</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                >
                  Zurück
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold disabled:bg-gray-400"
                >
                  {isLoading ? "Wird gebucht..." : "Termin verbindlich buchen"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
