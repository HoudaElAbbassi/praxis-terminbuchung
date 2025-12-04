import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function PhilosophiePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2" style={{fontFamily: "'Playfair Display', serif"}}>
                Unsere <span className="text-primary-600">Philosophie</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 font-medium px-2">
                Ganzheitliche Gefäßmedizin auf höchstem Niveau
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-primary-600 mb-4 sm:mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                  Vertraut und doch modern – Für Ihre Gesundheit in Remscheid
                </h2>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6 font-medium">
                  Nach Jahren als Ärztlicher Leiter eines MVZ habe ich die Entscheidung getroffen, die Praxis zu übernehmen, um meinen Patientinnen und Patienten eine vertraute Umgebung zu bewahren. In den neuen, modernen Räumen setzen wir auf eine individuelle Betreuung, modernste Diagnostik und eine präventive Herangehensweise.
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8" style={{fontFamily: "'Playfair Display', serif"}}>
                  Unsere Philosophie:
                </h3>
                <ul className="space-y-3 text-base sm:text-lg text-gray-800">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Patientenzentrierte Betreuung</strong> – Ihre Gesundheit steht im Mittelpunkt</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Menschliche Nähe und Engagement</strong> – Persönlich und einfühlsam</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Modernste technische Ausstattung</strong> – Präzise Diagnostik und Behandlung</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Aufklärung und Prävention</strong> – Für eine bessere Gefäßgesundheit</span>
                  </li>
                </ul>

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-primary-50 rounded-lg border-l-4 border-primary-500">
                  <p className="text-base sm:text-xl text-primary-700 font-semibold leading-relaxed italic">
                    „Ich freue mich darauf, meine Patientinnen und Patienten in den neuen Räumen willkommen zu heißen – mit frischem Schwung, neuen Möglichkeiten und gewohntem Engagement."
                  </p>
                </div>
              </div>
            </div>

            {/* Key Values Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="bg-gradient-to-br from-primary-50 to-white p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                  Fachkompetenz
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  Jahrelange Erfahrung und kontinuierliche Weiterbildung für höchste medizinische Standards
                </p>
              </div>

              <div className="bg-gradient-to-br from-accent-50 to-white p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                  Individuelle Betreuung
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  Persönliche Behandlungskonzepte, abgestimmt auf Ihre individuellen Bedürfnisse
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-white p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                  Moderne Technologie
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  Neueste diagnostische und therapeutische Verfahren für optimale Behandlungsergebnisse
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 sm:mt-16 text-center">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Lassen Sie sich von uns beraten
                </h2>
                <p className="text-base sm:text-lg text-primary-50 mb-5 sm:mb-6 px-2">
                  Vereinbaren Sie einen Termin und erleben Sie persönliche Betreuung auf höchstem Niveau
                </p>
                <Link
                  href="/termine/buchen"
                  className="inline-flex items-center justify-center bg-accent-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold hover:bg-accent-600 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-accent-500/50 text-base sm:text-lg ring-2 ring-accent-300"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Jetzt Termin buchen
                </Link>
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
                  <li>Freiheitsstraße 203</li>
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
