import Link from "next/link";
import Image from "next/image";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück zur Startseite
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/images/logo.jpeg"
              alt="Praxis Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <h1 className="text-4xl font-bold text-gray-900">Impressum</h1>
          </div>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Angaben gemäß § 5 TMG</h2>
              <p className="font-medium text-lg">Praxis für Gefäßmedizin Remscheid</p>
              <p>Inhaber: Abdelkarim Alyandouzi</p>
              <p>Freiheitsstraße 203</p>
              <p>42853 Remscheid</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Kontakt</h2>
              <p>
                <strong>Telefon:</strong> 02191 6917400
              </p>
              <p>
                <strong>Fax:</strong> 02191 4694938
              </p>
              <p>
                <strong>E-Mail:</strong> info@praxis-remscheid.de
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Berufsbezeichnung</h2>
              <p>Facharzt für Gefäßchirurgie</p>
              <p>Facharzt für Viszeralchirurgie</p>
              <p>Verliehen in: Deutschland</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Zuständige Kammer</h2>
              <p>Ärztekammer Nordrhein</p>
              <p>Tersteegenstraße 9</p>
              <p>40474 Düsseldorf</p>
              <p>
                <strong>Website:</strong> <a href="https://www.aekno.de" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.aekno.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Gesetzliche Berufsbezeichnung</h2>
              <p>Arzt/Ärztin (Bundesrepublik Deutschland)</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Berufsrechtliche Regelungen</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Berufsordnung für die deutschen Ärztinnen und Ärzte</li>
                <li>Heilberufsgesetz des jeweiligen Bundeslandes</li>
              </ul>
              <p className="mt-2">
                Die Regelungen finden Sie auf der Website der zuständigen Landesärztekammer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
              </p>
              <p>Auf Anfrage</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Verantwortlich für den Inhalt</h2>
              <p>
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
              </p>
              <p className="mt-2">Abdelkarim Alyandouzi</p>
              <p>Praxis für Gefäßmedizin Remscheid</p>
              <p>Freiheitsstraße 203</p>
              <p>42853 Remscheid</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Haftungsausschluss</h2>

              <h3 className="text-lg font-semibold mt-4 mb-2">Haftung für Inhalte</h3>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Haftung für Links</h3>
              <p className="mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="text-sm text-gray-500">
                Stand: {new Date().toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
