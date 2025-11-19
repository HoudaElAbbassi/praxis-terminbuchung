import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function DatenschutzPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2" style={{fontFamily: "'Playfair Display', serif"}}>
                <span className="text-primary-600">Datenschutz</span>erklärung
              </h1>
              <p className="text-lg sm:text-xl text-gray-800 font-medium px-2">
                Informationen zum Datenschutz gemäß DSGVO
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12">

              <div className="space-y-8 text-gray-800">

                {/* Einleitung */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    1. Datenschutz auf einen Blick
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Allgemeine Hinweise</h3>
                  <p className="mb-4 leading-relaxed">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                    passiert, wenn Sie unsere Website besuchen oder unsere Dienste nutzen. Personenbezogene Daten sind alle
                    Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Datenerfassung auf dieser Website</h3>
                  <div className="mb-4">
                    <p className="font-semibold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
                    <p className="mb-4 leading-relaxed">
                      Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                      können Sie dem Abschnitt „Verantwortlicher" in dieser Datenschutzerklärung entnehmen.
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold mb-2">Wie erfassen wir Ihre Daten?</p>
                    <p className="mb-4 leading-relaxed">
                      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
                      Daten handeln, die Sie bei der Online-Terminbuchung oder in ein Kontaktformular eingeben.
                    </p>
                    <p className="mb-4 leading-relaxed">
                      Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                      IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
                      Uhrzeit des Seitenaufrufs).
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold mb-2">Wofür nutzen wir Ihre Daten?</p>
                    <p className="mb-4 leading-relaxed">
                      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                      Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Die im Rahmen der
                      Terminbuchung erhobenen Daten dienen der Terminverwaltung und der medizinischen Versorgung.
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
                    <p className="mb-4 leading-relaxed">
                      Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                      gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
                      oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
                      können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                      bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                      Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                    </p>
                  </div>
                </section>

                {/* Verantwortlicher */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    2. Verantwortlicher
                  </h2>
                  <p className="mb-2 font-semibold">Verantwortlicher im Sinne der Datenschutz-Grundverordnung:</p>
                  <div className="bg-primary-50 p-6 rounded-lg border-l-4 border-primary-500 mb-4">
                    <p className="font-semibold">Praxis für Gefäßmedizin Remscheid</p>
                    <p>Abdelkarim Alyandouzi</p>
                    <p>Ärztehaus Remscheid</p>
                    <p>Remscheid</p>
                    <p className="mt-3">
                      <strong>Telefon:</strong> 02191 6917400<br />
                      <strong>Fax:</strong> 02191 4694938<br />
                      <strong>E-Mail:</strong> info@praxis-remscheid.de
                    </p>
                  </div>
                  <p className="leading-relaxed">
                    Verantwortlich ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über
                    die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
                  </p>
                </section>

                {/* Hosting und SSL */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    3. Hosting und SSL-Verschlüsselung
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">SSL- bzw. TLS-Verschlüsselung</h3>
                  <p className="mb-4 leading-relaxed">
                    Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum
                    Beispiel Terminanfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung.
                    Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf
                    „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln,
                    nicht von Dritten mitgelesen werden.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Externes Hosting</h3>
                  <p className="mb-4 leading-relaxed">
                    Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                    werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen,
                    Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe
                    und sonstige Daten, die über eine Website generiert werden, handeln.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
                    bestehenden Patienten (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
                    effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter
                    (Art. 6 Abs. 1 lit. f DSGVO).
                  </p>
                </section>

                {/* Datenerfassung auf der Website */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    4. Datenerfassung auf dieser Website
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Server-Log-Dateien</h3>
                  <p className="mb-4 leading-relaxed">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
                    die Ihr Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                  <p className="mb-4 leading-relaxed">
                    Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser
                    Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes
                    Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Online-Terminbuchung</h3>
                  <p className="mb-4 leading-relaxed">
                    Wenn Sie über unsere Website einen Termin buchen, werden die von Ihnen eingegebenen Daten zur
                    Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
                    wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Folgende Daten werden im Rahmen der Terminbuchung erfasst:
                  </p>
                  <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                    <li>Vor- und Nachname</li>
                    <li>E-Mail-Adresse</li>
                    <li>Telefonnummer</li>
                    <li>Adresse</li>
                    <li>Geburtsdatum (optional)</li>
                    <li>Versicherungsart</li>
                    <li>Besuchsart (Erst- oder Folgetermin)</li>
                    <li>Grund des Besuchs</li>
                    <li>Zeitpräferenzen</li>
                    <li>Zusätzliche Notizen/Anliegen</li>
                  </ul>
                  <p className="mb-4 leading-relaxed">
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO, sofern Sie Ihre
                    Einwilligung erteilt haben (Datenschutz-Checkbox). Die Einwilligung können Sie jederzeit widerrufen.
                    Die von Ihnen im Buchungsformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
                    auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
                    entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Im Rahmen der medizinischen Behandlung unterliegen wir zudem den besonderen Bestimmungen der ärztlichen
                    Schweigepflicht gemäß § 203 StGB sowie den Aufbewahrungspflichten nach § 630f BGB (10 Jahre).
                  </p>
                </section>

                {/* Cookies */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    5. Cookies
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf
                    Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
                    (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies
                    werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät
                    gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies).
                    Cookies werden für die Bereitstellung der Website-Funktionen benötigt (z. B. für die Terminbuchung) und
                    zur Analyse des Nutzerverhaltens.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung
                    bestimmter, von Ihnen erwünschter Funktionen erforderlich sind, werden auf Grundlage von
                    Art. 6 Abs. 1 lit. f DSGVO gespeichert. Wir haben ein berechtigtes Interesse an der Speicherung von
                    notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung unserer Dienste.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
                    Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
                    ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
                  </p>
                </section>

                {/* Ihre Rechte */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    6. Ihre Rechte als betroffene Person
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Auskunft, Berichtigung und Löschung</h3>
                  <p className="mb-4 leading-relaxed">
                    Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                    Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
                    der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
                  <p className="mb-4 leading-relaxed">
                    Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
                  <p className="mb-4 leading-relaxed">
                    Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
                    automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
                    aushändigen zu lassen.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Widerspruchsrecht</h3>
                  <p className="mb-4 leading-relaxed">
                    Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs. 1 lit. f
                    DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung
                    Ihrer personenbezogenen Daten einzulegen, soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen
                    Situation ergeben.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Beschwerderecht bei der Aufsichtsbehörde</h3>
                  <p className="mb-4 leading-relaxed">
                    Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                    Aufsichtsbehörde zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
                    gerichtlicher Rechtsbehelfe.
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg mb-4">
                    <p className="font-semibold mb-2">Zuständige Aufsichtsbehörde:</p>
                    <p>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</p>
                    <p>Kavalleriestraße 2-4</p>
                    <p>40213 Düsseldorf</p>
                    <p className="mt-2">
                      <strong>Telefon:</strong> 0211 38424-0<br />
                      <strong>E-Mail:</strong> poststelle@ldi.nrw.de<br />
                      <strong>Website:</strong> <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">www.ldi.nrw.de</a>
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Recht auf Widerruf der Einwilligung</h3>
                  <p className="mb-4 leading-relaxed">
                    Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
                    bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
                    Datenverarbeitung bleibt vom Widerruf unberührt.
                  </p>
                </section>

                {/* Speicherdauer */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    7. Speicherdauer
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
                    Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
                    berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
                    werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung
                    Ihrer personenbezogenen Daten haben.
                  </p>
                  <p className="mb-4 leading-relaxed">
                    Für medizinische Unterlagen gelten besondere gesetzliche Aufbewahrungsfristen von 10 Jahren
                    (§ 630f Abs. 3 BGB). Diese Fristen bleiben von einem Löschersuchen unberührt.
                  </p>
                </section>

                {/* Kontakt */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                    8. Fragen zum Datenschutz
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften,
                    Berichtigung, Sperrung oder Löschung von Daten sowie Widerruf erteilter Einwilligungen wenden Sie sich
                    bitte an:
                  </p>
                  <div className="bg-primary-50 p-6 rounded-lg border-l-4 border-primary-500">
                    <p className="font-semibold">Praxis für Gefäßmedizin Remscheid</p>
                    <p>Abdelkarim Alyandouzi</p>
                    <p className="mt-3">
                      <strong>Telefon:</strong> 02191 6917400<br />
                      <strong>E-Mail:</strong> info@praxis-remscheid.de
                    </p>
                  </div>
                </section>

                {/* Stand */}
                <div className="mt-12 pt-6 border-t border-gray-300">
                  <p className="text-sm text-gray-600">
                    <strong>Stand dieser Datenschutzerklärung:</strong> {new Date().toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
                    Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.
                  </p>
                </div>

              </div>
            </div>

            {/* Zurück Link */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Zurück zur Startseite
              </Link>
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
                  <li>Remscheid</li>
                </ul>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <h3 className="text-base sm:text-lg font-extrabold text-white mb-3 sm:mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Quick Links
                </h3>
                <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-300">
                  <li><Link href="/philosophie" className="hover:text-primary-300 transition-colors">Philosophie</Link></li>
                  <li><Link href="/leistungen" className="hover:text-primary-300 transition-colors">Leistungen</Link></li>
                  <li><Link href="/impressum" className="hover:text-primary-300 transition-colors">Impressum</Link></li>
                  <li><Link href="/datenschutz" className="hover:text-primary-300 transition-colors">Datenschutz</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Praxis für Gefäßmedizin Remscheid. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
