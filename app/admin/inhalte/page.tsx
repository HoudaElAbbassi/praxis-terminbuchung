"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEFAULTS: Record<string, string> = {
  welcome_title: "Herzlich willkommen zur Praxis",
  welcome_text:
    "Ich freue mich, Sie in modernen, hellen Räumen begrüßen zu dürfen. Als Facharzt für Gefäßchirurgie und Viszeralchirurgie biete ich eine patientenorientierte und menschlich zugewandte Medizin. Mein Ziel ist es, die Versorgung mit modernster Technik zu verbinden und Ihnen eine vertraute, angenehme Atmosphäre zu bieten.",
  opening_mon_wed: "08:00 – 15:00 Uhr",
  opening_tue_thu: "10:00 – 17:00 Uhr",
  opening_fri: "08:00 – 12:00 Uhr",
  contact_phone: "",
  contact_email: "praxis@gefaessmedizinremscheid.de",
  contact_address: "",
};

export default function InhaltePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(DEFAULTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role !== "ADMIN") {
        router.push("/");
        return;
      }
      fetchSettings();
    }
  }, [status, session]);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setValues({ ...DEFAULTS, ...data });
    } catch {
      // keep defaults
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSuccess("Änderungen gespeichert!");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Fehler beim Speichern. Bitte erneut versuchen.");
    } finally {
      setIsSaving(false);
    }
  };

  const set = (key: string, val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  if (status === "loading" || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Lädt...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
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
          <h1 className="text-3xl font-bold text-gray-900">Inhalte bearbeiten</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow"
          >
            {isSaving ? "Speichert..." : "Speichern"}
          </button>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            ✓ {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Willkommenstext */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-sm">🏠</span>
            Startseite – Willkommenstext
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Überschrift</label>
              <input
                type="text"
                value={values.welcome_title}
                onChange={(e) => set("welcome_title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Begrüßungstext</label>
              <textarea
                rows={5}
                value={values.welcome_text}
                onChange={(e) => set("welcome_text", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 resize-none"
              />
            </div>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-sm">🕐</span>
            Öffnungszeiten
          </h2>
          <div className="space-y-4">
            {[
              { label: "Montag & Mittwoch", key: "opening_mon_wed" },
              { label: "Dienstag & Donnerstag", key: "opening_tue_thu" },
              { label: "Freitag", key: "opening_fri" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center gap-4">
                <label className="w-48 text-sm font-medium text-gray-700 flex-shrink-0">{label}</label>
                <input
                  type="text"
                  value={values[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder="z.B. 08:00 – 15:00 Uhr"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
              </div>
            ))}
            <p className="text-xs text-gray-400">Samstag & Sonntag sind automatisch als geschlossen angezeigt.</p>
          </div>
        </section>

        {/* Kontaktdaten */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-sm">📞</span>
            Kontaktdaten
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input
                type="text"
                value={values.contact_phone}
                onChange={(e) => set("contact_phone", e.target.value)}
                placeholder="z.B. 02191 123456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input
                type="email"
                value={values.contact_email}
                onChange={(e) => set("contact_email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                value={values.contact_address}
                onChange={(e) => set("contact_address", e.target.value)}
                placeholder="z.B. Musterstraße 1, 42853 Remscheid"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow"
          >
            {isSaving ? "Speichert..." : "Alle Änderungen speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}
