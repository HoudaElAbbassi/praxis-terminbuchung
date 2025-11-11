import React from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function LeistungenPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                Unsere <span className="text-[#2c5f7c]">Leistungen</span>
              </h1>
              <p className="text-xl text-gray-600">
                Unsere Schwerpunkte im Bereich Gefäßmedizin
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* 1. Präzise Diagnostik */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#2c5f7c] rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  1. Präzise Diagnostik
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Farbduplexsonographie</h4>
                      <p className="text-gray-600">Hochmoderne Ultraschalltechnologie zur Beurteilung des Blutflusses und der Gefäßstruktur</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">LRR-Messung</h4>
                      <p className="text-gray-600">Laufband- und Ruheregelkreismessung zur genauen Beurteilung der Durchblutungssituation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Venenerkrankungen */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#2c5f7c] rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  2. Venenerkrankungen
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Besenreiser</h4>
                      <p className="text-gray-600">Sichtbare, feine Venen an den Beinen – kosmetisch störend, aber meist harmlos</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Beinschwellungen</h4>
                      <p className="text-gray-600">Zeichen einer Venenschwäche – frühzeitige Behandlung ist wichtig</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Tiefe Venenthrombose</h4>
                      <p className="text-gray-600">Blutgerinnsel in den tiefen Venen – erfordert schnelle Diagnostik und Behandlung</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Chronisch venöse Insuffizienz</h4>
                      <p className="text-gray-600">Dauerhafte Schädigung der Venenklappen mit Folgeerscheinungen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Arterielle Gefäßerkrankungen */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#2c5f7c] rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  3. Arterielle Gefäßerkrankungen
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">pAVK (Schaufensterkrankheit)</h4>
                      <p className="text-gray-600">Schmerzen beim Gehen durch Durchblutungsstörungen in den Beinen</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Carotisstenose</h4>
                      <p className="text-gray-600">Verengung der Halsschlagader – kann zu Schlaganfall führen</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Bauchaortenaneurysma</h4>
                      <p className="text-gray-600">Erweiterung der Bauchschlagader – regelmäßige Kontrolle wichtig</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Aneurysmen der Beinarterien</h4>
                      <p className="text-gray-600">Aussackungen der Beinarterien mit Komplikationsrisiko</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Lymphatische und Fettgewebserkrankungen */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#2c5f7c] rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  4. Lymphatische und Fettgewebserkrankungen
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Lymphödem</h4>
                      <p className="text-gray-600">Flüssigkeitsansammlung durch gestörten Lymphabfluss – erfordert spezialisierte Behandlung</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Lipödem</h4>
                      <p className="text-gray-600">Krankhafte Fettverteilungsstörung mit Schweregefühl und Schmerzen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Ambulante Operationen & minimalinvasive Therapien */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#2c5f7c] rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  5. Ambulante Operationen & minimalinvasive Therapien
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Schonende Verfahren ohne Klinikaufenthalt – Sie sind noch am selben Tag wieder zu Hause:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Minimalinvasive Krampfadertherapie</h4>
                      <p className="text-gray-600">Moderne kathetergestützte Verfahren ohne große Schnitte</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Schaumverödung (Sklerotherapie)</h4>
                      <p className="text-gray-600">Bei Krampfadern – effektiv und ambulant durchführbar</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#2c5f7c] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Mikrosklerotherapie bei Besenreisern</h4>
                      <p className="text-gray-600">Verödung feiner Hautvenen für ein schöneres Hautbild</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Patienteninformation & Prävention */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-[#2c5f7c] rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  6. Patienteninformation & Prävention
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Individuelle Betreuung, Aufklärung und Vorsorge – wir legen großen Wert auf Aufklärung, um das Bewusstsein für Gefäßgesundheit zu stärken. Unsere Angebote helfen Ihnen, Risiken frühzeitig zu erkennen und aktiv für Ihre Gesundheit zu sorgen.
                </p>
                <div className="bg-[#e8f4f2] p-6 rounded-lg border-l-4 border-[#2c5f7c]">
                  <p className="text-lg text-[#2c5f7c] font-semibold">
                    Gemeinsam arbeiten wir daran, Ihre Gefäßgesundheit langfristig zu erhalten.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-br from-[#2c5f7c] to-[#1f4459] rounded-2xl p-8 lg:p-12 text-white">
                <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Vereinbaren Sie Ihren Termin
                </h2>
                <p className="text-lg text-gray-100 mb-6">
                  Lassen Sie sich umfassend beraten und profitieren Sie von modernster Gefäßmedizin
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/termine/buchen"
                    className="inline-flex items-center justify-center bg-white text-[#2c5f7c] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Online Termin buchen
                  </Link>
                  <a
                    href="tel:021916917400"
                    className="inline-flex items-center justify-center bg-[#4a9d8f] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#3d8378] transition-all duration-300 shadow-lg hover:shadow-xl"
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
        <footer className="bg-[#2d3748] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Praxis für Gefäßmedizin
                </h3>
                <p className="text-gray-400">
                  Moderne Gefäßmedizin mit Erfahrung, Präzision und Einfühlungsvermögen
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Kontakt
                </h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Tel: 02191 6917400</li>
                  <li>Fax: 02191 4694938</li>
                  <li>Remscheid</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Quick Links
                </h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/philosophie" className="hover:text-white transition-colors">Philosophie</Link></li>
                  <li><Link href="/leistungen" className="hover:text-white transition-colors">Leistungen</Link></li>
                  <li><Link href="/termine/buchen" className="hover:text-white transition-colors">Termin buchen</Link></li>
                  <li><Link href="/auth/login" className="hover:text-white transition-colors">Login</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Praxis für Gefäßmedizin Remscheid. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
