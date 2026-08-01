'use client';

import { useState } from 'react';

export default function VacationBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border-b-2 border-amber-300 text-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-amber-500 text-xl mt-0.5 flex-shrink-0">🏖️</span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4 gap-y-1 text-sm">
              <span className="font-semibold text-amber-800">
                Praxisurlaub bis 24. August
              </span>
              <span className="hidden sm:inline text-amber-400">|</span>
              <span>
                Vertretung: <strong>Dr. med. Florian Lepique</strong>, Remscheid &ndash; Sanaklinikum Remscheid, Gefäßchirurgie
              </span>
              <span className="hidden sm:inline text-amber-400">|</span>
              <span>
                Notfall:{" "}
<a href="tel:112" className="font-bold text-amber-700 underline underline-offset-2 hover:text-amber-900 transition-colors">📞 112</a>
                <span className="text-amber-600 mx-1">·</span>
                <a href="tel:116117" className="font-bold text-amber-700 underline underline-offset-2 hover:text-amber-900 transition-colors">116 117</a>
                <span className="text-amber-600 ml-1">(Bereitschaftsdienst)</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Banner schließen"
            className="text-amber-500 hover:text-amber-800 transition-colors flex-shrink-0 mt-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
