import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function KontaktPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2" style={{fontFamily: "'Playfair Display', serif"}}>
                Kontakt & <span className="text-primary-600">Anfahrt</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-800 font-medium px-2">
                Wir freuen uns auf Ihren Besuch
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8" style={{fontFamily: "'Playfair Display', serif"}}>
                  Kontaktinformationen
                </h2>

                {/* Praxis Name */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Praxis für Gefäßmedizin</h3>
                      <p className="text-primary-600 text-sm sm:text-base font-semibold">Abdelkarim Alyandouzi</p>
                      <p className="text-gray-800 text-sm sm:text-base font-medium">Remscheid</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
                      <a href="tel:021916917400" className="text-primary-600 hover:underline text-base">
                        02191 6917400
                      </a>
                    </div>
                  </div>
                </div>

                {/* Fax */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Fax</h3>
                      <p className="text-gray-700 text-base">02191 4694938</p>
                    </div>
                  </div>
                </div>

                {/* Sprechzeiten */}
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-3">Sprechzeiten</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Montag und Mittwoch:</span>
                          <span className="text-gray-700">8:00 - 15:00 Uhr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Dienstag und Donnerstag:</span>
                          <span className="text-gray-700">10:00 - 17:00 Uhr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Freitag:</span>
                          <span className="text-gray-700">8:00 - 12:00 Uhr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Samstag - Sonntag:</span>
                          <span className="text-gray-700">Geschlossen</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-primary-600">Termine nach Vereinbarung</span> – nutzen Sie gerne unser Online-Buchungssystem
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notfallkontakte */}
                <div className="bg-red-50 rounded-xl shadow-sm border-2 border-red-200 p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 mb-3">Notfall & Wichtige Nummern</h3>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 border border-red-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-900 font-bold text-sm">Notarzt / Feuerwehr</span>
                            <a href="tel:112" className="text-red-600 font-bold text-lg hover:underline">112</a>
                          </div>
                          <p className="text-xs text-gray-600">Bei lebensbedrohlichen Notfällen</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-red-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-900 font-bold text-sm">Ärztlicher Notdienst</span>
                            <a href="tel:116117" className="text-red-600 font-bold text-lg hover:underline">116 117</a>
                          </div>
                          <p className="text-xs text-gray-600">Außerhalb der Praxisöffnungszeiten</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-red-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-900 font-bold text-sm">Terminservice der KV</span>
                            <a href="tel:116117" className="text-primary-600 font-bold text-lg hover:underline">116 117</a>
                          </div>
                          <p className="text-xs text-gray-600">Vermittlung von Facharztterminen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8" style={{fontFamily: "'Playfair Display', serif"}}>
                  Anfahrt
                </h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Adresse</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Freiheitsstraße 203 (3. Etage)<br />
                        42853 Remscheid
                      </p>
                    </div>
                  </div>
                </div>

                {/* Access Info */}
                <div className="mb-6 bg-accent-50 rounded-xl shadow-sm border border-accent-200 p-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-accent-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Wichtiger Hinweis zum Zugang</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Bitte benutzen Sie den <strong>kleinen Aufzug</strong>, um zur Praxis in der 3. Etage im Gebäude zu gelangen. Der große Aufzug führt nicht zu unseren Praxisräumen. Alles ist jedoch entsprechend ausgeschildert.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200" style={{height: '400px'}}>
                  <iframe
                    src="https://maps.google.com/maps?q=51.1789,7.1897&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{border: 0}}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Praxis für Gefäßmedizin Remscheid - Anfahrt"
                  />
                </div>

                {/* Google Business Link */}
                <div className="mt-4">
                  <a
                    href="https://share.google/GfgLHenESWVptI02x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-primary-500 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="font-semibold text-gray-700">Auf Google Maps ansehen</span>
                  </a>
                </div>

                {/* Parking Info */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Parkmöglichkeiten</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Parkplätze befinden sich direkt vor der Praxis. Die Praxis ist barrierefrei zugänglich.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 sm:mt-16">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Vereinbaren Sie jetzt einen Termin
                </h2>
                <p className="text-base sm:text-lg text-primary-50 mb-5 sm:mb-6 px-2">
                  Nutzen Sie unser bequemes Online-Buchungssystem oder rufen Sie uns direkt an
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link
                    href="/termine/buchen"
                    className="inline-flex items-center justify-center bg-accent-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold hover:bg-accent-600 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-accent-500/50 text-base sm:text-lg ring-2 ring-accent-300"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Online Termin buchen
                  </Link>
                  <a
                    href="tel:021916917400"
                    className="inline-flex items-center justify-center bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 border-2 border-white/40 text-sm sm:text-base"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    02191 6917400
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white mb-3 sm:mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Praxis für Gefäßmedizin
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Moderne Gefäßmedizin mit Erfahrung, Präzision und Einfühlungsvermögen
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white mb-3 sm:mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Kontakt
                </h3>
                <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-300">
                  <li>Tel: 02191 6917400</li>
                  <li>Fax: 02191 4694938</li>
                  <li>Freiheitsstraße 203 (3. Etage)</li>
                  <li>42853 Remscheid</li>
                </ul>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <h3 className="text-base sm:text-lg font-extrabold text-white mb-3 sm:mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Quick Links
                </h3>
                <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-300">
                  <li><Link href="/philosophie" className="hover:text-primary-300 transition-colors">Philosophie</Link></li>
                  <li><Link href="/leistungen" className="hover:text-primary-300 transition-colors">Leistungen</Link></li>
                  <li><Link href="/termine/buchen" className="hover:text-primary-300 transition-colors">Termin buchen</Link></li>
                  <li><Link href="/auth/login" className="hover:text-primary-300 transition-colors">Login</Link></li>
                  <li><Link href="/datenschutz" className="hover:text-primary-300 transition-colors">Datenschutz</Link></li>
                  <li><Link href="/impressum" className="hover:text-primary-300 transition-colors">Impressum</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Praxis für Gefäßmedizin Remscheid. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
