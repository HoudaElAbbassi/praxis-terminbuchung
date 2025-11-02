"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AppointmentType = {
  id: string;
  name: string;
  duration: number;
  description: string | null;
  isActive: boolean;
};

export default function EinstellungenPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState({
    name: "",
    duration: 30,
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role !== "ADMIN") {
        router.push("/");
        return;
      }
      fetchAppointmentTypes();
    }
  }, [status, session]);

  const fetchAppointmentTypes = async () => {
    try {
      const res = await fetch("/api/admin/appointment-types");
      const data = await res.json();
      setAppointmentTypes(data);
    } catch (error) {
      console.error("Error fetching appointment types:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddType = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/appointment-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newType),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Hinzufügen");
      }

      setSuccess("Terminart erfolgreich hinzugefügt!");
      setNewType({ name: "", duration: 30, description: "" });
      setIsAdding(false);
      fetchAppointmentTypes();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/appointment-types/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (!res.ok) throw new Error("Fehler beim Aktualisieren");

      fetchAppointmentTypes();
    } catch (error) {
      console.error("Error toggling appointment type:", error);
    }
  };

  if (status === "loading" || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Lädt...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-white bg-gray-700 hover:bg-gray-800 px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück zum Dashboard
        </Link>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Einstellungen</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* Terminarten verwalten */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Terminarten</h2>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {isAdding ? "Abbrechen" : "+ Neue Terminart"}
            </button>
          </div>

          {/* Add New Form */}
          {isAdding && (
            <form onSubmit={handleAddType} className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newType.name}
                    onChange={(e) => setNewType({ ...newType, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="z.B. Standard-Konsultation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dauer (Minuten) *
                  </label>
                  <input
                    type="number"
                    required
                    min="5"
                    step="5"
                    value={newType.duration}
                    onChange={(e) => setNewType({ ...newType, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Beschreibung
                </label>
                <textarea
                  value={newType.description}
                  onChange={(e) => setNewType({ ...newType, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
                  rows={3}
                  placeholder="Optionale Beschreibung für Patienten"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Hinzufügen
              </button>
            </form>
          )}

          {/* Existing Types */}
          <div className="space-y-4">
            {appointmentTypes.map((type) => (
              <div
                key={type.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                  <p className="text-gray-600">Dauer: {type.duration} Minuten</p>
                  {type.description && (
                    <p className="text-gray-500 text-sm mt-1">{type.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleActive(type.id, type.isActive)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      type.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type.isActive ? "Aktiv" : "Inaktiv"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Öffnungszeiten Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Öffnungszeiten</h2>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-blue-900 font-medium mb-2">Aktuelle Öffnungszeiten:</p>
            <p className="text-blue-800">Täglich: 08:00 - 16:00 Uhr</p>
            <p className="text-blue-600 text-sm mt-2">
              Hinweis: Öffnungszeiten sind aktuell fest konfiguriert (8-16 Uhr, Mo-Fr).
              Erweiterungen können später hinzugefügt werden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
