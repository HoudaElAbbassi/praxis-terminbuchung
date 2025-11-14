"use client";

import { useState } from "react";

type SetAppointmentTimeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; time: string }) => void;
  appointmentId: string;
  preferredDays: string | null;
  preferredTimeSlots: string | null;
  patientName: string;
};

export default function SetAppointmentTimeModal({
  isOpen,
  onClose,
  onSubmit,
  preferredDays,
  preferredTimeSlots,
  patientName,
}: SetAppointmentTimeModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time) {
      alert("Bitte Datum und Uhrzeit auswählen");
      return;
    }

    setIsSubmitting(true);
    await onSubmit({ date, time });
    setIsSubmitting(false);
    setDate("");
    setTime("");
    onClose();
  };

  const translateDays = (days: string | null): string => {
    if (!days) return "Keine Angabe";
    try {
      const parsed = JSON.parse(days);
      const daysArray = Array.isArray(parsed) ? parsed : [parsed];
      const translations: Record<string, string> = {
        MONDAY: "Montag",
        TUESDAY: "Dienstag",
        WEDNESDAY: "Mittwoch",
        THURSDAY: "Donnerstag",
        FRIDAY: "Freitag",
        SATURDAY: "Samstag",
        SUNDAY: "Sonntag"
      };
      return daysArray.map(day => translations[day] || day).join(", ");
    } catch {
      return days;
    }
  };

  const translateTimeSlots = (slots: string | null): string => {
    if (!slots) return "Keine Angabe";
    try {
      const parsed = JSON.parse(slots);
      const slotsArray = Array.isArray(parsed) ? parsed : [parsed];
      const translations: Record<string, string> = {
        morning: "Vormittag (8:00 - 12:00)",
        afternoon: "Nachmittag (12:00 - 16:00)",
        evening: "Abend (16:00 - 20:00)"
      };
      return slotsArray.map(slot => translations[slot] || slot).join(", ");
    } catch {
      return slots;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#2c5f7c] to-[#4a9d8f] p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                📅 Termin festlegen
              </h2>
              <p className="text-white/90 text-sm">
                Patient: <span className="font-semibold">{patientName}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
              disabled={isSubmitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Patientenpräferenzen */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-[#2c5f7c] mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Präferenzen des Patienten:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Bevorzugte Tage:</span>
                <p className="text-gray-900 mt-1">{translateDays(preferredDays)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Bevorzugte Uhrzeit:</span>
                <p className="text-gray-900 mt-1">{translateTimeSlots(preferredTimeSlots)}</p>
              </div>
            </div>
          </div>

          {/* Formular */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Datum *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c5f7c] focus:border-transparent transition-all text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Tipp: Versuchen Sie die Präferenzen des Patienten zu berücksichtigen
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Uhrzeit *
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                step="900"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c5f7c] focus:border-transparent transition-all text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                15-Minuten-Schritte
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all duration-300 text-gray-700 disabled:opacity-50"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#4a9d8f] hover:bg-[#3d8378] text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Wird gespeichert...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Termin festlegen
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
