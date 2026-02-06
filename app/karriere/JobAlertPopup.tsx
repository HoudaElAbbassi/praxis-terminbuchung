'use client';

import { useState, useEffect } from 'react';

export default function JobAlertPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  const scrollToJob = () => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById('stellenanzeige-mfa');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-500 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Rotes Band oben */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-white font-bold text-sm tracking-wider uppercase">
              Wir suchen Dich!
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-white/80 transition-colors"
            aria-label="Schließen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Inhalt */}
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="text-5xl mb-4">&#x1F3E5;</div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            MFA gesucht!
          </h2>
          <p className="text-lg text-primary-600 font-semibold mb-3">
            Medizinische Fachangestellte (m/w/d)
          </p>
          <p className="text-gray-600 leading-relaxed mb-2 text-sm">
            Wir suchen dringend Verstärkung für unser Team in der Gefäßmedizin Remscheid.
            Vollzeit oder Teilzeit &ndash; gerne auch Berufseinsteiger!
          </p>
        </div>

        {/* Highlights */}
        <div className="px-6 pb-5">
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-[#2d7a6d] text-lg">&#x2713;</span>
                Keine Nachtdienste
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#2d7a6d] text-lg">&#x2713;</span>
                Moderner Arbeitsplatz
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#2d7a6d] text-lg">&#x2713;</span>
                Familiäres Team
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#2d7a6d] text-lg">&#x2713;</span>
                Weiterbildung
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={scrollToJob}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-base"
            >
              Stellenanzeige ansehen
            </button>
            <a
              href="mailto:info@gefaessmedizinremscheid.de?subject=Bewerbung als MFA"
              className="w-full inline-flex items-center justify-center border-2 border-primary-200 text-primary-700 hover:bg-primary-50 py-3 rounded-xl font-semibold transition-all duration-300 text-sm"
            >
              Direkt per E-Mail bewerben
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
