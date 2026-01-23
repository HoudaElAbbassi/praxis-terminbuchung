"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

function AlternativeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [appointment, setAppointment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    proposedDate: "",
    proposedTime: "",
  });

  const appointmentId = searchParams.get("id");

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push(`/auth/login?redirect=/admin/quick-actions/alternative?id=${appointmentId}`);
      return;
    }

    if (session?.user?.role !== "ADMIN") {
      router.push("/");
      return;
    }

    if (appointmentId) {
      fetchAppointment();
    }
  }, [status, session, appointmentId]);

  const fetchAppointment = async () => {
    try {
      const res = await fetch(`/api/admin/appointments?id=${appointmentId}`);
      const data = await res.json();

      if (res.ok && Array.isArray(data) && data.length > 0) {
        setAppointment(data[0]);

        // Setze Standardwerte
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setFormData({
          proposedDate: tomorrow.toISOString().split("T")[0],
          proposedTime: "09:00",
        });
      } else {
        setError("Terminanfrage nicht gefunden");
      }
    } catch (err) {
      setError("Fehler beim Laden der Terminanfrage");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/appointments/${appointmentId}/send-proposal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposedDate: formData.proposedDate,
          proposedTime: formData.proposedTime,
        }),
      });

      if (res.ok) {
        alert("✅ Terminvorschlag wurde erfolgreich versendet!");
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Fehler beim Versenden");
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Terminanfrage...</p>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-500 text-center mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Fehler</h2>
            <p>{error}</p>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="w-full btn-primary"
          >
            Zurück zum Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-accent-700 mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Alternativtermin vorschlagen
          </h1>

          {/* Patient Info */}
          <div className="bg-accent-50 border-l-4 border-accent-600 p-4 mb-6">
            <h3 className="font-bold text-accent-800 mb-2">Patienteninformationen:</h3>
            <p className="text-accent-700">
              <strong>Name:</strong> {appointment.user.firstName} {appointment.user.lastName}
            </p>
            <p className="text-accent-700">
              <strong>E-Mail:</strong> {appointment.user.email}
            </p>
            <p className="text-accent-700">
              <strong>Terminart:</strong> {appointment.appointmentType.name} ({appointment.appointmentType.duration} Min.)
            </p>
          </div>

          {/* Alternative Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Vorgeschlagenes Datum *
              </label>
              <input
                type="date"
                required
                value={formData.proposedDate}
                onChange={(e) => setFormData({ ...formData, proposedDate: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Vorgeschlagene Uhrzeit *
              </label>
              <input
                type="time"
                required
                value={formData.proposedTime}
                onChange={(e) => setFormData({ ...formData, proposedTime: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-blue-700">
                <strong>Hinweis:</strong> Der Patient erhält eine E-Mail mit diesem Terminvorschlag und kann ihn per Link annehmen oder ablehnen.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 bg-accent-600 hover:bg-accent-700"
              >
                {isLoading ? "Wird gesendet..." : "Vorschlag senden"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="btn-secondary flex-1"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function QuickAlternativePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lädt...</p>
        </div>
      </div>
    }>
      <AlternativeContent />
    </Suspense>
  );
}
