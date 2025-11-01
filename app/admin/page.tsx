"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Appointment = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  appointmentType: {
    name: string;
    duration: number;
  };
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, today: 0, upcoming: 0 });

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
      fetchAppointments();
      fetchStats();
    }
  }, [status, session, selectedDate]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`/api/admin/appointments?date=${selectedDate}`);
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setAppointments(data);
      } else {
        console.error("Error from API:", data);
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${appointmentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Refresh appointments list
        fetchAppointments();
        fetchStats();
      } else {
        alert("Fehler beim Aktualisieren des Terminstatus");
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Fehler beim Aktualisieren des Terminstatus");
    }
  };

  if (status === "loading" || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Lädt...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    router.push("/auth/login");
    return null;
  }

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/verfuegbarkeit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Verfügbarkeit verwalten
            </Link>
            <Link
              href="/admin/einstellungen"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Einstellungen
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Termine Gesamt</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Heute</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.today}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Bevorstehend</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.upcoming}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Datum auswählen
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Termine für {formatDate(selectedDate)}
          </h2>

          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-600">Keine Termine für diesen Tag</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-lg font-semibold text-primary-600">
                          {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                        </span>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                          appointment.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                          appointment.status === "CANCELLED" ? "bg-red-100 text-red-800" :
                          appointment.status === "COMPLETED" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {appointment.status === "PENDING" ? "Ausstehend" :
                           appointment.status === "CONFIRMED" ? "Bestätigt" :
                           appointment.status === "CANCELLED" ? "Abgesagt" :
                           appointment.status === "COMPLETED" ? "Abgeschlossen" :
                           appointment.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {appointment.user.firstName} {appointment.user.lastName}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><span className="font-medium">Email:</span> {appointment.user.email}</p>
                        <p><span className="font-medium">Telefon:</span> {appointment.user.phone}</p>
                        <p><span className="font-medium">Terminart:</span> {appointment.appointmentType.name}</p>
                        <p><span className="font-medium">Dauer:</span> {appointment.appointmentType.duration} Min</p>
                      </div>

                      {/* Action Buttons */}
                      {appointment.status === "PENDING" && (
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "CONFIRMED")}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                          >
                            ✓ Annehmen
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "CANCELLED")}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                          >
                            ✗ Ablehnen
                          </button>
                        </div>
                      )}

                      {appointment.status === "CONFIRMED" && (
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "COMPLETED")}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                          >
                            Als abgeschlossen markieren
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "CANCELLED")}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                          >
                            Absagen
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
