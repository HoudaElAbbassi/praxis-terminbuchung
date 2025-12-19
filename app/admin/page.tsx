"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AlternativeAppointmentModal from "@/components/AlternativeAppointmentModal";
import SetAppointmentTimeModal from "@/components/SetAppointmentTimeModal";
import SendProposalModal from "@/components/SendProposalModal";

type Appointment = {
  id: string;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  status: string;
  preferredDays: string | null;
  preferredTimeSlots: string | null;
  urgency: string | null;
  specialRemarks: string | null;
  insuranceType: string | null;
  isFirstVisit: boolean | null;
  reasonForVisit: string | null;
  notes: string | null;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string | null;
    dateOfBirth: string | null;
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
  const [selectedDate, setSelectedDate] = useState(""); // Empty = show all upcoming
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, today: 0, upcoming: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSetTimeModalOpen, setIsSetTimeModalOpen] = useState(false);
  const [isSendProposalModalOpen, setIsSendProposalModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    action: string;
    appointmentId: string;
    message: string;
  }>({
    isOpen: false,
    action: "",
    appointmentId: "",
    message: "",
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
      fetchAppointments();
      fetchStats();
    }
  }, [status, session, selectedDate]);

  const fetchAppointments = async () => {
    try {
      const url = selectedDate
        ? `/api/admin/appointments?date=${selectedDate}`
        : `/api/admin/appointments`; // No date = all upcoming

      const res = await fetch(url);
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

  const openConfirmDialog = (appointmentId: string, action: string) => {
    let message = "";
    switch (action) {
      case "CONFIRMED":
        message = "Möchten Sie diesen Termin wirklich annehmen?";
        break;
      case "CANCELLED":
        message = "Möchten Sie diesen Termin wirklich ablehnen/absagen?";
        break;
      case "COMPLETED":
        message = "Möchten Sie diesen Termin als abgeschlossen markieren?";
        break;
      default:
        message = "Möchten Sie diese Aktion wirklich durchführen?";
    }

    setConfirmDialog({
      isOpen: true,
      action,
      appointmentId,
      message,
    });
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
        // Close dialog
        setConfirmDialog({
          isOpen: false,
          action: "",
          appointmentId: "",
          message: "",
        });
      } else {
        alert("Fehler beim Aktualisieren des Terminstatus");
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Fehler beim Aktualisieren des Terminstatus");
    }
  };

  const handleAlternativeAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleSubmitAlternative = async (data: { date: string; time: string; reason?: string }) => {
    if (!selectedAppointment) return;

    try {
      const res = await fetch(`/api/admin/appointments/${selectedAppointment.id}/alternative`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alternativeDate: data.date,
          alternativeTime: data.time,
          reason: data.reason,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Alternativtermin erfolgreich vorgeschlagen und E-Mail versendet!");
        fetchAppointments();
        fetchStats();
      } else {
        alert(result.error || "Fehler beim Vorschlagen des Alternativtermins");
      }
    } catch (error) {
      console.error("Error suggesting alternative appointment:", error);
      alert("Fehler beim Vorschlagen des Alternativtermins");
    }
  };

  const handleSetAppointmentTime = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsSetTimeModalOpen(true);
  };

  const handleSubmitSetTime = async (data: { date: string; time: string }) => {
    if (!selectedAppointment) return;

    try {
      const res = await fetch(`/api/admin/appointments/${selectedAppointment.id}/set-time`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: data.date,
          time: data.time,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Termin erfolgreich festgelegt und E-Mail versendet!");
        fetchAppointments();
        fetchStats();
        setIsSetTimeModalOpen(false);
        setSelectedAppointment(null);
      } else {
        alert(result.error || "Fehler beim Festlegen des Termins");
      }
    } catch (error) {
      console.error("Error setting appointment time:", error);
      alert("Fehler beim Festlegen des Termins");
    }
  };

  const handleSendProposal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsSendProposalModalOpen(true);
  };

  const handleSubmitProposal = async (data: { date: string; time: string }) => {
    if (!selectedAppointment) return;

    try {
      const res = await fetch(`/api/admin/appointments/${selectedAppointment.id}/send-proposal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposedDate: data.date,
          proposedTime: data.time,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Terminvorschlag erfolgreich versendet!");
        fetchAppointments();
        fetchStats();
        setIsSendProposalModalOpen(false);
        setSelectedAppointment(null);
      } else {
        alert(result.error || "Fehler beim Senden des Vorschlags");
      }
    } catch (error) {
      console.error("Error sending proposal:", error);
      alert("Fehler beim Senden des Vorschlags");
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

  const translateInsuranceType = (type: string | null): string => {
    if (!type) return "Keine Angabe";
    const translations: Record<string, string> = {
      STATUTORY: "Gesetzlich versichert",
      PRIVATE: "Privat versichert",
      SELF_PAYER: "Selbstzahler"
    };
    return translations[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header mit Logo */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/images/logoklein.jpeg"
                alt="Praxis Logo"
                width={50}
                height={50}
                className="rounded-lg sm:w-[60px] sm:h-[60px]"
              />
              <div>
                <h1
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2c5f7c]"
                  style={{fontFamily: "'Playfair Display', serif"}}
                >
                  Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Terminverwaltung & Übersicht</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Link
                href="/admin/verfuegbarkeit"
                className="flex-1 sm:flex-none bg-[#4a9d8f] hover:bg-[#3d8378] active:bg-[#3d8378] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-center text-sm sm:text-base touch-manipulation"
              >
                Verfügbarkeit
              </Link>
              <Link
                href="/admin/einstellungen"
                className="flex-1 sm:flex-none bg-[#2c5f7c] hover:bg-[#1f4459] active:bg-[#1f4459] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-center text-sm sm:text-base touch-manipulation"
              >
                Einstellungen
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          <div className="card border-l-4 border-[#2c5f7c] p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm font-semibold">Termine Gesamt</p>
                <p className="text-3xl sm:text-4xl font-bold text-[#2c5f7c] mt-1 sm:mt-2">{stats.total}</p>
              </div>
              <div className="bg-[#e8f4f2] p-3 sm:p-4 rounded-full">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card border-l-4 border-[#4a9d8f] p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm font-semibold">Heute</p>
                <p className="text-3xl sm:text-4xl font-bold text-[#4a9d8f] mt-1 sm:mt-2">{stats.today}</p>
              </div>
              <div className="bg-[#e8f4f2] p-3 sm:p-4 rounded-full">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#4a9d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card border-l-4 border-[#3d7a9e] p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm font-semibold">Bevorstehend</p>
                <p className="text-3xl sm:text-4xl font-bold text-[#3d7a9e] mt-1 sm:mt-2">{stats.upcoming}</p>
              </div>
              <div className="bg-[#e8f4f2] p-3 sm:p-4 rounded-full">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#3d7a9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="card p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <label className="block text-xs sm:text-sm font-semibold text-[#2d3748]">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-1 sm:mr-2 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Datum filtern (optional)
            </label>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate("")}
                className="text-xs sm:text-sm text-[#2c5f7c] hover:text-[#1f4459] active:text-[#1f4459] font-semibold flex items-center gap-1 touch-manipulation self-start sm:self-auto"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Filter entfernen
              </button>
            )}
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            placeholder="Alle anstehenden Termine"
            className="input-field text-gray-900 text-sm sm:text-base"
          />
          {!selectedDate && (
            <p className="text-xs sm:text-sm text-gray-600 mt-2 flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Zeige alle anstehenden Termine (bis zu 50)
            </p>
          )}
        </div>

        {/* Appointments List */}
        <div className="card p-4 sm:p-6">
          <h2
            className="text-lg sm:text-xl md:text-2xl font-bold text-[#2c5f7c] mb-4 sm:mb-6"
            style={{fontFamily: "'Playfair Display', serif"}}
          >
            {selectedDate ? `Termine für ${formatDate(selectedDate)}` : "Alle anstehenden Termine"}
          </h2>

          {appointments.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-[#e8f4f2] rounded-lg">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[#4a9d8f] mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 text-base sm:text-lg">{selectedDate ? "Keine Termine für diesen Tag" : "Keine anstehenden Termine"}</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {!selectedDate ? (
                // Group by date when no filter is active
                (() => {
                  const groupedByDate: { [key: string]: Appointment[] } = {};
                  appointments.forEach(apt => {
                    const dateKey = apt.date || 'pending';
                    if (!groupedByDate[dateKey]) {
                      groupedByDate[dateKey] = [];
                    }
                    groupedByDate[dateKey].push(apt);
                  });

                  return Object.keys(groupedByDate).map(dateKey => (
                    <div key={dateKey} className="space-y-3 sm:space-y-4">
                      <div className="bg-[#2c5f7c] text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sticky top-0 z-10 shadow-md">
                        <h3 className="font-bold text-sm sm:text-base md:text-lg flex items-center gap-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="truncate">{dateKey === 'pending' ? '⏳ Ausstehende Terminanfragen (ohne festes Datum)' : formatDate(dateKey)}</span>
                          <span className="ml-auto bg-white text-[#2c5f7c] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                            {groupedByDate[dateKey].length} {groupedByDate[dateKey].length === 1 ? 'Termin' : 'Termine'}
                          </span>
                        </h3>
                      </div>
                      {groupedByDate[dateKey].map((appointment) => (
                <div
                  key={appointment.id}
                  className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 hover:border-[#2c5f7c] hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                        {appointment.status === "PENDING" && !appointment.startTime ? (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-600 font-medium">Terminpräferenzen:</span>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-sm font-semibold text-[#2c5f7c] bg-blue-50 px-2 py-1 rounded">
                                📅 {translateDays(appointment.preferredDays)}
                              </span>
                              <span className="text-sm font-semibold text-[#4a9d8f] bg-green-50 px-2 py-1 rounded">
                                🕐 {translateTimeSlots(appointment.preferredTimeSlots)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-base sm:text-lg font-bold text-[#2c5f7c]">
                            {appointment.startTime && appointment.endTime ? `${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}` : 'Zeit wird festgelegt'}
                          </span>
                        )}
                        <span className={`px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-full self-start ${
                          appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-800 border border-yellow-300" :
                          appointment.status === "PROPOSAL_SENT" ? "bg-purple-100 text-purple-800 border border-purple-300" :
                          appointment.status === "CONFIRMED" ? "bg-green-100 text-green-800 border border-green-300" :
                          appointment.status === "CANCELLED" ? "bg-red-100 text-red-800 border border-red-300" :
                          appointment.status === "COMPLETED" ? "bg-blue-100 text-blue-800 border border-blue-300" :
                          "bg-gray-100 text-gray-800 border border-gray-300"
                        }`}>
                          {appointment.status === "PENDING" ? "⏳ Ausstehend" :
                           appointment.status === "PROPOSAL_SENT" ? "📧 Vorschlag gesendet" :
                           appointment.status === "CONFIRMED" ? "✓ Bestätigt" :
                           appointment.status === "CANCELLED" ? "✗ Abgesagt" :
                           appointment.status === "COMPLETED" ? "✓ Abgeschlossen" :
                           appointment.status}
                        </span>
                      </div>

                      <h3
                        className="text-lg sm:text-xl font-bold text-[#2d3748] mb-2 sm:mb-3"
                        style={{fontFamily: "'Playfair Display', serif"}}
                      >
                        {appointment.user.firstName} {appointment.user.lastName}
                      </h3>

                      <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-[#f7fafc] p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                        <p className="flex items-start sm:items-center gap-2 break-all">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <span className="font-medium">Email:</span> <span className="break-all">{appointment.user.email}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span className="font-medium">Telefon:</span> {appointment.user.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Terminart:</span> {appointment.appointmentType.name}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Dauer:</span> {appointment.appointmentType.duration} Min
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Versicherung:</span> {translateInsuranceType(appointment.insuranceType)}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Art:</span> {appointment.isFirstVisit ? '🆕 Ersttermin' : '🔄 Folgetermin'}
                        </p>
                        {appointment.reasonForVisit && (
                          <p className="flex items-start gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Grund:</span> <span>{appointment.reasonForVisit}</span>
                          </p>
                        )}
                        {appointment.notes && (
                          <p className="flex items-start gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Notizen:</span> <span>{appointment.notes}</span>
                          </p>
                        )}
                      </div>

                      {/* Dringlichkeit Badge */}
                      {appointment.urgency && (
                        <div className="mb-3">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                            appointment.urgency === 'URGENT' ? 'bg-red-100 text-red-800 border border-red-300' :
                            appointment.urgency === 'FLEXIBLE' ? 'bg-green-100 text-green-800 border border-green-300' :
                            'bg-yellow-100 text-yellow-800 border border-yellow-300'
                          }`}>
                            {appointment.urgency === 'URGENT' ? '🔴 Dringend' :
                             appointment.urgency === 'FLEXIBLE' ? '🟢 Flexibel' :
                             '🟡 Normal'}
                          </span>
                        </div>
                      )}

                      {/* Besondere Anmerkungen */}
                      {appointment.specialRemarks && (
                        <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded mb-3">
                          <p className="text-sm font-semibold text-purple-800 mb-1">Besondere Anmerkungen:</p>
                          <p className="text-sm text-gray-700">{appointment.specialRemarks}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {appointment.status === "PENDING" && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleSendProposal(appointment)}
                            className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            Terminvorschlag senden
                          </button>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() => handleSetAppointmentTime(appointment)}
                              className="flex-1 bg-[#4a9d8f] hover:bg-[#3d8378] active:bg-[#3d8378] text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              Direkt festlegen
                            </button>
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                              className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              Ablehnen
                            </button>
                          </div>
                        </div>
                      )}

                      {appointment.status === "CONFIRMED" && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={() => openConfirmDialog(appointment.id, "COMPLETED")}
                            className="flex-1 bg-[#2c5f7c] hover:bg-[#1f4459] active:bg-[#1f4459] text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation"
                          >
                            Als abgeschlossen markieren
                          </button>
                          <button
                            onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                            className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation"
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
                  ));
                })()
              ) : (
                // Show appointments without grouping when a date is selected
                appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 hover:border-[#2c5f7c] hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                          {appointment.status === "PENDING" && !appointment.startTime ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-gray-600 font-medium">Terminpräferenzen:</span>
                              <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-semibold text-[#2c5f7c] bg-blue-50 px-2 py-1 rounded">
                                  📅 {translateDays(appointment.preferredDays)}
                                </span>
                                <span className="text-sm font-semibold text-[#4a9d8f] bg-green-50 px-2 py-1 rounded">
                                  🕐 {translateTimeSlots(appointment.preferredTimeSlots)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-base sm:text-lg font-bold text-[#2c5f7c]">
                              {appointment.startTime && appointment.endTime ? `${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}` : 'Zeit wird festgelegt'}
                            </span>
                          )}
                          <span className={`px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-full self-start ${
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
                          className="text-lg sm:text-xl font-bold text-[#2d3748] mb-2 sm:mb-3"
                          style={{fontFamily: "'Playfair Display', serif"}}
                        >
                          {appointment.user.firstName} {appointment.user.lastName}
                        </h3>

                        <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-[#f7fafc] p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                          <p className="flex items-start sm:items-center gap-2 break-all">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="font-medium">Email:</span> <span className="break-all">{appointment.user.email}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="font-medium">Telefon:</span> {appointment.user.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Terminart:</span> {appointment.appointmentType.name}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Dauer:</span> {appointment.appointmentType.duration} Min
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Versicherung:</span> {translateInsuranceType(appointment.insuranceType)}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Art:</span> {appointment.isFirstVisit ? '🆕 Ersttermin' : '🔄 Folgetermin'}
                          </p>
                          {appointment.reasonForVisit && (
                            <p className="flex items-start gap-2">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                              <span className="font-medium">Grund:</span> <span>{appointment.reasonForVisit}</span>
                            </p>
                          )}
                          {appointment.notes && (
                            <p className="flex items-start gap-2">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#4a9d8f] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              <span className="font-medium">Notizen:</span> <span>{appointment.notes}</span>
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        {appointment.status === "PENDING" && (
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <button
                              onClick={() => handleSetAppointmentTime(appointment)}
                              className="flex-1 bg-[#4a9d8f] hover:bg-[#3d8378] active:bg-[#3d8378] text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              Termin festlegen
                            </button>
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                              className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              Ablehnen
                            </button>
                          </div>
                        )}

                        {appointment.status === "CONFIRMED" && (
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "COMPLETED")}
                              className="flex-1 bg-[#2c5f7c] hover:bg-[#1f4459] active:bg-[#1f4459] text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation"
                            >
                              Als abgeschlossen markieren
                            </button>
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                              className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation"
                            >
                              Absagen
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Alternative Appointment Modal */}
      {selectedAppointment && (
        <AlternativeAppointmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAppointment(null);
          }}
          onSubmit={handleSubmitAlternative}
          appointmentId={selectedAppointment.id}
          currentDate={selectedAppointment.date || ''}
          currentTime={selectedAppointment.startTime ? formatTime(selectedAppointment.startTime) : ''}
        />
      )}

      {/* Set Appointment Time Modal */}
      {selectedAppointment && (
        <SetAppointmentTimeModal
          isOpen={isSetTimeModalOpen}
          onClose={() => {
            setIsSetTimeModalOpen(false);
            setSelectedAppointment(null);
          }}
          onSubmit={handleSubmitSetTime}
          appointmentId={selectedAppointment.id}
          preferredDays={selectedAppointment.preferredDays}
          preferredTimeSlots={selectedAppointment.preferredTimeSlots}
          patientName={`${selectedAppointment.user.firstName} ${selectedAppointment.user.lastName}`}
        />
      )}

      {/* Send Proposal Modal */}
      {selectedAppointment && (
        <SendProposalModal
          isOpen={isSendProposalModalOpen}
          onClose={() => {
            setIsSendProposalModalOpen(false);
            setSelectedAppointment(null);
          }}
          onSubmit={handleSubmitProposal}
          appointmentId={selectedAppointment.id}
          preferredDays={selectedAppointment.preferredDays}
          preferredTimeSlots={selectedAppointment.preferredTimeSlots}
          urgency={selectedAppointment.urgency}
          specialRemarks={selectedAppointment.specialRemarks}
          patientName={`${selectedAppointment.user.firstName} ${selectedAppointment.user.lastName}`}
        />
      )}

      {/* Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${
                confirmDialog.action === "CONFIRMED" ? "bg-green-100" :
                confirmDialog.action === "CANCELLED" ? "bg-red-100" :
                "bg-blue-100"
              }`}>
                {confirmDialog.action === "CONFIRMED" && (
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {confirmDialog.action === "CANCELLED" && (
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
                {confirmDialog.action === "COMPLETED" && (
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#2c5f7c]">Bestätigung erforderlich</h3>
            </div>

            <p className="text-gray-700 mb-6 text-base">{confirmDialog.message}</p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDialog({ isOpen: false, action: "", appointmentId: "", message: "" })}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all duration-300 text-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={() => updateAppointmentStatus(confirmDialog.appointmentId, confirmDialog.action)}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-white ${
                  confirmDialog.action === "CONFIRMED" ? "bg-[#4a9d8f] hover:bg-[#3d8378]" :
                  confirmDialog.action === "CANCELLED" ? "bg-red-600 hover:bg-red-700" :
                  "bg-[#2c5f7c] hover:bg-[#1f4459]"
                }`}
              >
                Bestätigen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
