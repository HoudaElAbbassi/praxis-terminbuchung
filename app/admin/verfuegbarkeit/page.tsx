"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Availability = {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

const dayLabels: Record<string, string> = {
  MONDAY: "Montag",
  TUESDAY: "Dienstag",
  WEDNESDAY: "Mittwoch",
  THURSDAY: "Donnerstag",
  FRIDAY: "Freitag",
  SATURDAY: "Samstag",
  SUNDAY: "Sonntag",
};

const daysOrder = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

export default function AvailabilityManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    dayOfWeek: "MONDAY",
    startTime: "08:00",
    endTime: "16:00",
    isActive: true,
  });

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      setIsLoading(false);
      router.push("/auth/login");
      return;
    }

    if (status === "authenticated") {
      if (session?.user?.role !== "ADMIN") {
        setIsLoading(false);
        router.push("/");
        return;
      }
      fetchAvailabilities();
    }
  }, [status, session]);

  const fetchAvailabilities = async () => {
    try {
      const res = await fetch("/api/admin/availability");
      const data = await res.json();
      setAvailabilities(data);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddForm(false);
        setFormData({
          dayOfWeek: "MONDAY",
          startTime: "08:00",
          endTime: "16:00",
          isActive: true,
        });
        fetchAvailabilities();
      } else {
        const error = await res.json();
        alert(error.error || "Fehler beim Hinzufügen der Verfügbarkeit");
      }
    } catch (error) {
      console.error("Error adding availability:", error);
      alert("Fehler beim Hinzufügen der Verfügbarkeit");
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/availability/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        fetchAvailabilities();
      } else {
        alert("Fehler beim Aktualisieren der Verfügbarkeit");
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
      alert("Fehler beim Aktualisieren der Verfügbarkeit");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie diese Verfügbarkeit wirklich löschen?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/availability/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchAvailabilities();
      } else {
        alert("Fehler beim Löschen der Verfügbarkeit");
      }
    } catch (error) {
      console.error("Error deleting availability:", error);
      alert("Fehler beim Löschen der Verfügbarkeit");
    }
  };

  if (status === "loading" || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Lädt...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    return null;
  }

  // Group availabilities by day
  const availabilitiesByDay: Record<string, Availability[]> = {};
  daysOrder.forEach((day) => {
    availabilitiesByDay[day] = availabilities.filter((a) => a.dayOfWeek === day);
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-white bg-gray-700 hover:bg-gray-800 px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zum Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Verfügbarkeit verwalten</h1>
            <p className="text-gray-600 mt-2">
              Legen Sie fest, an welchen Tagen und zu welchen Zeiten Termine gebucht werden können
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            + Verfügbarkeit hinzufügen
          </button>
        </div>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Verfügbarkeit hinzufügen
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wochentag
                    </label>
                    <select
                      value={formData.dayOfWeek}
                      onChange={(e) =>
                        setFormData({ ...formData, dayOfWeek: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                    >
                      {daysOrder.map((day) => (
                        <option key={day} value={day}>
                          {dayLabels[day]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Startzeit
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endzeit
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Hinzufügen
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Abbrechen
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Availabilities by Day */}
        <div className="space-y-6">
          {daysOrder.map((day) => (
            <div key={day} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{dayLabels[day]}</h2>

              {availabilitiesByDay[day].length === 0 ? (
                <p className="text-gray-500 italic">Keine Verfügbarkeiten definiert</p>
              ) : (
                <div className="space-y-3">
                  {availabilitiesByDay[day].map((availability) => (
                    <div
                      key={availability.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold text-gray-900">
                          {availability.startTime} - {availability.endTime}
                        </span>
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            availability.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {availability.isActive ? "Aktiv" : "Inaktiv"}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggle(availability.id, availability.isActive)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            availability.isActive
                              ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                              : "bg-green-100 hover:bg-green-200 text-green-800"
                          }`}
                        >
                          {availability.isActive ? "Deaktivieren" : "Aktivieren"}
                        </button>
                        <button
                          onClick={() => handleDelete(availability.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
