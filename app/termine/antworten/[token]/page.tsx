"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type ProposalData = {
  id: string;
  proposedDate: string;
  proposedTime: string;
  proposedEndTime: string;
  status: string;
  patientResponse: string | null;
  rejectionReason: string | null;
  alreadyResponded: boolean;
  appointment: {
    appointmentType: {
      name: string;
      duration: number;
      description: string | null;
    };
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
    preferredDays: string | null;
    preferredTimeSlots: string | null;
    urgency: string | null;
    specialRemarks: string | null;
  };
};

export default function AppointmentResponsePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const token = params.token as string;
  const actionParam = searchParams.get("action");

  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [responseAction, setResponseAction] = useState<"accepted" | "rejected" | null>(null);

  useEffect(() => {
    if (token) {
      fetchProposal();
    }
  }, [token]);

  const fetchProposal = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/appointments/proposal/${token}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terminvorschlag konnte nicht geladen werden");
        return;
      }

      setProposal(data.proposal);

      // If action parameter is present and not already responded, show appropriate form
      if (actionParam === "reject" && !data.proposal.alreadyResponded) {
        setShowRejectForm(true);
      }
    } catch (err) {
      setError("Fehler beim Laden des Terminvorschlags");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!proposal) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/appointments/respond/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Fehler beim Annehmen des Termins");
        return;
      }

      setResponseSuccess(true);
      setResponseAction("accepted");
    } catch (err) {
      setError("Fehler beim Verarbeiten Ihrer Antwort");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!proposal) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/appointments/respond/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject",
          rejectionReason: rejectionReason || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Fehler beim Ablehnen des Termins");
        return;
      }

      setResponseSuccess(true);
      setResponseAction("rejected");
    } catch (err) {
      setError("Fehler beim Verarbeiten Ihrer Antwort");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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
        morning: "Vormittag",
        afternoon: "Nachmittag",
        evening: "Abend"
      };
      return slotsArray.map(slot => translations[slot] || slot).join(", ");
    } catch {
      return slots;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c5f7c] mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Terminvorschlag...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Fehler</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="btn-primary inline-block"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (responseSuccess && proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <Image
              src="/images/logo.jpeg"
              alt="Praxis Logo"
              width={100}
              height={100}
              className="rounded-lg shadow-md mx-auto mb-4"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {responseAction === "accepted" ? (
              <>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
                  <div className="text-white text-6xl mb-4">✅</div>
                  <h1 className="text-3xl font-bold text-white">Termin bestätigt!</h1>
                </div>
                <div className="p-8">
                  <p className="text-lg text-gray-700 mb-6">
                    Sehr geehrte/r {proposal.appointment.user.firstName} {proposal.appointment.user.lastName},
                  </p>
                  <p className="text-gray-600 mb-6">
                    vielen Dank für Ihre Bestätigung. Ihr Termin wurde erfolgreich gebucht:
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Datum:</p>
                        <p className="text-lg text-gray-900">{new Date(proposal.proposedDate).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Uhrzeit:</p>
                        <p className="text-lg text-gray-900">{proposal.proposedTime} Uhr</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Terminart:</p>
                        <p className="text-lg text-gray-900">{proposal.appointment.appointmentType.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Dauer:</p>
                        <p className="text-lg text-gray-900">{proposal.appointment.appointmentType.duration} Minuten</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">📋 Wichtige Hinweise:</h3>
                    <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                      <li>Bitte erscheinen Sie 10 Minuten vor Terminbeginn</li>
                      <li>Bringen Sie Ihre Versichertenkarte mit</li>
                      <li>Bei Verhinderung rufen Sie uns bitte rechtzeitig an</li>
                    </ul>
                  </div>

                  <p className="text-sm text-gray-600">
                    Sie erhalten in Kürze eine Bestätigungsemail mit allen Details.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-6 text-center">
                  <div className="text-white text-6xl mb-4">📝</div>
                  <h1 className="text-3xl font-bold text-white">Rückmeldung erhalten</h1>
                </div>
                <div className="p-8">
                  <p className="text-lg text-gray-700 mb-6">
                    Sehr geehrte/r {proposal.appointment.user.firstName} {proposal.appointment.user.lastName},
                  </p>
                  <p className="text-gray-600 mb-6">
                    vielen Dank für Ihre Rückmeldung. Wir haben Ihre Ablehnung erhalten und werden uns zeitnah mit einem neuen Terminvorschlag bei Ihnen melden.
                  </p>

                  {rejectionReason && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                      <p className="text-sm text-yellow-900 font-semibold mb-2">Ihr Feedback:</p>
                      <p className="text-yellow-800">{rejectionReason}</p>
                    </div>
                  )}

                  <p className="text-sm text-gray-600">
                    Bei Fragen erreichen Sie uns telefonisch oder per E-Mail.
                  </p>
                </div>
              </>
            )}

            <div className="bg-gray-50 p-6 text-center border-t">
              <Link
                href="/"
                className="text-[#2c5f7c] hover:text-[#1f4459] font-semibold hover:underline"
              >
                ← Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Already responded state
  if (proposal && proposal.alreadyResponded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-yellow-500 text-5xl mb-4">ℹ️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Bereits beantwortet</h1>
          <p className="text-gray-600 mb-6">
            Sie haben bereits auf diesen Terminvorschlag geantwortet.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Ihre Antwort: <span className="font-semibold">
              {proposal.patientResponse === "ACCEPTED" ? "Angenommen ✅" : "Abgelehnt ❌"}
            </span>
          </p>
          <Link
            href="/"
            className="btn-primary inline-block"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  // Main response form
  if (!proposal) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo.jpeg"
            alt="Praxis Logo"
            width={100}
            height={100}
            className="rounded-lg shadow-md mx-auto mb-4"
          />
          <h1
            className="text-3xl font-bold text-[#2c5f7c] mb-2"
            style={{fontFamily: "'Playfair Display', serif"}}
          >
            Terminvorschlag
          </h1>
          <p className="text-gray-600">
            Praxis für Gefäßmedizin Remscheid
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#4a9d8f] to-[#2c5f7c] p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Ihr Terminvorschlag
            </h2>
          </div>

          <div className="p-8">
            <p className="text-lg text-gray-700 mb-6">
              Sehr geehrte/r {proposal.appointment.user.firstName} {proposal.appointment.user.lastName},
            </p>

            <p className="text-gray-600 mb-8">
              wir möchten Ihnen folgenden Termin vorschlagen:
            </p>

            {/* Proposed Appointment */}
            <div className="bg-[#e8f4f2] border-l-4 border-[#4a9d8f] p-6 rounded-lg mb-8">
              <h3 className="font-bold text-[#2c5f7c] mb-4 text-lg">📅 Vorgeschlagener Termin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Datum:</p>
                  <p className="text-lg text-gray-900">
                    {new Date(proposal.proposedDate).toLocaleDateString('de-DE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Uhrzeit:</p>
                  <p className="text-lg text-gray-900">{proposal.proposedTime} Uhr</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Terminart:</p>
                  <p className="text-lg text-gray-900">{proposal.appointment.appointmentType.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Dauer:</p>
                  <p className="text-lg text-gray-900">{proposal.appointment.appointmentType.duration} Minuten</p>
                </div>
              </div>
            </div>

            {/* Your Preferences */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">ℹ️ Ihre ursprünglichen Präferenzen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-semibold">Bevorzugte Tage:</p>
                  <p className="text-blue-900">{translateDays(proposal.appointment.preferredDays)}</p>
                </div>
                <div>
                  <p className="text-blue-700 font-semibold">Bevorzugte Zeiten:</p>
                  <p className="text-blue-900">{translateTimeSlots(proposal.appointment.preferredTimeSlots)}</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Reject Form */}
            {showRejectForm ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Warum können Sie diesen Termin nicht wahrnehmen? (optional)
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c5f7c] focus:border-transparent text-gray-900"
                    placeholder="z.B. 'Ich habe an diesem Tag bereits einen anderen Termin' oder 'Diese Uhrzeit passt mir nicht'"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowRejectForm(false)}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all disabled:opacity-50"
                  >
                    Zurück
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Wird gesendet..." : "Ablehnung bestätigen"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAccept}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Wird verarbeitet..." : "✅ Termin annehmen"}
                </button>
                <button
                  onClick={() => setShowRejectForm(true)}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ❌ Termin ablehnen
                </button>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center mt-6">
              Bei Fragen erreichen Sie uns unter: 📞 02191 123456
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-[#2c5f7c] transition-colors"
          >
            ← Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
