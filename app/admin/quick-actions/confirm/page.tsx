"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function QuickConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [appointment, setAppointment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  const appointmentId = searchParams.get("id");

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push(`/auth/login?redirect=/admin/quick-actions/confirm?id=${appointmentId}`);
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

        // Setze Standardwerte aus Präferenzen
        if (data[0].date) {
          const date = new Date(data[0].date);
          setFormData({
            date: date.toISOString().split("T")[0],
            time: data[0].startTime
              ? new Date(data[0].startTime).toTimeString().slice(0, 5)
              : "09:00",
          });
        }
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
      const res = await fetch(`/api/admin/appointments/${appointmentId}/set-time`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.date,
          time: formData.time,
        }),
      });

      if (res.ok) {
        // Bestätige den Termin
        await fetch(`/api/admin/appointments/${appointmentId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "CONFIRMED" }),
        });

        alert("✅ Termin wurde erfolgreich bestätigt!");
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Fehler beim Bestätigen");
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
          <h1 className="text-3xl font-bold text-primary-700 mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Termin bestätigen
          </h1>

          {/* Patient Info */}
          <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6">
            <h3 className="font-bold text-primary-800 mb-2">Patienteninformationen:</h3>
            <p className="text-primary-700">
              <strong>Name:</strong> {appointment.user.firstName} {appointment.user.lastName}
            </p>
            <p className="text-primary-700">
              <strong>E-Mail:</strong> {appointment.user.email}
            </p>
            <p className="text-primary-700">
              <strong>Terminart:</strong> {appointment.appointmentType.name}
            </p>
          </div>

          {/* Confirmation Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Datum *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Uhrzeit *
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1"
              >
                {isLoading ? "Wird bestätigt..." : "✅ Termin bestätigen"}
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
