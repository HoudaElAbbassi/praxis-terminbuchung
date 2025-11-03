"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c5f7c] mx-auto mb-4"></div>
          <p className="text-gray-600">Lädt...</p>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header mit Logo */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.jpeg"
                alt="Praxis Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <h1
                  className="text-3xl font-bold text-[#2c5f7c]"
                  style={{fontFamily: "'Playfair Display', serif"}}
                >
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Terminverwaltung & Übersicht</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/verfuegbarkeit"
                className="bg-[#4a9d8f] hover:bg-[#3d8378] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Verfügbarkeit
              </Link>
              <Link
                href="/admin/einstellungen"
                className="bg-[#2c5f7c] hover:bg-[#1f4459] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Einstellungen
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card border-l-4 border-[#2c5f7c]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Termine Gesamt</p>
                <p className="text-4xl font-bold text-[#2c5f7c] mt-2">{stats.total}</p>
              </div>
              <div className="bg-[#e8f4f2] p-4 rounded-full">
                <svg className="w-8 h-8 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card border-l-4 border-[#4a9d8f]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Heute</p>
                <p className="text-4xl font-bold text-[#4a9d8f] mt-2">{stats.today}</p>
              </div>
              <div className="bg-[#e8f4f2] p-4 rounded-full">
                <svg className="w-8 h-8 text-[#4a9d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card border-l-4 border-[#3d7a9e]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Bevorstehend</p>
                <p className="text-4xl font-bold text-[#3d7a9e] mt-2">{stats.upcoming}</p>
              </div>
              <div className="bg-[#e8f4f2] p-4 rounded-full">
                <svg className="w-8 h-8 text-[#3d7a9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="card">
          <label className="block text-sm font-semibold text-[#2d3748] mb-3">
            <svg className="w-5 h-5 inline-block mr-2 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Datum auswählen
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field text-gray-900"
          />
        </div>

        {/* Appointments List */}
        <div className="card">
          <h2
            className="text-2xl font-bold text-[#2c5f7c] mb-6"
            style={{fontFamily: "'Playfair Display', serif"}}
          >
            Termine für {formatDate(selectedDate)}
          </h2>

          {appointments.length === 0 ? (
            <div className="text-center py-12 bg-[#e8f4f2] rounded-lg">
              <svg className="w-20 h-20 mx-auto text-[#4a9d8f] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 text-lg">Keine Termine für diesen Tag</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#2c5f7c] hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-lg font-bold text-[#2c5f7c]">
                          {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                        </span>
                        <span className={`px-4 py-1.5 text-sm font-semibold rounded-full ${
                          appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-800 border border-yellow-300" :
                          appointment.status === "CONFIRMED" ? "bg-green-100 text-green-800 border border-green-300" :
                          appointment.status === "CANCELLED" ? "bg-red-100 text-red-800 border border-red-300" :
                          appointment.status === "COMPLETED" ? "bg-blue-100 text-blue-800 border border-blue-300" :
                          "bg-gray-100 text-gray-800 border border-gray-300"
                        }`}>
                          {appointment.status === "PENDING" ? "⏳ Ausstehend" :
                           appointment.status === "CONFIRMED" ? "✓ Bestätigt" :
                           appointment.status === "CANCELLED" ? "✗ Abgesagt" :
                           appointment.status === "COMPLETED" ? "✓ Abgeschlossen" :
                           appointment.status}
                        </span>
                      </div>

                      <h3
                        className="text-xl font-bold text-[#2d3748] mb-3"
                        style={{fontFamily: "'Playfair Display', serif"}}
                      >
                        {appointment.user.firstName} {appointment.user.lastName}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 bg-[#f7fafc] p-4 rounded-lg mb-4">
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <span className="font-medium">Email:</span> {appointment.user.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span className="font-medium">Telefon:</span> {appointment.user.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Terminart:</span> {appointment.appointmentType.name}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#4a9d8f]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Dauer:</span> {appointment.appointmentType.duration} Min
                        </p>
                      </div>

                      {/* Action Buttons */}
                      {appointment.status === "PENDING" && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "CONFIRMED")}
                            className="flex-1 bg-[#4a9d8f] hover:bg-[#3d8378] text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Annehmen
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "CANCELLED")}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Ablehnen
                          </button>
                        </div>
                      )}

                      {appointment.status === "CONFIRMED" && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "COMPLETED")}
                            className="flex-1 bg-[#2c5f7c] hover:bg-[#1f4459] text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            Als abgeschlossen markieren
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, "CANCELLED")}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
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
