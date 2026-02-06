import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JobAlertPopup from './JobAlertPopup';

export const metadata = {
  title: 'Karriere - Praxis für Gefäßmedizin Remscheid',
  description: 'Stellenangebote und Karrieremöglichkeiten in der Praxis für Gefäßmedizin Remscheid. Werden Sie Teil unseres Teams!',
};

export default function KarrierePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <JobAlertPopup />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary-700 to-primary-800 text-white py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Dezentes Muster */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4a9d8f] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/70 uppercase tracking-widest text-sm font-semibold mb-4">
            Karriere
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Werden Sie Teil <br className="hidden sm:block" />unseres Teams
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
            Wir suchen engagierte Mitarbeiter, die mit uns gemeinsam eine
            patientenorientierte und moderne Gefäßmedizin gestalten.
          </p>
        </div>
      </section>

      {/* Vorteile */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Warum bei uns arbeiten?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Eine Praxis, in der man gerne zur Arbeit kommt.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Familiäres Team</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kollegiales Miteinander mit flachen Hierarchien und Wertschätzung
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#e8f4f2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4a9d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Geregelte Zeiten</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Keine Nacht-, Wochenend- oder Feiertagsdienste
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Weiterbildung</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Regelmäßige Fort- und Weiterbildungsmöglichkeiten
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#e8f4f2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4a9d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Moderne Technik</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Neueste Geräte und digitale Praxisausstattung
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Faire Vergütung</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Attraktive, leistungsgerechte Bezahlung
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#e8f4f2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4a9d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Gute Lage</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Zentral gelegen mit guter ÖPNV-Anbindung
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stellenanzeige MFA */}
      <section id="stellenanzeige-mfa" className="py-16 sm:py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header der Anzeige */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Top-Banner */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 sm:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="text-white font-bold text-sm tracking-wider uppercase">
                  Dringend gesucht
                </span>
              </div>
              <span className="text-white text-sm hidden sm:block">Vollzeit / Teilzeit</span>
            </div>

            {/* Titel */}
            <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-gray-100">
              <h2
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Medizinische Fachangestellte (m/w/d)
              </h2>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Remscheid
                </span>
                <span className="inline-flex items-center gap-1.5 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vollzeit oder Teilzeit
                </span>
                <span className="inline-flex items-center gap-1.5 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Ab sofort
                </span>
              </div>
            </div>

            {/* Inhalt */}
            <div className="px-6 sm:px-8 py-8 space-y-10">

              {/* Aufgaben */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </span>
                  Ihre Aufgaben
                </h3>
                <ul className="space-y-3 text-gray-600 leading-relaxed pl-1">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a9d8f] mt-2.5 flex-shrink-0"></span>
                    Patientenempfang und -betreuung
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a9d8f] mt-2.5 flex-shrink-0"></span>
                    Assistenz bei gefäßmedizinischen Untersuchungen
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a9d8f] mt-2.5 flex-shrink-0"></span>
                    Durchführung von Duplexsonographien (Einarbeitung möglich)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a9d8f] mt-2.5 flex-shrink-0"></span>
                    Terminplanung und Praxisorganisation
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a9d8f] mt-2.5 flex-shrink-0"></span>
                    Dokumentation und Abrechnung (EBM / GOÄ)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a9d8f] mt-2.5 flex-shrink-0"></span>
                    Wundversorgung und Verbandswechsel
                  </li>
                </ul>
              </div>

              {/* Profil */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#e8f4f2] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#4a9d8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  Ihr Profil
                </h3>
                <ul className="space-y-3 text-gray-600 leading-relaxed pl-1">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"></span>
                    Abgeschlossene Ausbildung als MFA oder vergleichbar
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"></span>
                    Freundliches und empathisches Auftreten
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"></span>
                    Teamfähigkeit und Zuverlässigkeit
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"></span>
                    Organisationstalent und eigenverantwortliches Arbeiten
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0"></span>
                    Erfahrung in der Gefäßmedizin von Vorteil, aber nicht erforderlich
                  </li>
                </ul>
              </div>

              {/* Wir bieten */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </span>
                  Das bieten wir Ihnen
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Attraktive Vergütung',
                    'Keine Nacht-/Wochenenddienste',
                    'Fort- und Weiterbildung',
                    'Modernste Technik',
                    'Kleines, herzliches Team',
                    'Gute ÖPNV-Anbindung',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-gray-700">
                      <svg className="w-5 h-5 text-green-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Bereich */}
            <div className="px-6 sm:px-8 pb-8">
              <div className="border-t border-gray-100 pt-8 text-center">
                <h3
                  className="text-xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Interesse geweckt?
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Senden Sie Ihre Bewerbung (Anschreiben, Lebenslauf, Zeugnisse) an:
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
                  <a
                    href="mailto:info@gefaessmedizinremscheid.de?subject=Bewerbung als MFA"
                    className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-base"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Per E-Mail bewerben
                  </a>
                  <a
                    href="tel:021916917400"
                    className="inline-flex items-center justify-center border-2 border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-base"
                  >
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    02191 6917400
                  </a>
                </div>

                <p className="text-xs text-gray-600">
                  Praxis für Gefäßmedizin &middot; Freiheitsstraße 203 &middot; 42853 Remscheid
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiativbewerbung */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3
            className="text-2xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Initiativbewerbung
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
            Auch wenn aktuell keine passende Stelle ausgeschrieben ist &ndash;
            wir freuen uns immer über Bewerbungen von motivierten Menschen.
          </p>
          <a
            href="mailto:info@gefaessmedizinremscheid.de?subject=Initiativbewerbung"
            className="inline-flex items-center justify-center bg-[#4a9d8f] hover:bg-[#3d8378] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-base"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Initiativbewerbung senden
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
