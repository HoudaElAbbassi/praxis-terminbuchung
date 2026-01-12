import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo Layout - Links: LogoText, Rechts: Logoklein */}
            <div className="flex items-center justify-between mb-8 lg:mb-12 px-4 sm:px-8">
              {/* LogoText links */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/LogoText.png"
                  alt="Praxis für Gefäßmedizin Remscheid"
                  width={300}
                  height={100}
                  className="w-40 sm:w-56 lg:w-[300px] h-auto hover:scale-105 transition-all duration-300"
                  priority
                />
              </div>

              {/* Logoklein rechts */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/logoklein.jpeg"
                  alt="Praxis Logo"
                  width={120}
                  height={120}
                  className="rounded-full shadow-lg ring-2 ring-white/50 w-20 h-20 sm:w-28 sm:h-28 lg:w-[120px] lg:h-[120px] hover:scale-105 transition-all duration-300"
                  priority
                />
              </div>
            </div>

            {/* Willkommenstext */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-700 mb-4 sm:mb-6 px-2" style={{fontFamily: "'Playfair Display', serif"}}>
              Herzlich willkommen in Ihrer Praxis für Gefäßmedizin in Remscheid
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto px-4 font-medium">
              Ich freue mich, Sie in modernen, hellen Räumen begrüßen zu dürfen. Als Facharzt für Gefäßchirurgie und Viszeralchirurgie biete ich eine patientenorientierte und menschlich zugewandte Medizin. Mein Ziel ist es, die Versorgung mit modernster Technik zu verbinden und Ihnen eine vertraute, angenehme Atmosphäre zu bieten.
            </p>
          </div>
        </div>
      </section>

      {/* Teaser Section: Verlinkung zu einzelnen Seiten statt One-Page */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link href="/philosophie" className="p-6 lg:p-8 bg-primary-50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary-500">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-700 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>Unsere Philosophie</h3>
              <p className="text-gray-800 font-medium leading-relaxed">Ganzheitliche Gefäßmedizin auf höchstem Niveau – erfahren Sie mehr über unser Leitbild und unsere Herangehensweise.</p>
            </Link>

            <Link href="/leistungen" className="p-6 lg:p-8 bg-accent-50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-accent-500">
              <h3 className="text-xl lg:text-2xl font-bold text-accent-700 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>Unsere Leistungen</h3>
              <p className="text-gray-800 font-medium leading-relaxed">Das gesamte Spektrum der Gefäßmedizin – Diagnostik, Therapie und ambulante Operationen.</p>
            </Link>

            <Link href="/kontakt" className="p-6 lg:p-8 bg-primary-50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary-500 sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-700 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>Kontakt & Anfahrt</h3>
              <p className="text-gray-800 font-medium leading-relaxed">So finden Sie uns – Adressen, Sprechzeiten und Kontaktinformationen.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 sm:mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
            Vereinbaren Sie jetzt Ihren Termin
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-primary-50 px-2">
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
  );
}
