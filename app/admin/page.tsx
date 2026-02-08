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
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
      case "DELETE":
        message = "Möchten Sie diesen Termin wirklich endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden.";
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

  const deleteAppointment = async (appointmentId: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${appointmentId}/delete`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchAppointments();
        fetchStats();
        setConfirmDialog({ isOpen: false, action: "", appointmentId: "", message: "" });
      } else {
        alert("Fehler beim Löschen des Termins");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Fehler beim Löschen des Termins");
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
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

          <div className="card border-l-4 border-[#3d7a9e] p-4 sm:p-6">
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
            <div className="space-y-4">
              {(() => {
                const groupedByDate: { [key: string]: Appointment[] } = {};
                appointments.forEach(apt => {
                  const dateKey = !selectedDate ? (apt.date || 'pending') : 'selected';
                  if (!groupedByDate[dateKey]) {
                    groupedByDate[dateKey] = [];
                  }
                  groupedByDate[dateKey].push(apt);
                });

                const statusBadge = (status: string) => {
                  const styles: Record<string, string> = {
                    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
                    PROPOSAL_SENT: "bg-purple-100 text-purple-800 border-purple-300",
                    CONFIRMED: "bg-green-100 text-green-800 border-green-300",
                    CANCELLED: "bg-red-100 text-red-800 border-red-300",
                    COMPLETED: "bg-blue-100 text-blue-800 border-blue-300",
                  };
                  const labels: Record<string, string> = {
                    PENDING: "Ausstehend",
                    PROPOSAL_SENT: "Vorschlag",
                    CONFIRMED: "Bestätigt",
                    CANCELLED: "Abgesagt",
                    COMPLETED: "Erledigt",
                  };
                  return (
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${styles[status] || "bg-gray-100 text-gray-800 border-gray-300"}`}>
                      {labels[status] || status}
                    </span>
                  );
                };

                const renderAppointmentRow = (appointment: Appointment) => {
                  const isExpanded = expandedId === appointment.id;
                  const timeDisplay = appointment.startTime && appointment.endTime
                    ? `${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}`
                    : translateTimeSlots(appointment.preferredTimeSlots);

                  return (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                      {/* Kompakte Zeile */}
                      <div
                        className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedId(isExpanded ? null : appointment.id)}
                      >
                        {/* Chevron */}
                        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>

                        {/* Name */}
                        <span className="font-semibold text-sm text-gray-900 min-w-0 truncate sm:w-40">
                          {appointment.user.firstName} {appointment.user.lastName}
                        </span>

                        {/* Terminart - hidden on mobile */}
                        <span className="hidden md:block text-sm text-gray-600 w-36 truncate">
                          {appointment.appointmentType.name}
                        </span>

                        {/* Versicherung - hidden on mobile */}
                        <span className="hidden lg:block text-xs text-gray-500 w-28 truncate">
                          {translateInsuranceType(appointment.insuranceType)}
                        </span>

                        {/* Zeit/Präferenz - hidden on small mobile */}
                        <span className="hidden sm:block text-xs text-gray-600 w-40 truncate">
                          {timeDisplay}
                        </span>

                        {/* Status */}
                        <span className="ml-auto sm:ml-0 flex-shrink-0">
                          {statusBadge(appointment.status)}
                        </span>

                        {/* Löschen-Icon */}
                        <button
                          onClick={(e) => { e.stopPropagation(); openConfirmDialog(appointment.id, "DELETE"); }}
                          className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Termin löschen"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>

                      {/* Aufgeklappte Details */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 bg-gray-50 px-4 sm:px-6 py-4">
                          {/* Kontaktdaten */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              <span className="break-all">{appointment.user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-[#4a9d8f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              {appointment.user.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Terminart:</span> {appointment.appointmentType.name} ({appointment.appointmentType.duration} Min)
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Versicherung:</span> {translateInsuranceType(appointment.insuranceType)}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Art:</span> {appointment.isFirstVisit ? 'Ersttermin' : 'Folgetermin'}
                            </div>
                            {appointment.user.dateOfBirth && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Geb.:</span> {new Date(appointment.user.dateOfBirth).toLocaleDateString("de-DE")}
                              </div>
                            )}
                            {appointment.user.address && (
                              <div className="flex items-center gap-2 sm:col-span-2">
                                <span className="font-medium">Adresse:</span> {appointment.user.address}
                              </div>
                            )}
                          </div>

                          {/* Präferenzen bei PENDING */}
                          {appointment.status === "PENDING" && !appointment.startTime && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="text-sm font-semibold text-[#2c5f7c] bg-blue-50 px-2 py-1 rounded">
                                Tage: {translateDays(appointment.preferredDays)}
                              </span>
                              <span className="text-sm font-semibold text-[#4a9d8f] bg-green-50 px-2 py-1 rounded">
                                Zeit: {translateTimeSlots(appointment.preferredTimeSlots)}
                              </span>
                            </div>
                          )}

                          {/* Grund & Notizen */}
                          {appointment.reasonForVisit && (
                            <div className="mb-2 text-sm"><span className="font-medium text-gray-800">Grund:</span> <span className="text-gray-600">{appointment.reasonForVisit}</span></div>
                          )}
                          {appointment.notes && (
                            <div className="mb-2 text-sm"><span className="font-medium text-gray-800">Notizen:</span> <span className="text-gray-600">{appointment.notes}</span></div>
                          )}

                          {/* Dringlichkeit */}
                          {appointment.urgency && (
                            <div className="mb-3">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                appointment.urgency === 'URGENT' ? 'bg-red-100 text-red-800' :
                                appointment.urgency === 'FLEXIBLE' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {appointment.urgency === 'URGENT' ? 'Dringend' :
                                 appointment.urgency === 'FLEXIBLE' ? 'Flexibel' : 'Normal'}
                              </span>
                            </div>
                          )}

                          {/* Besondere Anmerkungen */}
                          {appointment.specialRemarks && (
                            <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded mb-4 text-sm">
                              <p className="font-semibold text-purple-800 mb-1">Besondere Anmerkungen:</p>
                              <p className="text-gray-700">{appointment.specialRemarks}</p>
                            </div>
                          )}

                          {/* Aktions-Buttons */}
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                            {appointment.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() => handleSendProposal(appointment)}
                                  title="Terminvorschlag senden"
                                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                                >
                                  Vorschlag senden
                                </button>
                                <button
                                  onClick={() => handleSetAppointmentTime(appointment)}
                                  title="Termin direkt festlegen"
                                  className="bg-[#4a9d8f] hover:bg-[#3d8378] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                                >
                                  Direkt festlegen
                                </button>
                                <button
                                  onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                                  title="Termin ablehnen"
                                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                                >
                                  Ablehnen
                                </button>
                              </>
                            )}
                            {appointment.status === "CONFIRMED" && (
                              <>
                                <button
                                  onClick={() => openConfirmDialog(appointment.id, "COMPLETED")}
                                  title="Als abgeschlossen markieren"
                                  className="bg-[#2c5f7c] hover:bg-[#1f4459] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                                >
                                  Abgeschlossen
                                </button>
                                <button
                                  onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                                  title="Termin absagen"
                                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                                >
                                  Absagen
                                </button>
                              </>
                            )}
                            {appointment.status === "PROPOSAL_SENT" && (
                              <button
                                onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                                title="Termin absagen"
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                              >
                                Absagen
                              </button>
                            )}
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "DELETE")}
                              title="Termin löschen"
                              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm flex items-center gap-1.5"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Löschen
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                };

                return Object.keys(groupedByDate).map(dateKey => (
                  <div key={dateKey} className="space-y-2">
                    {!selectedDate && (
                      <div className="bg-[#2c5f7c] text-white px-3 sm:px-4 py-2.5 rounded-lg sticky top-0 z-10 shadow-md">
                        <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="truncate">{dateKey === 'pending' ? 'Ausstehende Terminanfragen' : formatDate(dateKey)}</span>
                          <span className="ml-auto bg-white text-[#2c5f7c] px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap">
                            {groupedByDate[dateKey].length}
                          </span>
                        </h3>
                      </div>
                    )}
                    {groupedByDate[dateKey].map(renderAppointmentRow)}
                  </div>
                ));
              })()}
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
                confirmDialog.action === "CANCELLED" || confirmDialog.action === "DELETE" ? "bg-red-100" :
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
                {confirmDialog.action === "DELETE" && (
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
                onClick={() => confirmDialog.action === "DELETE" ? deleteAppointment(confirmDialog.appointmentId) : updateAppointmentStatus(confirmDialog.appointmentId, confirmDialog.action)}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-white ${
                  confirmDialog.action === "CONFIRMED" ? "bg-[#4a9d8f] hover:bg-[#3d8378]" :
                  confirmDialog.action === "CANCELLED" || confirmDialog.action === "DELETE" ? "bg-red-600 hover:bg-red-700" :
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
