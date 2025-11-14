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
const FROM_EMAIL = process.env.EMAIL_FROM || 'info@praxis-remscheid.de';
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
                📧 E-Mail: info@praxis-remscheid.de</p>

                <div class="footer">
                  <p>Praxis für Gefäßmedizin Remscheid<br>
                  Dr. med. Abdelkarim Alyandouzi</p>
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
  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: data.patientEmail,
      subject: 'Terminabsage - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .header h1 { color: white; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .appointment-details { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0; }
              .button { display: inline-block; padding: 12px 30px; background: #2c5f7c; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Terminabsage</h1>
              </div>
              <div class="content">
                <p>Sehr geehrte/r ${data.patientName},</p>

                <p>leider müssen wir Ihnen mitteilen, dass der folgende Termin nicht stattfinden kann:</p>

                <div class="appointment-details">
                  <h3 style="color: #dc2626; margin-top: 0;">Abgesagter Termin:</h3>
                  <p><strong>Datum:</strong> ${data.date}</p>
                  <p><strong>Uhrzeit:</strong> ${data.time} Uhr</p>
                  <p><strong>Terminart:</strong> ${data.appointmentType}</p>
                  ${data.reason ? `<p><strong>Grund:</strong> ${data.reason}</p>` : ''}
                </div>

                <p>Bitte vereinbaren Sie einen neuen Termin:</p>
                <ul>
                  <li>Online über unsere Website</li>
                  <li>Telefonisch unter: 02191 6917400</li>
                  <li>Per E-Mail: info@praxis-remscheid.de</li>
                </ul>

                <p>Wir entschuldigen uns für die Unannehmlichkeiten.</p>

                <div class="footer">
                  <p>Praxis für Gefäßmedizin Remscheid<br>
                  Dr. med. Abdelkarim Alyandouzi</p>
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
                  <li>Per E-Mail: info@praxis-remscheid.de</li>
                  <li>Oder buchen Sie online einen anderen Termin</li>
                </ul>

                <p>Wir freuen uns, Sie bald in unserer Praxis begrüßen zu dürfen!</p>

                <div class="footer">
                  <p>Praxis für Gefäßmedizin Remscheid<br>
                  Dr. med. Abdelkarim Alyandouzi<br>
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

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: PRACTICE_EMAIL,
      subject: `Neue Terminanfrage von ${data.patientName}`,
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

                <p><strong>Nächste Schritte:</strong></p>
                <ul>
                  <li>Melden Sie sich im Admin-Dashboard an</li>
                  <li>Prüfen Sie die Terminanfrage</li>
                  <li>Bestätigen oder lehnen Sie den Termin ab</li>
                </ul>

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
    return { success: true };
  } catch (error) {
    console.error('Error sending practice notification:', error);
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
                  Dr. med. Abdelkarim Alyandouzi</p>
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
