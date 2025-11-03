import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <p className="text-gray-300 text-sm">
              Praxis für Gefäßmedizin Remscheid<br />
              Dr. med. Abdelkarim Alyandouzi<br />
              [Straße und Hausnummer] [BITTE ANPASSEN]<br />
              Ärztehaus Remscheid<br />
              [PLZ] Remscheid [BITTE ANPASSEN]
            </p>
            <p className="text-gray-300 text-sm mt-3">
              Tel: 02191 6917400<br />
              Fax: 02191 4694938<br />
              E-Mail: info@praxis-remscheid.de
            </p>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Öffnungszeiten</h3>
            <p className="text-gray-300 text-sm">
              Termine nach Vereinbarung<br />
              <br />
              Kontaktieren Sie uns telefonisch<br />
              oder nutzen Sie unser<br />
              Online-Buchungssystem
            </p>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/impressum"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Datenschutzerklärung
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Praxis für Gefäßmedizin Remscheid. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
