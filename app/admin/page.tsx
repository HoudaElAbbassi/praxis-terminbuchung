"use client";

import { useEffect, useState, useMemo } from "react";
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
  createdAt?: string;
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

// Filter-Typen
type StatusFilter = "ALL" | "PENDING" | "PROPOSAL_SENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
type UrgencyFilter = "ALL" | "URGENT" | "NORMAL" | "FLEXIBLE";
type SortOption = "date_desc" | "date_asc" | "name_asc" | "name_desc" | "urgency" | "status";

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

  // Neue Filter-States
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date_desc");
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"cards" | "table">("table"); // Default: Tabelle

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

  // Gefilterte und sortierte Termine
  const filteredAppointments = useMemo(() => {
    let filtered = [...appointments];

    // Status-Filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    // Dringlichkeits-Filter
    if (urgencyFilter !== "ALL") {
      filtered = filtered.filter(apt => apt.urgency === urgencyFilter);
    }

    // Suchfeld (Name oder E-Mail)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(apt =>
        `${apt.user.firstName} ${apt.user.lastName}`.toLowerCase().includes(query) ||
        apt.user.email.toLowerCase().includes(query) ||
        apt.user.phone.includes(query)
      );
    }

    // Sortierung
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "date_desc":
          // Neueste zuerst, Termine ohne Datum ans Ende
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date_asc":
          // Älteste zuerst, Termine ohne Datum ans Ende
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "name_asc":
          return `${a.user.firstName} ${a.user.lastName}`.localeCompare(`${b.user.firstName} ${b.user.lastName}`);
        case "name_desc":
          return `${b.user.firstName} ${b.user.lastName}`.localeCompare(`${a.user.firstName} ${a.user.lastName}`);
        case "urgency":
          const urgencyOrder: Record<string, number> = { URGENT: 0, NORMAL: 1, FLEXIBLE: 2 };
          return (urgencyOrder[a.urgency || 'NORMAL'] || 1) - (urgencyOrder[b.urgency || 'NORMAL'] || 1);
        case "status":
          const statusOrder: Record<string, number> = { PENDING: 0, PROPOSAL_SENT: 1, CONFIRMED: 2, COMPLETED: 3, CANCELLED: 4 };
          return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
        default:
          return 0;
      }
    });

    return filtered;
  }, [appointments, statusFilter, urgencyFilter, searchQuery, sortOption]);

  // Prüfen ob Filter aktiv sind
  const hasActiveFilters = statusFilter !== "ALL" || urgencyFilter !== "ALL" || searchQuery.trim() !== "" || selectedDate !== "";

  // Filter zurücksetzen
  const resetFilters = () => {
    setStatusFilter("ALL");
    setUrgencyFilter("ALL");
    setSearchQuery("");
    setSelectedDate("");
    setSortOption("date_desc");
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
        setConfirmDialog({
          isOpen: false,
          action: "",
          appointmentId: "",
          message: "",
        });
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

        {/* Filter-Bereich */}
        <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
          {/* Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[#2c5f7c] font-semibold text-sm sm:text-base"
            >
              <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter & Sortierung
              {hasActiveFilters && (
                <span className="bg-[#4a9d8f] text-white text-xs px-2 py-0.5 rounded-full">Aktiv</span>
              )}
            </button>
            <div className="flex items-center gap-3">
              {/* Ansicht-Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-all ${viewMode === "table" ? "bg-white shadow text-[#2c5f7c]" : "text-gray-500 hover:text-gray-700"}`}
                  title="Tabellenansicht"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`p-2 rounded-md transition-all ${viewMode === "cards" ? "bg-white shadow text-[#2c5f7c]" : "text-gray-500 hover:text-gray-700"}`}
                  title="Kartenansicht"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-[#2c5f7c]">{filteredAppointments.length}</span> von {appointments.length} Terminen
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Filter zurücksetzen
                </button>
              )}
            </div>
          </div>

          {/* Filter-Optionen */}
          {showFilters && (
            <div className="space-y-4">
              {/* Suchfeld */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Suche</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Name, E-Mail oder Telefon..."
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2c5f7c] focus:ring-2 focus:ring-[#2c5f7c]/20 transition-all text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Filter-Reihe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status-Filter */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2c5f7c] focus:ring-2 focus:ring-[#2c5f7c]/20 transition-all text-sm bg-white"
                  >
                    <option value="ALL">Alle Status</option>
                    <option value="PENDING">⏳ Ausstehend</option>
                    <option value="PROPOSAL_SENT">📧 Vorschlag gesendet</option>
                    <option value="CONFIRMED">✓ Bestätigt</option>
                    <option value="COMPLETED">✓ Abgeschlossen</option>
                    <option value="CANCELLED">✗ Abgesagt</option>
                  </select>
                </div>

                {/* Dringlichkeits-Filter */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Dringlichkeit</label>
                  <select
                    value={urgencyFilter}
                    onChange={(e) => setUrgencyFilter(e.target.value as UrgencyFilter)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2c5f7c] focus:ring-2 focus:ring-[#2c5f7c]/20 transition-all text-sm bg-white"
                  >
                    <option value="ALL">Alle Dringlichkeiten</option>
                    <option value="URGENT">🔴 Dringend</option>
                    <option value="NORMAL">🟡 Normal</option>
                    <option value="FLEXIBLE">🟢 Flexibel</option>
                  </select>
                </div>

                {/* Datum-Filter */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Datum</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2c5f7c] focus:ring-2 focus:ring-[#2c5f7c]/20 transition-all text-sm"
                  />
                </div>

                {/* Sortierung */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Sortierung</label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#2c5f7c] focus:ring-2 focus:ring-[#2c5f7c]/20 transition-all text-sm bg-white"
                  >
                    <option value="date_desc">Datum (neueste zuerst)</option>
                    <option value="date_asc">Datum (älteste zuerst)</option>
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="urgency">Dringlichkeit</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>

              {/* Status-Schnellfilter (Chips) */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Schnellfilter Status</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "ALL", label: "Alle", color: "gray" },
                    { value: "PENDING", label: "⏳ Ausstehend", color: "yellow" },
                    { value: "PROPOSAL_SENT", label: "📧 Vorschlag", color: "purple" },
                    { value: "CONFIRMED", label: "✓ Bestätigt", color: "green" },
                    { value: "COMPLETED", label: "✓ Abgeschlossen", color: "blue" },
                    { value: "CANCELLED", label: "✗ Abgesagt", color: "red" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setStatusFilter(option.value as StatusFilter)}
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                        statusFilter === option.value
                          ? option.color === "gray" ? "bg-gray-700 text-white" :
                            option.color === "yellow" ? "bg-yellow-500 text-white" :
                            option.color === "purple" ? "bg-purple-500 text-white" :
                            option.color === "green" ? "bg-green-500 text-white" :
                            option.color === "blue" ? "bg-blue-500 text-white" :
                            "bg-red-500 text-white"
                          : option.color === "gray" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" :
                            option.color === "yellow" ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100" :
                            option.color === "purple" ? "bg-purple-50 text-purple-700 hover:bg-purple-100" :
                            option.color === "green" ? "bg-green-50 text-green-700 hover:bg-green-100" :
                            option.color === "blue" ? "bg-blue-50 text-blue-700 hover:bg-blue-100" :
                            "bg-red-50 text-red-700 hover:bg-red-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-[#e8f4f2] rounded-lg">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[#4a9d8f] mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 text-base sm:text-lg">
                {hasActiveFilters
                  ? "Keine Termine gefunden mit diesen Filterkriterien"
                  : selectedDate
                    ? "Keine Termine für diesen Tag"
                    : "Keine anstehenden Termine"}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="mt-4 text-[#2c5f7c] hover:text-[#1f4459] font-semibold text-sm"
                >
                  Filter zurücksetzen
                </button>
              )}
            </div>
          ) : viewMode === "table" ? (
            /* ========== TABELLENANSICHT ========== */
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#2c5f7c] text-white">
                    <th className="px-3 py-3 text-left font-semibold rounded-tl-lg">Datum</th>
                    <th className="px-3 py-3 text-left font-semibold">Uhrzeit</th>
                    <th className="px-3 py-3 text-left font-semibold">Patient</th>
                    <th className="px-3 py-3 text-left font-semibold hidden md:table-cell">Kontakt</th>
                    <th className="px-3 py-3 text-left font-semibold hidden lg:table-cell">Terminart</th>
                    <th className="px-3 py-3 text-center font-semibold">Status</th>
                    <th className="px-3 py-3 text-center font-semibold hidden sm:table-cell">Dringlichkeit</th>
                    <th className="px-3 py-3 text-center font-semibold rounded-tr-lg">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.map((appointment, index) => (
                    <tr
                      key={appointment.id}
                      className={`hover:bg-[#e8f4f2] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      {/* Datum */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        {appointment.date ? (
                          <div>
                            <div className="font-medium text-gray-900">
                              {new Date(appointment.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(appointment.date).toLocaleDateString("de-DE", { weekday: "short" })}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500 italic">Offen</span>
                        )}
                      </td>
                      {/* Uhrzeit */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        {appointment.startTime ? (
                          <span className="font-medium text-[#2c5f7c]">{formatTime(appointment.startTime)}</span>
                        ) : (
                          <div className="text-xs text-gray-500">
                            <div>{translateTimeSlots(appointment.preferredTimeSlots)}</div>
                          </div>
                        )}
                      </td>
                      {/* Patient */}
                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-900">
                          {appointment.user.firstName} {appointment.user.lastName}
                        </div>
                        <div className="text-xs text-gray-500 md:hidden">{appointment.user.phone}</div>
                      </td>
                      {/* Kontakt (hidden on mobile) */}
                      <td className="px-3 py-3 hidden md:table-cell">
                        <div className="text-xs">
                          <div className="text-gray-600">{appointment.user.phone}</div>
                          <div className="text-gray-400 truncate max-w-[150px]">{appointment.user.email}</div>
                        </div>
                      </td>
                      {/* Terminart (hidden on mobile/tablet) */}
                      <td className="px-3 py-3 hidden lg:table-cell">
                        <span className="text-gray-700">{appointment.appointmentType.name}</span>
                      </td>
                      {/* Status */}
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                          appointment.status === "PROPOSAL_SENT" ? "bg-purple-100 text-purple-800" :
                          appointment.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                          appointment.status === "CANCELLED" ? "bg-red-100 text-red-800" :
                          appointment.status === "COMPLETED" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {appointment.status === "PENDING" ? "Offen" :
                           appointment.status === "PROPOSAL_SENT" ? "Vorschlag" :
                           appointment.status === "CONFIRMED" ? "Bestätigt" :
                           appointment.status === "CANCELLED" ? "Abgesagt" :
                           appointment.status === "COMPLETED" ? "Fertig" :
                           appointment.status}
                        </span>
                      </td>
                      {/* Dringlichkeit (hidden on mobile) */}
                      <td className="px-3 py-3 text-center hidden sm:table-cell">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                          appointment.urgency === 'URGENT' ? 'bg-red-100 text-red-600' :
                          appointment.urgency === 'FLEXIBLE' ? 'bg-green-100 text-green-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`} title={
                          appointment.urgency === 'URGENT' ? 'Dringend' :
                          appointment.urgency === 'FLEXIBLE' ? 'Flexibel' : 'Normal'
                        }>
                          {appointment.urgency === 'URGENT' ? '!' :
                           appointment.urgency === 'FLEXIBLE' ? '~' : '•'}
                        </span>
                      </td>
                      {/* Aktionen */}
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center gap-1">
                          {appointment.status === "PENDING" && (
                            <>
                              <button
                                onClick={() => handleSendProposal(appointment)}
                                className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                                title="Terminvorschlag senden"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleSetAppointmentTime(appointment)}
                                className="p-1.5 text-[#4a9d8f] hover:bg-[#e8f4f2] rounded-lg transition-colors"
                                title="Termin direkt festlegen"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button
                                onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                                className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Ablehnen"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </>
                          )}
                          {appointment.status === "CONFIRMED" && (
                            <>
                              <button
                                onClick={() => openConfirmDialog(appointment.id, "COMPLETED")}
                                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Als abgeschlossen markieren"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button
                                onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                                className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Absagen"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </>
                          )}
                          {(appointment.status === "COMPLETED" || appointment.status === "CANCELLED") && (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {!selectedDate ? (
                // Group by date when no date filter is active
                (() => {
                  const groupedByDate: { [key: string]: Appointment[] } = {};
                  filteredAppointments.forEach(apt => {
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
                        <div className="flex flex-col gap-2">
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
                          <button
                            onClick={() => openConfirmDialog(appointment.id, "DELETE")}
                            className="w-full bg-gray-500 hover:bg-gray-600 active:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm touch-manipulation"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Termin löschen
                          </button>
                        </div>
                      )}

                      {(appointment.status === "COMPLETED" || appointment.status === "CANCELLED") && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => openConfirmDialog(appointment.id, "DELETE")}
                            className="w-full bg-gray-500 hover:bg-gray-600 active:bg-gray-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Termin löschen
                          </button>
                        </div>
                      )}

                      {appointment.status === "PROPOSAL_SENT" && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                          >
                            Absagen
                          </button>
                          <button
                            onClick={() => openConfirmDialog(appointment.id, "DELETE")}
                            className="w-full bg-gray-500 hover:bg-gray-600 active:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm touch-manipulation"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Termin löschen
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
                filteredAppointments.map((appointment) => (
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
                          <div className="flex flex-col gap-2">
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
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "DELETE")}
                              className="w-full bg-gray-500 hover:bg-gray-600 active:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm touch-manipulation"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Termin löschen
                            </button>
                          </div>
                        )}

                        {(appointment.status === "COMPLETED" || appointment.status === "CANCELLED") && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "DELETE")}
                              className="w-full bg-gray-500 hover:bg-gray-600 active:bg-gray-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Termin löschen
                            </button>
                          </div>
                        )}

                        {appointment.status === "PROPOSAL_SENT" && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "CANCELLED")}
                              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                            >
                              Absagen
                            </button>
                            <button
                              onClick={() => openConfirmDialog(appointment.id, "DELETE")}
                              className="w-full bg-gray-500 hover:bg-gray-600 active:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm touch-manipulation"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Termin löschen
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
