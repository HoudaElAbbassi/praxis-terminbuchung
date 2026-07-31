'use client';

import { useState, useEffect } from 'react';

export default function VacationPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('vacationPopupDismissed_aug2025');
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('vacationPopupDismissed_aug2025', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Schließen"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            🏖️
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Praxisurlaub</h2>
            <p className="text-sm text-amber-600 font-medium">Geschlossen bis einschließlich 23. August</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-4" />

        {/* Info rows */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 mt-0.5">📅</span>
            <div>
              <span className="font-semibold">Wiederöffnung:</span> ab 25. August
              <p className="text-gray-500 text-xs mt-0.5">Alle Anfragen werden dann umgehend bearbeitet.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-amber-500 mt-0.5">👨‍⚕️</span>
            <div>
              <span className="font-semibold">Vertretung:</span>
              <p>Dr. med. Florian Lepique, Remscheid</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-red-500 mt-0.5">🚨</span>
            <div>
              <span className="font-semibold">Notfall?</span>
              <p className="mt-1">
                Notruf:{" "}
                <a href="tel:112" className="font-bold text-red-600 hover:text-red-800 underline underline-offset-2 transition-colors">
                  112
                </a>
              </p>
              <p className="mt-1">
                Ärztlicher Bereitschaftsdienst:{" "}
                <a href="tel:116117" className="font-bold text-red-600 hover:text-red-800 underline underline-offset-2 transition-colors">
                  116 117
                </a>
              </p>
              <p className="text-gray-500 text-xs mt-0.5">Rund um die Uhr erreichbar.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={dismiss}
          className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
