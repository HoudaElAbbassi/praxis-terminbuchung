"use client";

import { useState } from "react";

interface AlternativeAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; time: string; reason?: string }) => void;
  appointmentId: string;
  currentDate: string;
  currentTime: string;
}

export default function AlternativeAppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  currentDate,
  currentTime,
}: AlternativeAppointmentModalProps) {
  const [alternativeDate, setAlternativeDate] = useState("");
  const [alternativeTime, setAlternativeTime] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await onSubmit({
      date: alternativeDate,
      time: alternativeTime,
      reason: reason || undefined,
    });

    setIsSubmitting(false);
    setAlternativeDate("");
    setAlternativeTime("");
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2c5f7c] to-[#4a9d8f] text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>
              📅 Alternativtermin vorschlagen
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Current Appointment */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Ursprünglicher Terminwunsch:</h3>
            <p className="text-gray-700">
              <strong>Datum:</strong> {new Date(currentDate).toLocaleDateString("de-DE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
            <p className="text-gray-700">
              <strong>Uhrzeit:</strong> {currentTime} Uhr
            </p>
          </div>

          {/* Alternative Date */}
          <div className="mb-5">
            <label htmlFor="alternativeDate" className="block text-sm font-semibold text-[#2d3748] mb-2">
              Alternatives Datum *
            </label>
            <input
              type="date"
              id="alternativeDate"
              required
              value={alternativeDate}
              onChange={(e) => setAlternativeDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="input-field text-gray-900"
            />
          </div>

          {/* Alternative Time */}
          <div className="mb-5">
            <label htmlFor="alternativeTime" className="block text-sm font-semibold text-[#2d3748] mb-2">
              Alternative Uhrzeit *
            </label>
            <input
              type="time"
              id="alternativeTime"
              required
              value={alternativeTime}
              onChange={(e) => setAlternativeTime(e.target.value)}
              className="input-field text-gray-900"
            />
          </div>

          {/* Reason/Note */}
          <div className="mb-6">
            <label htmlFor="reason" className="block text-sm font-semibold text-[#2d3748] mb-2">
              Hinweis/Begründung (optional)
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="z.B. 'Der ursprüngliche Zeitpunkt ist leider schon vergeben. Wir bieten Ihnen gerne diesen Alternativtermin an.'"
              className="input-field text-gray-900 resize-none"
            />
          </div>

          {/* Preview */}
          {alternativeDate && alternativeTime && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">✓ Vorgeschlagener Alternativtermin:</h3>
              <p className="text-gray-700">
                <strong>Datum:</strong> {new Date(alternativeDate).toLocaleDateString("de-DE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
              <p className="text-gray-700">
                <strong>Uhrzeit:</strong> {alternativeTime} Uhr
              </p>
              {reason && (
                <p className="text-gray-700 mt-2">
                  <strong>Hinweis:</strong> {reason}
                </p>
              )}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-blue-800">
                <strong>Der Patient erhält automatisch eine E-Mail</strong> mit dem Alternativvorschlag.
                Der ursprüngliche Termin wird abgelehnt und der Patient wird gebeten, den Alternativtermin zu bestätigen.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !alternativeDate || !alternativeTime}
              className="flex-1 bg-[#4a9d8f] hover:bg-[#3d8378] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wird gesendet...
                </span>
              ) : (
                "Alternativtermin vorschlagen & E-Mail senden"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
