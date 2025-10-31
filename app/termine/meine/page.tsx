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
  appointmentType: {
    name: string;
    duration: number;
  };
};

export default function MeineTerminePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAppointments();
    }
  }, [status]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Lädt...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.startTime) >= new Date()
  );

  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.startTime) < new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Meine Termine</h1>
          <Link
            href="/termine/buchen"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Neuer Termin
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Keine Termine vorhanden
            </h2>
            <p className="text-gray-600 mb-6">
              Sie haben noch keine Termine gebucht.
            </p>
            <Link
              href="/termine/buchen"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ersten Termin buchen
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Bevorstehende Termine
                </h2>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-600"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {appointment.appointmentType.name}
                          </h3>
                          <div className="space-y-1 text-gray-600">
                            <p className="flex items-center">
                              <span className="font-medium w-24">Datum:</span>
                              {formatDate(appointment.date)}
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium w-24">Uhrzeit:</span>
                              {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium w-24">Dauer:</span>
                              {appointment.appointmentType.duration} Minuten
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                            Bestätigt
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          Hinweis: Bitte erscheinen Sie 5 Minuten vor Ihrem Termin. Bei Verhinderung kontaktieren Sie bitte die Praxis.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Vergangene Termine
                </h2>
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-300 opacity-75"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {appointment.appointmentType.name}
                          </h3>
                          <div className="space-y-1 text-gray-600">
                            <p className="flex items-center">
                              <span className="font-medium w-24">Datum:</span>
                              {formatDate(appointment.date)}
                            </p>
                            <p className="flex items-center">
                              <span className="font-medium w-24">Uhrzeit:</span>
                              {formatTime(appointment.startTime)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full">
                            Abgeschlossen
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
