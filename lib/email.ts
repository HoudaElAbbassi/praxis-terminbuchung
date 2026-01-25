import nodemailer from 'nodemailer';

// Create reusable transporter for Strato SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.strato.de',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Default sender email
const FROM_EMAIL = process.env.EMAIL_FROM || 'info@gefaessmedizinremscheid.de';
const FROM_NAME = 'Praxis für Gefäßmedizin Remscheid';

export interface AppointmentEmailData {
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  appointmentType: string;
  doctorName?: string;
  alternativeDate?: string;
  alternativeTime?: string;
  reason?: string;
  appointmentId?: string;
}

/**
 * Send email when appointment is confirmed by doctor
 */
export async function sendAppointmentConfirmedEmail(data: AppointmentEmailData) {
  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.patientEmail,
      subject: 'Terminbestätigung - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #006BA6 0%, #005a8c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .appointment-details { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2c5f7c; margin: 20px 0; }
              .button { display: inline-block; padding: 12px 30px; background: #2c5f7c; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✓ Termin bestätigt</h1>
              </div>
              <div class="content">
                <p>Sehr geehrte/r ${data.patientName},</p>

                <p>wir freuen uns, Ihnen mitteilen zu können, dass Ihr Termin bestätigt wurde:</p>

                <div class="appointment-details">
                  <h3 style="color: #2c5f7c; margin-top: 0;">Termindetails:</h3>
                  <p><strong>Datum:</strong> ${data.date}</p>
                  <p><strong>Uhrzeit:</strong> ${data.time} Uhr</p>
                  <p><strong>Terminart:</strong> ${data.appointmentType}</p>
                  ${data.doctorName ? `<p><strong>Behandelnder Arzt:</strong> ${data.doctorName}</p>` : ''}
                </div>

                <p><strong>Wichtige Hinweise:</strong></p>
                <ul>
                  <li>Bitte erscheinen Sie 10 Minuten vor dem Termin</li>
                  <li>Bringen Sie Ihre Versichertenkarte mit</li>
                  <li>Falls Sie den Termin nicht wahrnehmen können, bitten wir um rechtzeitige Absage</li>
                </ul>

                <p>Bei Fragen erreichen Sie uns unter:</p>
                <p>📞 Telefon: 02191 6917400<br>
                📧 E-Mail: info@gefaessmedizinremscheid.de</p>

                <div class="footer">
                  <p>Praxis für Gefäßmedizin Remscheid<br>
                  Abdelkarim Alyandouzi</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error };
  }
}

/**
 * Send email when appointment is rejected by doctor
 */
export async function sendAppointmentRejectedEmail(data: AppointmentEmailData) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.patientEmail,
      subject: 'Ihre Terminanfrage - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2c5f7c 0%, #4a9d8f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2c5f7c; margin: 20px 0; }
              .button { display: inline-block; padding: 14px 32px; background: #4a9d8f; color: white; text-decoration: none; border-radius: 8px; margin: 10px 5px; font-weight: bold; }
              .button:hover { background: #3d8378; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; border-top: 1px solid #e0e0e0; padding-top: 20px; }
              .contact-info { background: #e8f4f2; padding: 15px; border-radius: 8px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Praxis für Gefäßmedizin Remscheid</h1>
              </div>
              <div class="content">
                <p>Sehr geehrte/r ${data.patientName},</p>

                <p>vielen Dank für Ihre Terminanfrage. Leider können wir den gewünschten Termin nicht wie angefragt bestätigen.</p>

                <div class="info-box">
                  <h3 style="color: #2c5f7c; margin-top: 0;">Ihre Anfrage:</h3>
                  <p><strong>Terminart:</strong> ${data.appointmentType}</p>
                  ${data.date ? `<p><strong>Gewünschtes Datum:</strong> ${data.date}</p>` : ''}
                  ${data.time ? `<p><strong>Gewünschte Uhrzeit:</strong> ${data.time} Uhr</p>` : ''}
                </div>

                <p>Gerne können Sie einen neuen Termin vereinbaren:</p>

                <div style="text-align: center; margin: 25px 0;">
                  <a href="${BASE_URL}/termine/buchen" class="button">Neuen Termin anfragen</a>
                </div>

                <div class="contact-info">
                  <p style="margin: 0;"><strong>Oder kontaktieren Sie uns direkt:</strong></p>
                  <p style="margin: 5px 0;">Telefon: <a href="tel:021916917400" style="color: #2c5f7c;">02191 6917400</a></p>
                  <p style="margin: 5px 0;">E-Mail: <a href="mailto:info@gefaessmedizinremscheid.de" style="color: #2c5f7c;">info@gefaessmedizinremscheid.de</a></p>
                </div>

                <p style="margin-top: 25px;">Wir freuen uns, Sie bald in unserer Praxis begrüßen zu dürfen.</p>

                <p>Mit freundlichen Grüßen,<br>
                <strong>Ihr Praxisteam</strong></p>

                <div class="footer">
                  <p><strong>Praxis für Gefäßmedizin Remscheid</strong><br>
                  Abdelkarim Alyandouzi<br>
                  Freiheitsstraße 203 (3. Etage)<br>
                  42853 Remscheid</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending rejection email:', error);
    return { success: false, error };
  }
}

/**
 * Send email with alternative appointment suggestion
 */
export async function sendAlternativeAppointmentEmail(data: AppointmentEmailData) {
  if (!data.alternativeDate || !data.alternativeTime) {
    throw new Error('Alternative date and time are required');
  }

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.patientEmail,
      subject: 'Alternativvorschlag für Ihren Termin - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #4a9d8f 0%, #2c5f7c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .appointment-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .original { border-left: 4px solid #dc2626; }
              .alternative { border-left: 4px solid #10b981; }
              .button { display: inline-block; padding: 12px 30px; background: #2c5f7c; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📅 Alternativtermin vorgeschlagen</h1>
              </div>
              <div class="content">
                <p>Sehr geehrte/r ${data.patientName},</p>

                <p>Ihr ursprünglich gewünschter Termin konnte leider nicht bestätigt werden. Wir möchten Ihnen jedoch gerne einen Alternativtermin vorschlagen:</p>

                <div class="appointment-box original">
                  <h3 style="color: #dc2626; margin-top: 0;">❌ Ursprünglicher Terminwunsch:</h3>
                  <p><strong>Datum:</strong> ${data.date}</p>
                  <p><strong>Uhrzeit:</strong> ${data.time} Uhr</p>
                </div>

                <div class="appointment-box alternative">
                  <h3 style="color: #10b981; margin-top: 0;">✓ Alternativvorschlag:</h3>
                  <p><strong>Datum:</strong> ${data.alternativeDate}</p>
                  <p><strong>Uhrzeit:</strong> ${data.alternativeTime} Uhr</p>
                  <p><strong>Terminart:</strong> ${data.appointmentType}</p>
                  ${data.reason ? `<p><strong>Hinweis:</strong> ${data.reason}</p>` : ''}
                </div>

                <p><strong>Bitte bestätigen Sie den Alternativtermin:</strong></p>
                <ul>
                  <li>Telefonisch unter: 02191 6917400</li>
                  <li>Per E-Mail: info@gefaessmedizinremscheid.de</li>
                  <li>Oder buchen Sie online einen anderen Termin</li>
                </ul>

                <p>Wir freuen uns, Sie bald in unserer Praxis begrüßen zu dürfen!</p>

                <div class="footer">
                  <p>Praxis für Gefäßmedizin Remscheid<br>
                  Abdelkarim Alyandouzi<br>
                  📞 02191 6917400</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending alternative appointment email:', error);
    return { success: false, error };
  }
}

/**
 * Send email notification to practice staff when new appointment is booked
 */
export async function sendNewAppointmentNotificationToPractice(data: AppointmentEmailData) {
  const PRACTICE_EMAIL = process.env.PRACTICE_EMAIL || 'info@gefaessmedizinremscheid.de';
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  console.log('📧 Sending practice notification to:', PRACTICE_EMAIL);
  console.log('📧 FROM_EMAIL:', FROM_EMAIL);

  // Generiere Quick-Action-Links
  const appointmentUrl = data.appointmentId
    ? `${BASE_URL}/admin?highlight=${data.appointmentId}`
    : `${BASE_URL}/admin`;

  const confirmUrl = data.appointmentId
    ? `${BASE_URL}/admin/quick-actions/confirm?id=${data.appointmentId}`
    : appointmentUrl;

  const alternativeUrl = data.appointmentId
    ? `${BASE_URL}/admin/quick-actions/alternative?id=${data.appointmentId}`
    : appointmentUrl;

  const rejectUrl = data.appointmentId
    ? `${BASE_URL}/admin/quick-actions/reject?id=${data.appointmentId}`
    : appointmentUrl;

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: PRACTICE_EMAIL,
      subject: `🔔 Neue Terminanfrage von ${data.patientName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #006BA6 0%, #005a8c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .appointment-details { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #4a9d8f; margin: 20px 0; }
              .patient-info { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2c5f7c; margin: 20px 0; }
              .action-buttons { margin: 30px 0; text-align: center; }
              .btn { display: inline-block; padding: 14px 28px; margin: 8px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; }
              .btn-confirm { background: #10b981; color: white; }
              .btn-alternative { background: #f59e0b; color: white; }
              .btn-reject { background: #ef4444; color: white; }
              .btn-view { background: #3b82f6; color: white; margin-top: 10px; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔔 Neue Terminanfrage</h1>
              </div>
              <div class="content">
                <p><strong>Es liegt eine neue Terminanfrage vor, die bestätigt werden muss.</strong></p>

                <div class="patient-info">
                  <h3 style="color: #2c5f7c; margin-top: 0;">Patienteninformationen:</h3>
                  <p><strong>Name:</strong> ${data.patientName}</p>
                  <p><strong>E-Mail:</strong> ${data.patientEmail}</p>
                </div>

                <div class="appointment-details">
                  <h3 style="color: #4a9d8f; margin-top: 0;">Terminpräferenzen:</h3>
                  <p><strong>Bevorzugte Tage:</strong> ${data.date}</p>
                  <p><strong>Bevorzugte Uhrzeit:</strong> ${data.time}</p>
                  <p><strong>Terminart:</strong> ${data.appointmentType}</p>
                </div>

                <!-- Quick Action Buttons -->
                <div class="action-buttons">
                  <h3 style="color: #2c5f7c; margin-bottom: 15px;">⚡ Schnellaktionen:</h3>
                  <a href="${confirmUrl}" class="btn btn-confirm">✅ Termin bestätigen</a>
                  <br>
                  <a href="${alternativeUrl}" class="btn btn-alternative">📅 Alternativtermin vorschlagen</a>
                  <br>
                  <a href="${rejectUrl}" class="btn btn-reject">❌ Anfrage ablehnen</a>
                  <br>
                  <a href="${appointmentUrl}" class="btn btn-view">👁️ Details im Dashboard ansehen</a>
                </div>

                <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                  <p style="margin: 0; color: #856404; font-size: 14px;">
                    💡 <strong>Tipp:</strong> Klicken Sie auf einen der Buttons oben, um direkt auf die Terminanfrage zu reagieren. Sie werden automatisch im Admin-Dashboard angemeldet.
                  </p>
                </div>

                <div class="footer">
                  <p>Diese E-Mail wurde automatisch generiert vom Terminbuchungssystem<br>
                  Praxis für Gefäßmedizin Remscheid</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log('✅ Practice notification sent successfully to:', PRACTICE_EMAIL);
    return { success: true };
  } catch (error: any) {
    console.error('❌ Error sending practice notification:', {
      message: error?.message,
      code: error?.code,
      response: error?.response,
      to: PRACTICE_EMAIL,
      from: FROM_EMAIL,
    });
    return { success: false, error };
  }
}

/**
 * Send email notification to patient when new appointment is booked
 */
export async function sendNewAppointmentNotification(data: AppointmentEmailData) {
  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.patientEmail,
      subject: 'Terminanfrage erhalten - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #006BA6 0%, #005a8c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .appointment-details { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #4a9d8f; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📋 Terminanfrage erhalten</h1>
              </div>
              <div class="content">
                <p>Sehr geehrte/r ${data.patientName},</p>

                <p>vielen Dank für Ihre Terminanfrage. Wir haben Ihre Anfrage erhalten und werden diese zeitnah prüfen.</p>

                <div class="appointment-details">
                  <h3 style="color: #4a9d8f; margin-top: 0;">Terminpräferenzen:</h3>
                  <p><strong>Bevorzugte Tage:</strong> ${data.date}</p>
                  <p><strong>Bevorzugte Uhrzeit:</strong> ${data.time}</p>
                  <p><strong>Terminart:</strong> ${data.appointmentType}</p>
                </div>

                <p><strong>Wie geht es weiter?</strong></p>
                <ul>
                  <li>Wir prüfen Ihre Terminanfrage</li>
                  <li>Sie erhalten eine Bestätigung per E-Mail</li>
                  <li>Bei Rückfragen kontaktieren wir Sie telefonisch</li>
                </ul>

                <p>Bei dringenden Fragen erreichen Sie uns unter:</p>
                <p>📞 Telefon: 02191 6917400</p>

                <div class="footer">
                  <p>Praxis für Gefäßmedizin Remscheid<br>
                  Abdelkarim Alyandouzi</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending new appointment notification:', error);
    return { success: false, error };
  }
}

// ============================================
// NEUE E-MAIL-VORLAGEN FÜR TERMINVORSCHLÄGE
// ============================================

interface ProposalEmailData extends AppointmentEmailData {
  token: string;
  baseUrl?: string;
}

/**
 * Sendet Terminvorschlag an Patient
 */
export async function sendAppointmentProposalEmail(data: ProposalEmailData) {
  const { patientName, patientEmail, date, time, appointmentType, token, baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' } = data;

  const acceptUrl = `${baseUrl}/termine/antworten/${token}?action=accept`;
  const rejectUrl = `${baseUrl}/termine/antworten/${token}?action=reject`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Praxis für Gefäßmedizin Remscheid <info@gefaessmedizinremscheid.de>',
      to: patientEmail,
      subject: 'Terminvorschlag - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #4a9d8f 0%, #2c5f7c 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">📅 Terminvorschlag</h1>
              </div>

              <!-- Content -->
              <div style="padding: 40px 30px;">
                <p style="font-size: 16px; line-height: 1.6; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r ${patientName},
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #2d3748; margin-bottom: 30px;">
                  wir haben Ihre Terminanfrage erhalten und möchten Ihnen folgenden Termin vorschlagen:
                </p>

                <!-- Vorschlag Box -->
                <div style="background-color: #e8f4f2; border-left: 4px solid #4a9d8f; padding: 20px; margin: 30px 0; border-radius: 4px;">
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #2c5f7c; font-size: 14px; text-transform: uppercase;">Datum:</strong>
                    <p style="margin: 5px 0; font-size: 18px; color: #2d3748; font-weight: bold;">${date}</p>
                  </div>
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #2c5f7c; font-size: 14px; text-transform: uppercase;">Uhrzeit:</strong>
                    <p style="margin: 5px 0; font-size: 18px; color: #2d3748; font-weight: bold;">${time} Uhr</p>
                  </div>
                  <div>
                    <strong style="color: #2c5f7c; font-size: 14px; text-transform: uppercase;">Terminart:</strong>
                    <p style="margin: 5px 0; font-size: 16px; color: #2d3748;">${appointmentType}</p>
                  </div>
                </div>

                <p style="font-size: 16px; line-height: 1.6; color: #2d3748; margin-bottom: 30px;">
                  Bitte teilen Sie uns mit, ob Sie diesen Termin wahrnehmen können:
                </p>

                <!-- Action Buttons -->
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${acceptUrl}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; margin: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    ✅ Termin annehmen
                  </a>
                  <a href="${rejectUrl}" style="display: inline-block; background-color: #6b7280; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; margin: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    ❌ Termin ablehnen
                  </a>
                </div>

                <p style="font-size: 14px; line-height: 1.6; color: #718096; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                  <strong>Wichtig:</strong> Bitte antworten Sie innerhalb von 3 Tagen auf diesen Vorschlag. Falls Sie den Termin nicht wahrnehmen können, geben Sie uns gerne einen Grund an, damit wir Ihnen einen passenden Alternativtermin anbieten können.
                </p>

                <!-- Contact Info -->
                <div style="margin-top: 30px; padding: 20px; background-color: #f7fafc; border-radius: 8px;">
                  <p style="margin: 0; font-size: 14px; color: #4a5568;">
                    <strong>Bei Fragen erreichen Sie uns:</strong><br>
                    📞 Telefon: 02191 123456<br>
                    📧 E-Mail: ${process.env.PRACTICE_EMAIL || 'info@gefaessmedizinremscheid.de'}
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #2d3748; padding: 20px; text-align: center;">
                <p style="color: #cbd5e0; font-size: 12px; margin: 0;">
                  Praxis für Gefäßmedizin Remscheid<br>
                  Diese E-Mail wurde automatisch generiert.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log(`✅ Proposal email sent to ${patientEmail}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending proposal email:', error);
    return { success: false, error };
  }
}

/**
 * Sendet Bestätigung an Patient nach Annahme
 */
export async function sendProposalAcceptanceConfirmation(data: AppointmentEmailData) {
  const { patientName, patientEmail, date, time, appointmentType, doctorName = 'Dr. med. Mustermann' } = data;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Praxis für Gefäßmedizin Remscheid <info@gefaessmedizinremscheid.de>',
      to: patientEmail,
      subject: 'Terminbestätigung - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Termin bestätigt!</h1>
              </div>

              <!-- Content -->
              <div style="padding: 40px 30px;">
                <p style="font-size: 16px; line-height: 1.6; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r ${patientName},
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #2d3748; margin-bottom: 30px;">
                  vielen Dank für Ihre Rückmeldung. Ihr Termin ist hiermit bestätigt:
                </p>

                <!-- Bestätigter Termin -->
                <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #065f46; font-size: 14px; text-transform: uppercase;">Datum:</strong>
                    <p style="margin: 5px 0; font-size: 18px; color: #2d3748; font-weight: bold;">${date}</p>
                  </div>
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #065f46; font-size: 14px; text-transform: uppercase;">Uhrzeit:</strong>
                    <p style="margin: 5px 0; font-size: 18px; color: #2d3748; font-weight: bold;">${time} Uhr</p>
                  </div>
                  <div style="margin-bottom: 15px;">
                    <strong style="color: #065f46; font-size: 14px; text-transform: uppercase;">Terminart:</strong>
                    <p style="margin: 5px 0; font-size: 16px; color: #2d3748;">${appointmentType}</p>
                  </div>
                  <div>
                    <strong style="color: #065f46; font-size: 14px; text-transform: uppercase;">Arzt:</strong>
                    <p style="margin: 5px 0; font-size: 16px; color: #2d3748;">${doctorName}</p>
                  </div>
                </div>

                <!-- Wichtige Hinweise -->
                <div style="background-color: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 4px;">
                  <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 16px;">📋 Wichtige Hinweise:</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px; line-height: 1.8;">
                    <li>Bitte erscheinen Sie 10 Minuten vor Terminbeginn</li>
                    <li>Bringen Sie Ihre Versichertenkarte mit</li>
                    <li>Bei Verspätung oder Verhinderung rufen Sie uns bitte rechtzeitig an</li>
                  </ul>
                </div>

                <!-- Contact Info -->
                <div style="margin-top: 30px; padding: 20px; background-color: #f7fafc; border-radius: 8px;">
                  <p style="margin: 0; font-size: 14px; color: #4a5568;">
                    <strong>Bei Fragen oder Terminabsage:</strong><br>
                    📞 Telefon: 02191 123456<br>
                    📧 E-Mail: ${process.env.PRACTICE_EMAIL || 'info@gefaessmedizinremscheid.de'}
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #2d3748; padding: 20px; text-align: center;">
                <p style="color: #cbd5e0; font-size: 12px; margin: 0;">
                  Praxis für Gefäßmedizin Remscheid<br>
                  Wir freuen uns auf Ihren Besuch!
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log(`✅ Acceptance confirmation sent to ${patientEmail}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending acceptance confirmation:', error);
    return { success: false, error };
  }
}

/**
 * Benachrichtigt Admin über Annahme des Vorschlags
 */
export async function sendProposalAcceptedEmailToAdmin(data: AppointmentEmailData) {
  const { patientName, patientEmail, date, time, appointmentType } = data;
  const adminEmail = process.env.ADMIN_EMAIL || process.env.PRACTICE_EMAIL || 'info@gefaessmedizinremscheid.de';

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Praxis für Gefäßmedizin Remscheid <info@gefaessmedizinremscheid.de>',
      to: adminEmail,
      subject: `✅ Terminvorschlag angenommen - ${patientName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">✅ Terminvorschlag angenommen</h1>
              </div>

              <!-- Content -->
              <div style="padding: 30px;">
                <p style="font-size: 16px; line-height: 1.6; color: #2d3748; margin-bottom: 20px;">
                  <strong>${patientName}</strong> hat den Terminvorschlag angenommen:
                </p>

                <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px;">
                  <p style="margin: 5px 0; color: #2d3748;"><strong>Patient:</strong> ${patientName}</p>
                  <p style="margin: 5px 0; color: #2d3748;"><strong>E-Mail:</strong> ${patientEmail}</p>
                  <p style="margin: 5px 0; color: #2d3748;"><strong>Datum:</strong> ${date}</p>
                  <p style="margin: 5px 0; color: #2d3748;"><strong>Uhrzeit:</strong> ${time} Uhr</p>
                  <p style="margin: 5px 0; color: #2d3748;"><strong>Terminart:</strong> ${appointmentType}</p>
                </div>

                <p style="font-size: 14px; color: #718096; margin-top: 20px;">
                  Der Termin wurde automatisch bestätigt und der Patient wurde benachrichtigt.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log(`✅ Admin notified about accepted proposal for ${patientName}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error };
  }
}

interface RejectionEmailData extends AppointmentEmailData {
  rejectionReason?: string;
}

/**
 * Benachrichtigt Admin über Ablehnung des Vorschlags
 */
export async function sendProposalRejectedEmailToAdmin(data: RejectionEmailData) {
  const { patientName, patientEmail, date, time, appointmentType, rejectionReason } = data;
  const adminEmail = process.env.ADMIN_EMAIL || process.env.PRACTICE_EMAIL || 'info@gefaessmedizinremscheid.de';

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Praxis für Gefäßmedizin Remscheid <info@gefaessmedizinremscheid.de>',
      to: adminEmail,
      subject: `❌ Terminvorschlag abgelehnt - ${patientName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">❌ Terminvorschlag abgelehnt</h1>
              </div>

              <!-- Content -->
              <div style="padding: 30px;">
                <p style="font-size: 16px; line-height: 1.6; color: #2d3748; margin-bottom: 20px;">
                  <strong>${patientName}</strong> hat den Terminvorschlag abgelehnt:
                </p>

                <div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 20px; margin: 20px 0; border-radius: 4px;">
                  <p style="margin: 5px 0; color: #2d3748;"><strong>Patient:</strong> ${patientName}</p>
                  <p style="margin: 5px 0; color: #2d3748;"><strong>E-Mail:</strong> ${patientEmail}</p>
                  <p style="margin: 5px 0; color: #2d3748;"><strong>Abgelehnter Termin:</strong> ${date}, ${time} Uhr</p>
                  <p style="margin: 5px 0; color: #2d3748;"><strong>Terminart:</strong> ${appointmentType}</p>
                </div>

                ${rejectionReason ? `
                <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px;">
                  <p style="margin: 0; color: #92400e;"><strong>Ablehnungsgrund:</strong></p>
                  <p style="margin: 10px 0 0 0; color: #78350f;">${rejectionReason}</p>
                </div>
                ` : ''}

                <p style="font-size: 14px; color: #718096; margin-top: 20px;">
                  Bitte kontaktieren Sie den Patienten oder senden Sie einen neuen Terminvorschlag über das Admin-Dashboard.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log(`✅ Admin notified about rejected proposal for ${patientName}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin rejection notification:', error);
    return { success: false, error };
  }
}

interface ReminderProposal {
  id: string;
  token: string;
  createdAt: Date;
  appointment: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
    appointmentType: {
      name: string;
    };
    urgency?: string | null;
  };
}

/**
 * Sendet Erinnerung an Admin über ausstehende Vorschläge
 */
export async function sendAdminProposalReminder(proposals: ReminderProposal[]) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.PRACTICE_EMAIL || 'info@gefaessmedizinremscheid.de';

  const urgentCount = proposals.filter(p => p.appointment.urgency === 'URGENT').length;
  const normalCount = proposals.filter(p => p.appointment.urgency === 'NORMAL').length;
  const flexibleCount = proposals.filter(p => p.appointment.urgency === 'FLEXIBLE').length;

  const proposalsList = proposals.map(p => {
    const daysSince = Math.floor((Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const urgencyIcon = p.appointment.urgency === 'URGENT' ? '🔴' : p.appointment.urgency === 'FLEXIBLE' ? '🟢' : '🟡';

    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          ${urgencyIcon} ${p.appointment.user.firstName} ${p.appointment.user.lastName}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${p.appointment.appointmentType.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${daysSince} Tage</td>
      </tr>
    `;
  }).join('');

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Praxis für Gefäßmedizin Remscheid <info@gefaessmedizinremscheid.de>',
      to: adminEmail,
      subject: `⏰ Erinnerung: ${proposals.length} ausstehende Terminvorschläge`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">⏰ Ausstehende Terminvorschläge</h1>
              </div>

              <!-- Content -->
              <div style="padding: 30px;">
                <p style="font-size: 16px; line-height: 1.6; color: #2d3748; margin-bottom: 20px;">
                  Sie haben <strong>${proposals.length}</strong> Terminvorschläge, die noch auf eine Antwort warten:
                </p>

                <!-- Statistik -->
                <div style="display: flex; gap: 10px; margin: 20px 0;">
                  <div style="flex: 1; background-color: #fee2e2; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #dc2626;">${urgentCount}</div>
                    <div style="font-size: 12px; color: #991b1b;">🔴 Dringend</div>
                  </div>
                  <div style="flex: 1; background-color: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #d97706;">${normalCount}</div>
                    <div style="font-size: 12px; color: #92400e;">🟡 Normal</div>
                  </div>
                  <div style="flex: 1; background-color: #d1fae5; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #059669;">${flexibleCount}</div>
                    <div style="font-size: 12px; color: #065f46;">🟢 Flexibel</div>
                  </div>
                </div>

                <!-- Liste -->
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <thead>
                    <tr style="background-color: #f7fafc;">
                      <th style="padding: 10px; text-align: left; border-bottom: 2px solid #cbd5e0;">Patient</th>
                      <th style="padding: 10px; text-align: left; border-bottom: 2px solid #cbd5e0;">Terminart</th>
                      <th style="padding: 10px; text-align: left; border-bottom: 2px solid #cbd5e0;">Wartezeit</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${proposalsList}
                  </tbody>
                </table>

                <p style="font-size: 14px; color: #718096; margin-top: 20px;">
                  Bitte prüfen Sie das Admin-Dashboard und kontaktieren Sie die Patienten bei Bedarf.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    console.log(`✅ Admin reminder sent for ${proposals.length} pending proposals`);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin reminder:', error);
    return { success: false, error };
  }
}
