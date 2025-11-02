import Link from "next/link";
import Image from "next/image";

export default function DatenschutzPage() {
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
            <h1 className="text-4xl font-bold text-gray-900">Datenschutzerklärung</h1>
          </div>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Datenschutz auf einen Blick</h2>

              <h3 className="text-lg font-semibold mt-4 mb-2">Allgemeine Hinweise</h3>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
                Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="mb-2"><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
              <p className="mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                können Sie dem Impressum dieser Website entnehmen.
              </p>

              <p className="mb-2"><strong>Wie erfassen wir Ihre Daten?</strong></p>
              <p className="mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um
                Daten handeln, die Sie in ein Kontaktformular oder bei der Terminbuchung eingeben.
              </p>


              <p className="mb-2"><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
              <p className="mb-4">
                Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
                Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
                jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Verantwortlicher</h2>
              <p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
              <p className="mt-2">
                [Praxisname] [BITTE ANPASSEN]<br />
                [Straße und Hausnummer] [BITTE ANPASSEN]<br />
                [PLZ] [Stadt] [BITTE ANPASSEN]<br />
                <br />
                Telefon: [+49 XXX XXXXXX] [BITTE ANPASSEN]<br />
                E-Mail: [kontakt@praxis.de] [BITTE ANPASSEN]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Datenerfassung bei Terminbuchung</h2>
              <p className="mb-4">
                Wenn Sie einen Termin über unsere Website buchen, erheben wir folgende personenbezogene Daten:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Vor- und Nachname</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>Geburtsdatum (optional)</li>
                <li>Adresse (optional)</li>
                <li>Termindetails (Datum, Uhrzeit, Art des Termins)</li>
                <li>Besondere Anmerkungen (optional)</li>
              </ul>
              <p className="mb-4">
                <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
                zur Durchführung vorvertraglicher Maßnahmen und zur Vertragserfüllung.
              </p>
              <p className="mb-4">
                <strong>Speicherdauer:</strong> Ihre Daten werden für die Dauer der Behandlung sowie gemäß den
                gesetzlichen Aufbewahrungsfristen (in der Regel 10 Jahre nach Abschluss der Behandlung) gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
              <p className="mb-4">
                Diese Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät
                speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher zu machen.
              </p>
              <p className="mb-4">
                Wir verwenden ausschließlich technisch notwendige Cookies für:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Session-Verwaltung (Anmeldung)</li>
                <li>Sicherheitsfeatures</li>
              </ul>
              <p className="mb-4">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                Funktionsfähigkeit der Website)
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
                Cookies nur im Einzelfall erlauben.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Kontaktformular und E-Mail</h2>
              <p className="mb-4">
                Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden Ihre Angaben inklusive der
                von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei uns gespeichert.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                Bearbeitung von Anfragen)
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Ihre Rechte</h2>
              <p className="mb-4">Sie haben folgende Rechte:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Auskunft:</strong> Sie haben das Recht, Auskunft über Ihre bei uns gespeicherten
                  personenbezogenen Daten zu erhalten (Art. 15 DSGVO).
                </li>
                <li>
                  <strong>Berichtigung:</strong> Sie haben das Recht, die Berichtigung unrichtiger oder
                  Vervollständigung unvollständiger Daten zu verlangen (Art. 16 DSGVO).
                </li>
                <li>
                  <strong>Löschung:</strong> Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu
                  verlangen (Art. 17 DSGVO).
                </li>
                <li>
                  <strong>Einschränkung der Verarbeitung:</strong> Sie haben das Recht, die Einschränkung der
                  Verarbeitung Ihrer personenbezogenen Daten zu verlangen (Art. 18 DSGVO).
                </li>
                <li>
                  <strong>Datenübertragbarkeit:</strong> Sie haben das Recht, Ihre Daten in einem strukturierten,
                  gängigen und maschinenlesbaren Format zu erhalten (Art. 20 DSGVO).
                </li>
                <li>
                  <strong>Widerspruch:</strong> Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten
                  zu widersprechen (Art. 21 DSGVO).
                </li>
                <li>
                  <strong>Beschwerde:</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Datensicherheit</h2>
              <p className="mb-4">
                Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in
                Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird.
              </p>
              <p className="mb-4">
                Im Übrigen sichern wir unsere Website und sonstigen Systeme durch technische und organisatorische
                Maßnahmen gegen Verlust, Zerstörung, Zugriff, Veränderung oder Verbreitung Ihrer Daten durch
                unbefugte Personen ab.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand {new Date().toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                })}.
              </p>
              <p className="mt-2">
                Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher
                beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-300 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Wichtiger Hinweis:</strong> Diese Datenschutzerklärung ist eine Vorlage und muss an Ihre
                spezifischen Gegebenheiten angepasst werden. Konsultieren Sie einen Datenschutzbeauftragten oder
                Rechtsanwalt für eine rechtsverbindliche Datenschutzerklärung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
