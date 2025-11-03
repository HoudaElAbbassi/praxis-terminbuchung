import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.jpeg"
                alt="Praxis Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-[#2c5f7c]" style={{fontFamily: "'Playfair Display', serif"}}>
                  Praxis für Gefäßmedizin
                </div>
                <div className="text-sm text-gray-600">
                  Remscheid
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium">Über uns</a>
              <a href="#leistungen" className="text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium">Leistungen</a>
              <a href="#kontakt" className="text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium">Kontakt</a>
              <Link href="/auth/login" className="text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#e8f4f2] via-white to-[#f7fafc] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{fontFamily: "'Playfair Display', serif"}}>
              Praxis für Gefäßmedizin <span className="text-[#2c5f7c]">Remscheid</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Facharzt für Gefäßchirurgie und Viszeralchirurgie – Ihre Spezialisten für moderne Gefäß- und Viszeralchirurgie
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/termine/buchen"
                className="btn-primary inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Termin buchen
              </Link>
              <a
                href="#kontakt"
                className="btn-outline inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mehr erfahren
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Über unsere Praxis</h2>
            <p className="section-subtitle">Spezialisierte Chirurgie mit langjähriger Erfahrung</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                Expertise in Gefäß- und Viszeralchirurgie
              </h3>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Unsere Praxis ist spezialisiert auf Gefäßchirurgie und Viszeralchirurgie. Mit langjähriger Erfahrung und modernster medizinischer Ausstattung bieten wir Ihnen eine kompetente Diagnostik und Behandlung von Gefäßerkrankungen sowie Erkrankungen der Bauchorgane.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Wir legen großen Wert auf eine ausführliche Beratung, individuelle Behandlungskonzepte und die enge Zusammenarbeit mit anderen Fachärzten zum Wohle unserer Patienten.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-[#e8f4f2] rounded-lg">
                  <svg className="w-6 h-6 text-[#2c5f7c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900 font-medium">Facharzt für Gefäßchirurgie</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#e8f4f2] rounded-lg">
                  <svg className="w-6 h-6 text-[#2c5f7c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900 font-medium">Facharzt für Viszeralchirurgie</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#e8f4f2] rounded-lg">
                  <svg className="w-6 h-6 text-[#2c5f7c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900 font-medium">Moderne Diagnostik</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#e8f4f2] rounded-lg">
                  <svg className="w-6 h-6 text-[#2c5f7c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900 font-medium">Individuelle Beratung</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
                alt="Chirurgische Praxis"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features/Leistungen Section */}
      <section id="leistungen" className="py-20 bg-[#f7fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Unsere Leistungen</h2>
            <p className="section-subtitle">Umfassende medizinische Versorgung für Ihre Gesundheit</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover:border-[#2c5f7c] border-2 border-transparent transition-all">
              <div className="bg-[#2c5f7c] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all">
                <svg className="w-8 h-8 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                Erstgespräch
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ausführliche Erstuntersuchung und Beratung für neue Patienten. Individuelle Diagnostik und Behandlungsplan.
              </p>
              <div className="text-sm text-gray-500 mb-4">
                Dauer: 45 Minuten
              </div>
              <Link href="/termine/buchen" className="text-[#2c5f7c] font-semibold hover:text-[#1f4459] inline-flex items-center group-hover:gap-2 transition-all">
                Termin buchen
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="card group hover:border-[#2c5f7c] border-2 border-transparent transition-all">
              <div className="bg-[#2c5f7c] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all">
                <svg className="w-8 h-8 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                Standard-Konsultation
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Reguläre Untersuchung und Behandlung. Perfekt für Routineuntersuchungen und Nachkontrollen.
              </p>
              <div className="text-sm text-gray-500 mb-4">
                Dauer: 30 Minuten
              </div>
              <Link href="/termine/buchen" className="text-[#2c5f7c] font-semibold hover:text-[#1f4459] inline-flex items-center group-hover:gap-2 transition-all">
                Termin buchen
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="card group hover:border-[#2c5f7c] border-2 border-transparent transition-all">
              <div className="bg-[#2c5f7c] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all">
                <svg className="w-8 h-8 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                Spezialbehandlung
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Spezielle Untersuchungen und erweiterte Behandlungen. Für komplexe Fälle und Spezialdiagnostik.
              </p>
              <div className="text-sm text-gray-500 mb-4">
                Dauer: 60 Minuten
              </div>
              <Link href="/termine/buchen" className="text-[#2c5f7c] font-semibold hover:text-[#1f4459] inline-flex items-center group-hover:gap-2 transition-all">
                Termin buchen
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2c5f7c] to-[#1f4459]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
            Bereit für Ihren Termin?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Buchen Sie jetzt online – einfach, schnell und unkompliziert
          </p>
          <Link
            href="/termine/buchen"
            className="inline-flex items-center bg-white hover:bg-gray-100 text-[#2c5f7c] px-10 py-5 rounded-lg text-lg font-semibold transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Termin online buchen
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Kontakt & Öffnungszeiten</h2>
            <p className="section-subtitle">Wir sind für Sie da</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-[#f7fafc] rounded-xl hover:shadow-md transition-shadow">
                <div className="bg-[#2c5f7c] bg-opacity-10 rounded-full p-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Öffnungszeiten</h3>
                  <p className="text-gray-600">Montag - Freitag: 08:00 - 16:00 Uhr</p>
                  <p className="text-gray-600">Samstag & Sonntag: Geschlossen</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-[#f7fafc] rounded-xl hover:shadow-md transition-shadow">
                <div className="bg-[#2c5f7c] bg-opacity-10 rounded-full p-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Telefon</h3>
                  <a href="tel:+491234567890" className="text-[#2c5f7c] hover:text-[#1f4459] font-medium">
                    +49 (0) 123 456 789
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-[#f7fafc] rounded-xl hover:shadow-md transition-shadow">
                <div className="bg-[#2c5f7c] bg-opacity-10 rounded-full p-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">E-Mail</h3>
                  <a href="mailto:kontakt@praxis-gefaessmedizin.de" className="text-[#2c5f7c] hover:text-[#1f4459] font-medium">
                    kontakt@praxis-gefaessmedizin.de
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-[#f7fafc] rounded-xl hover:shadow-md transition-shadow">
                <div className="bg-[#2c5f7c] bg-opacity-10 rounded-full p-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#2c5f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Adresse</h3>
                  <p className="text-gray-600">Musterstraße 123</p>
                  <p className="text-gray-600">42853 Remscheid</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#e8f4f2] to-white rounded-2xl p-10 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                Haben Sie Fragen?
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Unser Team steht Ihnen gerne zur Verfügung. Rufen Sie uns an oder buchen Sie direkt online einen Termin.
              </p>
              <Link
                href="/termine/buchen"
                className="btn-primary inline-flex items-center"
              >
                Online-Termin buchen
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                Praxis für Gefäßmedizin
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Ihre Gesundheit ist unsere Priorität. Professionelle medizinische Versorgung mit Herz und modernster Ausstattung.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/termine/buchen" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Termin buchen
                </Link></li>
                <li><Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Patient Login
                </Link></li>
                <li><Link href="/admin" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Admin-Bereich
                </Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Rechtliches</h3>
              <ul className="space-y-3">
                <li><Link href="/impressum" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Impressum
                </Link></li>
                <li><Link href="/datenschutz" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Datenschutzerklärung
                </Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Praxis für Gefäßmedizin Remscheid. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
