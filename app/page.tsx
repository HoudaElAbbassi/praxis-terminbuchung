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
          {/* Logo Layout - Links: LogoText, Rechts: Logoklein */}
          <div className="flex items-center justify-between mb-8 lg:mb-12 max-w-full">
            {/* LogoText links */}
            <div className="flex-shrink-0 bg-white/60 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-sm">
              <Image
                src="/images/LogoText.png"
                alt="Praxis für Gefäßmedizin Remscheid"
                width={400}
                height={133}
                className="w-36 sm:w-56 md:w-72 lg:w-80 xl:w-[400px] h-auto hover:scale-105 transition-all duration-300"
                priority
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            {/* Logoklein rechts */}
            <div className="flex-shrink-0">
              <Image
                src="/images/logoklein.jpeg"
                alt="Praxis Logo"
                width={150}
                height={150}
                className="rounded-full shadow-lg ring-2 ring-white/50 w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-[150px] xl:h-[150px] hover:scale-105 transition-all duration-300"
                priority
              />
            </div>
          </div>

          {/* Willkommenstext */}
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-700 mb-4 sm:mb-6 px-2" style={{fontFamily: "'Playfair Display', serif"}}>
              Herzlich willkommen zur Praxis
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

      {/* Bewertungen / Rezensionen */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12" style={{fontFamily: "'Playfair Display', serif"}}>
            Das sagen unsere <span className="text-primary-600">Patienten</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Google Rezension 1 - Swetlana Wank */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  S
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Swetlana Wank</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Herr Alyandouzi und sein Team sind nur zu empfehlen. Sie zeigen sich nicht schlecht gestimmt und sowohl Herr Alyandouzi sowie seine MitarbeiterInnen haben immer ein offenes Ohr! Ich kann nur positives berichten und bin froh zu einen kompetenten Facharzt in Remscheid gefunden zu haben.
              </p>
              <p className="text-xs text-gray-500 mt-3">vor 5 Monaten</p>
            </div>

            {/* Google Rezension 2 - Manuela Guhlke */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  M
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Manuela Guhlke</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Ich hatte heute meinen ersten Termin bei Dr. Abdelkarim Alyandouzi und kann ihn als Facharzt und seine Kolleg*innen nur weiterempfehlen. Untersuchung und Gespräch waren mehr als zufriedenstellend. Ich bin am Empfang mit Freundlichkeit empfangen worden und für die spätere Behandlung hat sich Dr. Alyandouzi sehr viel Zeit genommen.
              </p>
              <p className="text-xs text-gray-500 mt-3">vor einem Jahr</p>
            </div>

            {/* Google Rezension 3 - Marlene O. */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  M
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Marlene O.</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Herr Alyandouzi ist ein wirklich sehr guter Arzt wie man ihn sich wünscht im Gegenteil zu vielen anderen. Er geht auf einen ein und interessiert sich auch wirklich und hilft. Auf jedenfall zu 1000% weiter zu empfehlen. Arzthelferinnen auch super super nett ❤️
              </p>
              <p className="text-xs text-gray-500 mt-3">vor einem Jahr</p>
            </div>

            {/* Google Rezension 4 - Elke Gimpel */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  E
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Elke Gimpel</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Hatte heute meinen ersten Termin bei Hr.Alyandouzi. Habe mich sehr gut behandelt gefühlt. Die Arzthelferinnen sind super nett und freundlich. Durfte sogar ne halbe Stunde vor dem vereinbarten Termin ins Behandlungszimmer. Hr Alyandouzi hat sich viel Zeit für unser Erstgespräch genommen, ein fachlich kompetenter und sehr einfühlsamer Arzt.
              </p>
              <p className="text-xs text-gray-500 mt-3">vor 11 Monaten</p>
            </div>

            {/* Google Rezension 5 - Big Boss */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  B
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Big Boss</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Ein Arzt den man mit gutem Gewissen weiter empfehlen kann
              </p>
              <p className="text-xs text-gray-500 mt-3">vor einem Jahr</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Echte Google-Rezensionen von zufriedenen Patienten
            </p>
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
                <li><Link href="/kontakt" className="hover:text-primary-300 transition-colors">Kontakt</Link></li>
                <li><Link href="/datenschutz" className="hover:text-primary-300 transition-colors">Datenschutz</Link></li>
                <li><Link href="/impressum" className="hover:text-primary-300 transition-colors">Impressum</Link></li>
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
