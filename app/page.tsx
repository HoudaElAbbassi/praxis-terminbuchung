import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Willkommen zur Online-Terminbuchung
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Buchen Sie Ihren Termin schnell und einfach online
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/termine/buchen"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Termin buchen
          </Link>
          <Link
            href="/auth/login"
            className="bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Anmelden
          </Link>
          <Link
            href="/admin"
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Admin-Bereich
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">Einfache Buchung</h3>
            <p className="text-gray-600">Wählen Sie bequem Ihren Wunschtermin online aus</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">⏰</div>
            <h3 className="text-lg font-semibold mb-2">24/7 Verfügbar</h3>
            <p className="text-gray-600">Buchen Sie jederzeit, auch außerhalb der Öffnungszeiten</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">✉️</div>
            <h3 className="text-lg font-semibold mb-2">Email-Bestätigung</h3>
            <p className="text-gray-600">Erhalten Sie automatische Bestätigungen und Erinnerungen</p>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Öffnungszeiten: Täglich 8:00 - 16:00 Uhr</p>
        </div>
      </div>
    </main>
  );
}
