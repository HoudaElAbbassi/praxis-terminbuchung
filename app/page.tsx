import Image from 'next/image';

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
            <Image
              src="/images/logo.jpeg"
              alt="Praxis für Gefäßmedizin Remscheid"
              width={200}
              height={200}
              className="relative rounded-full opacity-100 shadow-2xl ring-4 ring-white/50 w-40 h-40 sm:w-48 sm:h-48 lg:w-[200px] lg:h-[200px]"
              priority
            />
          </div>
        </div>

        {/* Titel */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-700 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
          Praxis für Gefäßmedizin Remscheid
        </h1>

        {/* Status */}
        <div className="mb-8 inline-block">
          <div className="bg-accent-100 text-accent-800 px-6 py-3 rounded-full font-semibold text-lg border-2 border-accent-300">
            🚧 Website in Bearbeitung
          </div>
        </div>

        <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
          Wir arbeiten derzeit an unserer neuen Website. In der Zwischenzeit erreichen Sie uns telefonisch oder per E-Mail.
        </p>

        {/* Kontakt Box */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border-2 border-primary-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
            Kontaktieren Sie uns
          </h2>

          <div className="space-y-4 text-left">
            {/* Telefon */}
            <div className="flex items-center p-4 bg-primary-50 rounded-lg">
              <svg className="w-6 h-6 text-primary-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-sm text-gray-600 font-medium">Telefon</p>
                <a href="tel:021916917400" className="text-xl font-bold text-primary-700 hover:text-primary-900">
                  02191 6917400
                </a>
              </div>
            </div>

            {/* Fax */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <svg className="w-6 h-6 text-gray-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <div>
                <p className="text-sm text-gray-600 font-medium">Fax</p>
                <p className="text-lg font-semibold text-gray-700">02191 4694938</p>
              </div>
            </div>

            {/* E-Mail */}
            <div className="flex items-center p-4 bg-accent-50 rounded-lg">
              <svg className="w-6 h-6 text-accent-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm text-gray-600 font-medium">E-Mail</p>
                <a href="mailto:info@praxis-remscheid.de" className="text-lg font-semibold text-accent-700 hover:text-accent-900">
                  info@praxis-remscheid.de
                </a>
              </div>
            </div>

            {/* Adresse */}
            <div className="flex items-center p-4 bg-primary-50 rounded-lg">
              <svg className="w-6 h-6 text-primary-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-600 font-medium">Adresse</p>
                <p className="text-lg font-semibold text-gray-700">Freiheitsstraße 203</p>
                <p className="text-lg font-semibold text-gray-700">42853 Remscheid</p>
              </div>
            </div>
          </div>

          {/* Sprechzeiten */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white">
            <h3 className="font-bold text-lg mb-2">Sprechzeiten</h3>
            <div className="text-sm space-y-1">
              <p>Montag und Mittwoch: 8:00 - 16:00 Uhr</p>
              <p>Dienstag und Donnerstag: 10:00 - 18:00 Uhr</p>
              <p>Freitag: 8:00 - 12:00 Uhr</p>
            </div>
          </div>
        </div>

        {/* Notfall-Info */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-left">
          <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Notfall
          </h3>
          <p className="text-gray-700 mb-3">
            Bei lebensbedrohlichen Zuständen (Herzinfarkt, Schlaganfall, schwere Unfälle, Atemnot):
          </p>
          <div className="space-y-2">
            <a href="tel:112" className="block bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-red-700 transition-colors">
              🚑 Notruf: 112
            </a>
            <a href="tel:116117" className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-blue-700 transition-colors">
              📞 Ärztlicher Bereitschaftsdienst: 116 117
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Praxis für Gefäßmedizin Remscheid
        </p>
      </div>
    </main>
  );
}
