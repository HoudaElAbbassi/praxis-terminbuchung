import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#e8f4f2] via-[#f0f9f7] to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2c5f7c]/10 to-[#4a9d8f]/10 rounded-full blur-3xl"></div>
                <Image
                  src="/images/logo.jpeg"
                  alt="Praxis für Gefäßmedizin Remscheid"
                  width={300}
                  height={300}
                  className="relative rounded-full opacity-100 hover:scale-105 transition-all duration-500 shadow-2xl ring-4 ring-white/50"
                  priority
                />
              </div>
            </div>

            {/* Willkommenstext */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#2c5f7c] mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Herzlich willkommen in Ihrer Praxis für Gefäßmedizin in Remscheid
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Ich freue mich, Sie in modernen, hellen Räumen begrüßen zu dürfen. Als Facharzt für Gefäßchirurgie und Viszeralchirurgie biete ich eine patientenorientierte und menschlich zugewandte Medizin. Mein Ziel ist es, die Versorgung mit modernster Technik zu verbinden und Ihnen eine vertraute, angenehme Atmosphäre zu bieten.
            </p>
          </div>
        </div>
      </section>

      {/* Teaser Section: Verlinkung zu einzelnen Seiten statt One-Page */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/philosophie" className="p-6 bg-[#e8f4f2] rounded-lg hover:shadow-md">
              <h3 className="text-xl font-bold text-[#2c5f7c] mb-2" style={{fontFamily: "'Playfair Display', serif"}}>Unsere Philosophie</h3>
              <p className="text-gray-700">Ganzheitliche Gefäßmedizin auf höchstem Niveau – erfahren Sie mehr über unser Leitbild und unsere Herangehensweise.</p>
            </Link>

            <Link href="/leistungen" className="p-6 bg-[#f7fafc] rounded-lg hover:shadow-md">
              <h3 className="text-xl font-bold text-[#2c5f7c] mb-2" style={{fontFamily: "'Playfair Display', serif"}}>Unsere Leistungen</h3>
              <p className="text-gray-700">Das gesamte Spektrum der Gefäßmedizin – Diagnostik, Therapie und ambulante Operationen.</p>
            </Link>

            <Link href="/kontakt" className="p-6 bg-[#e8f4f2] rounded-lg hover:shadow-md">
              <h3 className="text-xl font-bold text-[#2c5f7c] mb-2" style={{fontFamily: "'Playfair Display', serif"}}>Kontakt & Anfahrt</h3>
              <p className="text-gray-700">So finden Sie uns – Adressen, Sprechzeiten und Kontaktinformationen.</p>
            </Link>
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
  );
}
