"use client";

import { useState, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const registered = searchParams.get("registered");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Ungültige Email oder Passwort");
        return;
      }

      // Hole Rolle direkt aus der Datenbank statt aus Session
      const roleResponse = await fetch("/api/auth/check-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const roleData = await roleResponse.json();
      console.log("User Rolle aus DB:", roleData.role);

      // Nach erfolgreichem Login basierend auf Rolle weiterleiten
      if (roleData.role === "ADMIN") {
        console.log("Weiterleitung zu /admin");
        window.location.href = "/admin";
      } else {
        console.log("Weiterleitung zu /termine/buchen");
        window.location.href = "/termine/buchen";
      }
    } catch (err) {
      console.error("Login Fehler:", err);
      setError("Ein Fehler ist aufgetreten");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo und Praxisname */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.jpeg"
              alt="Praxis Logo"
              width={100}
              height={100}
              className="rounded-lg shadow-md"
            />
          </div>
          <h1
            className="text-3xl font-bold text-[#2c5f7c] mb-2"
            style={{fontFamily: "'Playfair Display', serif"}}
          >
            Willkommen zurück
          </h1>
          <p className="text-gray-600">
            Melden Sie sich an, um Termine zu verwalten
          </p>
        </div>

        {/* Login Card */}
        <div className="card">
          {registered && (
            <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-center">
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Registrierung erfolgreich! Sie können sich jetzt anmelden.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#2d3748] mb-2">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="ihre.email@beispiel.de"
                className="input-field text-gray-900"
              />
            </div>

            {/* Passwort */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2d3748] mb-2">
                Passwort
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field text-gray-900"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wird angemeldet...
                </span>
              ) : (
                "Anmelden"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Noch kein Konto?{" "}
              <Link
                href="/auth/register"
                className="text-[#2c5f7c] hover:text-[#1f4459] font-semibold hover:underline transition-colors"
              >
                Jetzt registrieren
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-[#2c5f7c] transition-colors"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>

        {/* Sicherheitshinweis */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Ihre Daten werden sicher verschlüsselt übertragen
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c5f7c] mx-auto mb-4"></div>
          <p className="text-gray-600">Lädt...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
