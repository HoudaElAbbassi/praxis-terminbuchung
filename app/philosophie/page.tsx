import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function PhilosophiePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                Unsere <span className="text-[#2c5f7c]">Philosophie</span>
              </h1>
              <p className="text-xl text-gray-600">
                Ganzheitliche Gefäßmedizin auf höchstem Niveau
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 lg:p-12 mb-8">
                <h2 className="text-2xl font-bold text-[#2c5f7c] mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                  Vertraut und doch modern – Für Ihre Gesundheit in Remscheid
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Nach Jahren als Ärztlicher Leiter eines MVZ habe ich die Entscheidung getroffen, die Praxis zu übernehmen, um meinen Patientinnen und Patienten eine vertraute Umgebung zu bewahren. In den neuen, modernen Räumen setzen wir auf eine individuelle Betreuung, modernste Diagnostik und eine präventive Herangehensweise.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8" style={{fontFamily: "'Playfair Display', serif"}}>
                  Unsere Philosophie:
                </h3>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#4a9d8f] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Patientenzentrierte Betreuung</strong> – Ihre Gesundheit steht im Mittelpunkt</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#4a9d8f] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Menschliche Nähe und Engagement</strong> – Persönlich und einfühlsam</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#4a9d8f] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Modernste technische Ausstattung</strong> – Präzise Diagnostik und Behandlung</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#4a9d8f] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Aufklärung und Prävention</strong> – Für eine bessere Gefäßgesundheit</span>
                  </li>
                </ul>

                <div className="mt-8 p-6 bg-[#e8f4f2] rounded-lg border-l-4 border-[#2c5f7c]">
                  <p className="text-xl text-[#2c5f7c] font-semibold leading-relaxed italic">
                    „Ich freue mich darauf, meine Patientinnen und Patienten in den neuen Räumen willkommen zu heißen – mit frischem Schwung, neuen Möglichkeiten und gewohntem Engagement."
                  </p>
                </div>
              </div>
            </div>

            {/* Key Values Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gradient-to-br from-[#e8f4f2] to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#2c5f7c] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                  Fachkompetenz
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Jahrelange Erfahrung und kontinuierliche Weiterbildung für höchste medizinische Standards
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f7fafc] to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#2c5f7c] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                  Individuelle Betreuung
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Persönliche Behandlungskonzepte, abgestimmt auf Ihre individuellen Bedürfnisse
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#e8f4f2] to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#2c5f7c] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
                  Moderne Technologie
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Neueste diagnostische und therapeutische Verfahren für optimale Behandlungsergebnisse
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-br from-[#2c5f7c] to-[#1f4459] rounded-2xl p-8 lg:p-12 text-white">
                <h2 className="text-3xl font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Lassen Sie sich von uns beraten
                </h2>
                <p className="text-lg text-gray-100 mb-6">
                  Vereinbaren Sie einen Termin und erleben Sie persönliche Betreuung auf höchstem Niveau
                </p>
                <Link
                  href="/termine/buchen"
                  className="inline-flex items-center justify-center bg-white text-[#2c5f7c] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Jetzt Termin buchen
                </Link>
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
