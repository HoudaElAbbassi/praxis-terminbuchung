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
              <a href="#philosophie" className="text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium">Philosophie</a>
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
            {/* Großes Logo in der Mitte */}
            <div className="flex justify-center mb-12">
              <Image
                src="/images/logo.jpeg"
                alt="Praxis für Gefäßmedizin Remscheid"
                width={250}
                height={250}
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{fontFamily: "'Playfair Display', serif"}}>
              Praxis für Gefäßmedizin <span className="text-[#2c5f7c]">Remscheid</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-4 leading-relaxed">
              Moderne Gefäßmedizin mit Erfahrung, Präzision und Einfühlungsvermögen
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              In unserer Praxis steht der Mensch im Mittelpunkt
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
                href="#leistungen"
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

      {/* Philosophie Section */}
      <section id="philosophie" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Unsere Philosophie</h2>
            <p className="section-subtitle">Ganzheitliche Gefäßmedizin auf höchstem Niveau</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Willkommen in unserer Praxis für Gefäßmedizin. Unser Leitgedanke ist es, Sie umfassend und individuell zu betreuen – von präventiven Maßnahmen über präzise Diagnostik bis hin zu gezielten therapeutischen Interventionen. Dabei setzen wir auf höchste Fachkompetenz, modernste Technologien und eine patientenorientierte Betreuung.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Wir sind überzeugt, dass die Erhaltung und Wiederherstellung der Gefäßgesundheit die Grundlage für eine hohe Lebensqualität und langfristiges Wohlbefinden bildet. Durch detaillierte Diagnostik erkennen wir Risiken frühzeitig und entwickeln individuelle Behandlungsstrategien, die auf neuesten wissenschaftlichen Erkenntnissen basieren.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Neben der Therapie legen wir großen Wert auf präventive Ansätze und eine verständliche Aufklärung, um unsere Patienten für eine bewusste Gesundheitsvorsorge zu sensibilisieren. Gemeinsam erarbeiten wir präventive Maßnahmen, die in den Alltag integrierbar sind und nachhaltig zur Erhaltung Ihrer Gefäßgesundheit beitragen.
              </p>
              <p className="text-lg text-[#2c5f7c] font-semibold leading-relaxed">
                Ihr Wohlbefinden ist unser Auftrag – heute und in Zukunft.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 bg-[#e8f4f2] rounded-lg">
                <svg className="w-6 h-6 text-[#2c5f7c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Höchste Fachkompetenz</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#e8f4f2] rounded-lg">
                <svg className="w-6 h-6 text-[#2c5f7c]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Modernste Technologie</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#e8f4f2] rounded-lg">
                <svg className="w-6 h-6 text-[#2c5f7c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">Patientenorientiert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen Section */}
      <section id="leistungen" className="py-20 bg-[#f7fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Unsere Leistungen</h2>
            <p className="section-subtitle">Das gesamte Spektrum der Gefäßmedizin</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Diagnostik */}
            <div className="card">
              <div className="w-12 h-12 bg-[#2c5f7c] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                Präzise Diagnostik
              </h3>
              <p className="text-gray-600 mb-4">
                Modernste Verfahren zur exakten Beurteilung Ihrer Gefäße
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Farbduplexsonographie</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>LRR-Messung</span>
                </li>
              </ul>
            </div>

            {/* Venensystem */}
            <div className="card">
              <div className="w-12 h-12 bg-[#4a9d8f] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                Erkrankungen des Venensystems
              </h3>
              <p className="text-gray-600 mb-4">
                Umfassende Betreuung bei allen venösen Erkrankungen
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Besenreiser & Beinschwellungen</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Tiefe Venenthrombose</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Chronisch venöse Insuffizienz</span>
                </li>
              </ul>
            </div>

            {/* Arterielles System */}
            <div className="card">
              <div className="w-12 h-12 bg-[#2c5f7c] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                Arterielles Gefäßsystem
              </h3>
              <p className="text-gray-600 mb-4">
                Arterielle Durchblutungsstörungen erkennen und behandeln
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>pAVK (Schaufensterkrankheit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Carotisstenose</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Aneurysmen</span>
                </li>
              </ul>
            </div>

            {/* Lymphatische Erkrankungen */}
            <div className="card">
              <div className="w-12 h-12 bg-[#4a9d8f] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                Lymphatische Erkrankungen
              </h3>
              <p className="text-gray-600 mb-4">
                Behandlung von Schwellungen und Fettverteilungsstörungen
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Lymphödem</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Lipödem</span>
                </li>
              </ul>
            </div>

            {/* Operationen */}
            <div className="card">
              <div className="w-12 h-12 bg-[#2c5f7c] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                Ambulante Operationen
              </h3>
              <p className="text-gray-600 mb-4">
                Schonende Verfahren ohne Klinikaufenthalt
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Minimalinvasive Krampfadertherapie</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Schaumverödung</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#4a9d8f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Mikrosklerotherapie</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2c5f7c] to-[#1f4459] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
            Vereinbaren Sie jetzt Ihren Termin
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Nutzen Sie unser bequemes Online-Buchungssystem oder rufen Sie uns direkt an
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
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Ihr Weg zu uns</h2>
            <p className="section-subtitle">Zentral gelegen, barrierefrei erreichbar</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="card">
                <h3 className="text-2xl font-bold text-[#2c5f7c] mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                  Dr. med. Abdelkarim Alyandouzi
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p className="font-semibold text-lg">
                    Facharzt für Gefäßchirurgie<br />
                    Facharzt für Viszeralchirurgie
                  </p>

                  <div className="flex items-start gap-3 pt-4">
                    <svg className="w-6 h-6 text-[#4a9d8f] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Telefon</p>
                      <a href="tel:021916917400" className="text-[#2c5f7c] hover:underline">02191 6917400</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#4a9d8f] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Fax</p>
                      <p>02191 4694938</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#4a9d8f] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Adresse</p>
                      <p>Ärztehaus Remscheid<br />Remscheid</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-[#2c5f7c] mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                Sprechzeiten
              </h3>
              <p className="text-gray-600 mb-4">
                Termine nach Vereinbarung. Nutzen Sie unser Online-Buchungssystem oder rufen Sie uns an.
              </p>
              <div className="bg-[#e8f4f2] border-2 border-[#4a9d8f] rounded-lg p-6">
                <p className="text-gray-700 text-center font-semibold">
                  Unsere Praxis befindet sich im Ärztehaus in Remscheid – zentral gelegen, barrierefrei erreichbar und mit modern ausgestatteten Räumen.
                </p>
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
                <li><a href="#philosophie" className="hover:text-white transition-colors">Philosophie</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Leistungen</a></li>
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
  );
}
