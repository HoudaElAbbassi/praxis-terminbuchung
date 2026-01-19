import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function LeistungenPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2" style={{fontFamily: "'Playfair Display', serif"}}>
                Unsere <span className="text-primary-600">Leistungen</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 font-medium px-2">
                Unsere Schwerpunkte im Bereich Gefäßmedizin
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* 1. Präzise Diagnostik */}
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  1. Präzise Diagnostik
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Farbduplexsonographie</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Eine exakte Diagnostik ist die Grundlage jeder erfolgreichen Behandlung. In unserer Praxis für Gefäßchirurgie setzen wir daher auf modernste Ultraschalltechnik, insbesondere die Farbduplexsonographie – ein schonendes, strahlenfreies und äußerst präzises Untersuchungsverfahren.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Was ist die Farbduplexsonographie?</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Die Farbduplexsonographie ist eine spezielle Ultraschalluntersuchung, mit der sowohl die Struktur der Blutgefäße als auch der Blutfluss in Echtzeit dargestellt werden können. Durch die farbliche Darstellung der Strömungsrichtung und -geschwindigkeit lassen sich selbst kleinste Veränderungen zuverlässig erkennen.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Wofür wird die Untersuchung eingesetzt?</h4>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Mit der Farbduplexsonographie können unter anderem folgende Gefäßerkrankungen sicher beurteilt werden:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                  <li>Verengungen oder Verschlüsse von Arterien (z. B. bei Durchblutungsstörungen)</li>
                  <li>Erkrankungen der Halsschlagadern (Carotisstenosen)</li>
                  <li>Venenerkrankungen wie Krampfadern oder Thrombosen</li>
                  <li>Veränderungen der Gefäßwand, z. B. Aussackungen (Aneurysmen)</li>
                </ul>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Ihre Vorteile auf einen Blick</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Schmerzfrei und ohne Strahlenbelastung</li>
                  <li>Hohe diagnostische Genauigkeit</li>
                  <li>Unmittelbare Ergebnisse</li>
                  <li>Ambulant durchführbar</li>
                  <li>Ideal zur Verlaufskontrolle</li>
                </ul>
              </div>
            </div>

            {/* 2. Venenerkrankungen */}
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4c0 4 2 6 6 6s6-2 6-6M6 20c0-4 2-6 6-6s6 2 6 6M12 10v4M9 12h6M9 16h6" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  2. Venenerkrankungen
                </h2>
              </div>

              {/* Krampfadern */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Krampfadern (Varizen)</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Krampfadern sind dauerhaft erweiterte, oberflächliche Venen, die häufig an den Beinen auftreten. Sie sind nicht nur ein kosmetisches Problem, sondern können Beschwerden verursachen und langfristig zu Komplikationen führen.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Mögliche Beschwerden:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                  <li>Schwere- oder Spannungsgefühl in den Beinen</li>
                  <li>Beinschwellungen</li>
                  <li>Nächtliche Wadenkrämpfe</li>
                  <li>Hautveränderungen oder Entzündungen</li>
                </ul>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Moderne, schonende Behandlung</h4>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Wir bieten minimalinvasive Therapieverfahren, die ambulant durchgeführt werden können, darunter:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Schaumverödung (Sklerotherapie)</li>
                  <li>Mikrosklerotherapie bei Besenreisern</li>
                </ul>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  Die Behandlung erfolgt individuell, schonend und ohne längeren Ausfall im Alltag.
                </p>
              </div>

              {/* Chronisch venöse Insuffizienz */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Chronisch venöse Insuffizienz (CVI)</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Die chronisch venöse Insuffizienz (CVI) ist eine langfristige Erkrankung des Venensystems, bei der das Blut aus den Beinen nicht mehr ausreichend zum Herzen zurücktransportiert wird. Ursache sind meist geschädigte oder undichte Venenklappen. Dadurch staut sich das Blut in den Beinen – mit zunehmenden Beschwerden und sichtbaren Veränderungen der Haut.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Typische Beschwerden</h4>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Eine CVI entwickelt sich meist schleichend. Häufige Symptome sind:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                  <li>Schwere- und Spannungsgefühl in den Beinen</li>
                  <li>Beinschwellungen, besonders abends</li>
                  <li>Krampfadern</li>
                  <li>Juckreiz, Hautveränderungen oder Verfärbungen</li>
                  <li>In fortgeschrittenen Stadien schlecht heilende Wunden (offenes Bein)</li>
                </ul>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Warum eine frühe Abklärung wichtig ist</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Unbehandelt kann die chronisch venöse Insuffizienz fortschreiten. Eine frühzeitige Diagnostik ermöglicht es, gezielt gegenzusteuern und Komplikationen zu vermeiden.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Moderne Diagnostik für sichere Befunde</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  In unserer Praxis erfolgt die Abklärung mittels Farbduplexsonographie, mit der wir Funktion und Durchgängigkeit der Venen sowie den Blutfluss exakt beurteilen können. So lässt sich das Ausmaß der Erkrankung zuverlässig feststellen und eine individuelle Therapie planen.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Individuelle Behandlung</h4>
                <p className="text-gray-700 leading-relaxed">
                  Unser Ziel ist es, die chronisch venöse Insuffizienz frühzeitig zu erkennen, Beschwerden zu lindern und Ihre Lebensqualität langfristig zu erhalten – mit moderner Medizin, Zeit für Gespräche und einem ganzheitlichen Blick auf Ihre Gefäßgesundheit.
                </p>
              </div>

              {/* Tiefe Venenthrombose */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tiefe Venenthrombose (TVT)</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Eine tiefe Venenthrombose (TVT) entsteht, wenn sich ein Blutgerinnsel in einer tiefen Vene bildet, meist im Bein oder Becken. Dadurch wird der Blutabfluss behindert. Eine TVT ist eine ernstzunehmende Erkrankung, da sich das Gerinnsel lösen und über den Blutstrom in die Lunge wandern kann.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Typische Anzeichen</h4>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Die Beschwerden können unterschiedlich ausgeprägt sein. Häufige Symptome sind:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                  <li>Plötzlich auftretende einseitige Beinschwellung</li>
                  <li>Schmerzen oder Spannungsgefühl im Bein</li>
                  <li>Überwärmung und Rötung der Haut</li>
                  <li>Schweregefühl oder Druckschmerz</li>
                </ul>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Nicht jede Thrombose verursacht deutliche Symptome – daher ist eine frühzeitige Abklärung besonders wichtig.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Sichere Diagnostik mit moderner Technik</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Die wichtigste Untersuchung zur Diagnose einer TVT ist die Farbduplexsonographie. Sie ermöglicht es, den Blutfluss in den tiefen Venen sichtbar zu machen und ein Blutgerinnsel zuverlässig zu erkennen oder auszuschließen.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Unser Anspruch</h4>
                <p className="text-gray-700 leading-relaxed">
                  Wir begleiten Sie von der sicheren Diagnosestellung über die Therapie bis zur Nachsorge. Ziel ist es, Risiken zu minimieren, Beschwerden zu lindern und Folgeschäden wie das postthrombotische Syndrom zu vermeiden.
                </p>
              </div>

              {/* Besenreiser */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Besenreiser</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sichtbare, feine Venen an den Beinen – kosmetisch störend, aber meist harmlos. Behandlung durch Mikrosklerotherapie möglich.
                </p>
              </div>
            </div>

            {/* 3. Arterielle Gefäßerkrankungen */}
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  3. Arterielle Gefäßerkrankungen
                </h2>
              </div>

              {/* pAVK */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Durchblutungsstörungen der Beine (pAVK – „Schaufensterkrankheit")</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Die periphere arterielle Verschlusskrankheit (pAVK) ist eine häufige Gefäßerkrankung, bei der es durch Ablagerungen in den Arterien zu einer verminderten Durchblutung der Beine kommt. Typisch sind Schmerzen beim Gehen, die nach kurzer Pause wieder nachlassen – daher der Begriff „Schaufensterkrankheit".
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Symptome können sein:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                  <li>Schmerzen oder Krämpfe in Waden, Oberschenkeln oder Gesäß</li>
                  <li>Kalte Füße oder Beine</li>
                  <li>Wunden, die schlecht heilen</li>
                  <li>Verminderte Gehstrecke</li>
                </ul>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Unsere Betreuung</h4>
                <p className="text-gray-700 leading-relaxed">
                  In unserer Praxis erfolgt eine präzise Diagnostik mittels Farbduplexsonographie und Durchblutungsmessungen. Auf dieser Basis entwickeln wir ein individuelles Behandlungskonzept, das konservative Maßnahmen, weiterführende Diagnostik ggfs. Therapien umfasst.
                </p>
              </div>

              {/* Carotisstenose */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verengung der Halsschlagader (Carotisstenose)</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Die Halsschlagadern versorgen das Gehirn mit Sauerstoff. Eine Verengung (Carotisstenose) entsteht meist durch Arteriosklerose und kann unbehandelt das Risiko für einen Schlaganfall erhöhen.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Wichtig zu wissen:</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Carotisstenosen verursachen oft lange Zeit keine Beschwerden und werden häufig zufällig entdeckt.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Unsere Diagnostik</h4>
                <p className="text-gray-700 leading-relaxed">
                  Mit hochauflösender Farbduplexsonographie können wir Engstellen frühzeitig erkennen und das individuelle Schlaganfallrisiko einschätzen. Gemeinsam mit Ihnen besprechen wir das weitere Vorgehen – von engmaschiger Kontrolle bis zur weiterführenden Therapie.
                </p>
              </div>

              {/* Bauchaortenaneurysma & Beinarterienaneurysmen */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Bauchaortenaneurysma</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Erweiterung der Bauchschlagader – regelmäßige Kontrolle wichtig
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Aneurysmen der Beinarterien</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Aussackungen der Beinarterien mit Komplikationsrisiko
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Lymphatische und Fettgewebserkrankungen */}
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  4. Lymphatische und Fettgewebserkrankungen
                </h2>
              </div>

              {/* Lymphödem */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lymphödem</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Beim Lymphödem kommt es zu einer Schwellung von Körperregionen, weil der Abfluss der Lymphflüssigkeit gestört ist. Unbehandelt kann dies zu Bewegungseinschränkungen und Hautveränderungen führen.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Unsere Leistungen:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Differenzierte Diagnostik</li>
                  <li>Abgrenzung zu venösen Erkrankungen</li>
                  <li>Individuelle Therapieempfehlungen</li>
                  <li>Langfristige Betreuung</li>
                </ul>
              </div>

              {/* Lipödem */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lipödem</h3>
                <p className="text-gray-700 leading-relaxed">
                  Krankhafte Fettverteilungsstörung mit Schweregefühl und Schmerzen
                </p>
              </div>
            </div>

            {/* 5. Ambulante Operationen & minimalinvasive Therapien */}
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  5. Ambulante Operationen & minimalinvasive Therapien
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ambulante, minimalinvasive Gefäßtherapien</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Viele Gefäßerkrankungen lassen sich heute ambulant und schonend behandeln – ohne Krankenhausaufenthalt.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-2">Vorteile für Sie:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                  <li>Kurze Behandlungsdauer</li>
                  <li>Schnelle Erholung</li>
                  <li>Kein stationärer Aufenthalt</li>
                  <li>Moderne, sichere Verfahren</li>
                </ul>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Unser Ziel ist es, Ihnen eine effektive Behandlung mit möglichst geringer Belastung zu ermöglichen.
                </p>

                <h4 className="font-semibold text-gray-900 mt-6 mb-3">Unsere Behandlungsverfahren:</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Minimalinvasive Krampfadertherapie</h5>
                      <p className="text-gray-700">Moderne kathetergestützte Verfahren ohne große Schnitte</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Schaumverödung (Sklerotherapie)</h5>
                      <p className="text-gray-700">Bei Krampfadern – effektiv und ambulant durchführbar</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Mikrosklerotherapie bei Besenreisern</h5>
                      <p className="text-gray-700">Verödung feiner Hautvenen für ein schöneres Hautbild</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Patienteninformation & Prävention */}
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  6. Patienteninformation & Prävention
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6 font-medium">
                  Individuelle Betreuung, Aufklärung und Vorsorge – wir legen großen Wert auf Aufklärung, um das Bewusstsein für Gefäßgesundheit zu stärken. Unsere Angebote helfen Ihnen, Risiken frühzeitig zu erkennen und aktiv für Ihre Gesundheit zu sorgen.
                </p>
                <div className="bg-primary-50 p-4 sm:p-6 rounded-lg border-l-4 border-primary-500">
                  <p className="text-base sm:text-lg text-primary-700 font-semibold">
                    Gemeinsam arbeiten wir daran, Ihre Gefäßgesundheit langfristig zu erhalten.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 sm:mt-16 text-center">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                  Vereinbaren Sie Ihren Termin
                </h2>
                <p className="text-base sm:text-lg text-primary-50 mb-5 sm:mb-6 px-2">
                  Lassen Sie sich umfassend beraten und profitieren Sie von modernster Gefäßmedizin
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
    </>
  );
}
