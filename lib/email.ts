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
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const LOGO_URL = `${BASE_URL}/images/logo.jpeg`;

// Gemeinsame E-Mail-Stile für bessere Lesbarkeit
const emailStyles = `
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    line-height: 1.8;
    color: #1a202c;
    margin: 0;
    padding: 0;
    background-color: #f7fafc;
    font-size: 16px;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
  }
  .logo-section {
    background-color: #ffffff;
    padding: 30px;
    text-align: center;
    border-bottom: 3px solid #4a9d8f;
  }
  .logo {
    width: 80px;
    height: 80px;
    border-radius: 12px;
  }
  .header {
    background: linear-gradient(135deg, #2c5f7c 0%, #4a9d8f 100%);
    color: white;
    padding: 30px;
    text-align: center;
  }
  .header h1 {
    color: white;
    margin: 0;
    font-size: 26px;
    font-weight: 600;
  }
  .content {
    background: #ffffff;
    padding: 40px 35px;
  }
  .content p {
    font-size: 16px;
    line-height: 1.8;
    color: #2d3748;
    margin-bottom: 16px;
  }
  .info-box {
    background: #f0fdf4;
    padding: 25px;
    border-radius: 12px;
    border-left: 5px solid #4a9d8f;
    margin: 25px 0;
  }
  .info-box h3 {
    color: #2c5f7c;
    margin: 0 0 15px 0;
    font-size: 18px;
  }
  .info-box p {
    margin: 10px 0;
    font-size: 16px;
  }
  .info-box strong {
    color: #1a202c;
  }
  .button {
    display: inline-block;
    padding: 16px 36px;
    background: #4a9d8f;
    color: white !important;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    margin: 10px 5px;
  }
  .button:hover {
    background: #3d8378;
  }
  .button-secondary {
    background: #6b7280;
  }
  .button-success {
    background: #10b981;
  }
  .button-danger {
    background: #ef4444;
  }
  .contact-box {
    background: #e8f4f2;
    padding: 20px 25px;
    border-radius: 10px;
    margin: 25px 0;
  }
  .contact-box p {
    margin: 8px 0;
    font-size: 15px;
  }
  .footer {
    background: #2d3748;
    padding: 30px;
    text-align: center;
  }
  .footer p {
    color: #cbd5e0;
    font-size: 14px;
    margin: 5px 0;
    line-height: 1.6;
  }
  .divider {
    border-top: 1px solid #e2e8f0;
    margin: 30px 0;
  }
  ul {
    padding-left: 20px;
  }
  ul li {
    font-size: 16px;
    line-height: 2;
    color: #2d3748;
  }
`;

// E-Mail Header mit Logo
const getEmailHeader = (title: string, bgColor: string = 'linear-gradient(135deg, #2c5f7c 0%, #4a9d8f 100%)') => `
  <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 3px solid #4a9d8f;">
    <img src="${LOGO_URL}" alt="Praxis Logo" style="width: 80px; height: 80px; border-radius: 12px;" />
  </div>
  <div style="background: ${bgColor}; color: white; padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 600;">${title}</h1>
  </div>
`;

// E-Mail Footer
const getEmailFooter = () => `
  <div style="background: #2d3748; padding: 30px; text-align: center;">
    <p style="color: #cbd5e0; font-size: 14px; margin: 5px 0; line-height: 1.6;">
      <strong>Praxis für Gefäßmedizin Remscheid</strong><br>
      Abdelkarim Alyandouzi<br>
      Freiheitsstraße 203 (3. Etage), 42853 Remscheid<br><br>
      Tel: 02191 6917400 | E-Mail: info@gefaessmedizinremscheid.de
    </p>
  </div>
`;

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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('✓ Termin bestätigt', 'linear-gradient(135deg, #10b981 0%, #059669 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r <strong>${data.patientName}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  wir freuen uns, Ihnen mitteilen zu können, dass Ihr Termin bestätigt wurde:
                </p>

                <div style="background: #d1fae5; padding: 25px; border-radius: 12px; border-left: 5px solid #10b981; margin: 25px 0;">
                  <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">Ihre Termindetails:</h3>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Datum:</strong> ${data.date}</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Uhrzeit:</strong> ${data.time} Uhr</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${data.appointmentType}</p>
                </div>

                <div style="background: #fff7ed; padding: 20px 25px; border-radius: 10px; border-left: 5px solid #f59e0b; margin: 25px 0;">
                  <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">Wichtige Hinweise:</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #78350f;">
                    <li style="font-size: 15px; line-height: 2;">Bitte erscheinen Sie 10 Minuten vor dem Termin</li>
                    <li style="font-size: 15px; line-height: 2;">Bringen Sie Ihre Versichertenkarte mit</li>
                    <li style="font-size: 15px; line-height: 2;">Bei Verhinderung bitten wir um rechtzeitige Absage</li>
                  </ul>
                </div>

                <div style="background: #e8f4f2; padding: 20px 25px; border-radius: 10px; margin: 25px 0;">
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;"><strong>Bei Fragen erreichen Sie uns:</strong></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">Tel: <a href="tel:021916917400" style="color: #2c5f7c;">02191 6917400</a></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">E-Mail: <a href="mailto:info@gefaessmedizinremscheid.de" style="color: #2c5f7c;">info@gefaessmedizinremscheid.de</a></p>
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748;">
                  Wir freuen uns auf Ihren Besuch!
                </p>
              </div>

              ${getEmailFooter()}
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
 * Send email when an existing/confirmed appointment is cancelled by the practice
 */
export async function sendAppointmentCancelledEmail(data: AppointmentEmailData) {
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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Terminabsage', 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r <strong>${data.patientName}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  leider müssen wir Ihnen mitteilen, dass Ihr Termin abgesagt werden muss. Wir bitten dies zu entschuldigen.
                </p>

                <div style="background: #fee2e2; padding: 25px; border-radius: 12px; border-left: 5px solid #ef4444; margin: 25px 0;">
                  <h3 style="color: #991b1b; margin: 0 0 15px 0; font-size: 18px;">Abgesagter Termin:</h3>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Datum:</strong> ${data.date}</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Uhrzeit:</strong> ${data.time} Uhr</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${data.appointmentType}</p>
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Gerne können Sie einen neuen Termin mit uns vereinbaren:
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${BASE_URL}/termine/buchen" style="display: inline-block; padding: 16px 36px; background: #4a9d8f; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">
                    Neuen Termin anfragen
                  </a>
                </div>

                <div style="background: #e8f4f2; padding: 20px 25px; border-radius: 10px; margin: 25px 0;">
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;"><strong>Oder kontaktieren Sie uns direkt:</strong></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">Tel: <a href="tel:021916917400" style="color: #2c5f7c;">02191 6917400</a></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">E-Mail: <a href="mailto:info@gefaessmedizinremscheid.de" style="color: #2c5f7c;">info@gefaessmedizinremscheid.de</a></p>
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748;">
                  Wir bitten um Ihr Verständnis und freuen uns, Sie bald in unserer Praxis begrüßen zu dürfen.
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-top: 25px;">
                  Mit freundlichen Grüßen,<br>
                  <strong>Ihr Praxisteam</strong>
                </p>
              </div>

              ${getEmailFooter()}
            </div>
          </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending cancellation email:', error);
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
      subject: 'Ihre Terminanfrage - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Praxis für Gefäßmedizin Remscheid')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r <strong>${data.patientName}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  vielen Dank für Ihre Terminanfrage. Leider können wir den gewünschten Termin nicht wie angefragt bestätigen.
                </p>

                <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 5px solid #2c5f7c; margin: 25px 0;">
                  <h3 style="color: #2c5f7c; margin: 0 0 15px 0; font-size: 18px;">Ihre Anfrage:</h3>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${data.appointmentType}</p>
                  ${data.date ? `<p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Bevorzugte Tage:</strong> ${data.date}</p>` : ''}
                  ${data.time ? `<p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Bevorzugte Tageszeit:</strong> ${data.time}</p>` : ''}
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Gerne können Sie einen neuen Termin vereinbaren:
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${BASE_URL}/termine/buchen" style="display: inline-block; padding: 16px 36px; background: #4a9d8f; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">
                    Neuen Termin anfragen
                  </a>
                </div>

                <div style="background: #e8f4f2; padding: 20px 25px; border-radius: 10px; margin: 25px 0;">
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;"><strong>Oder kontaktieren Sie uns direkt:</strong></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">Tel: <a href="tel:021916917400" style="color: #2c5f7c;">02191 6917400</a></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">E-Mail: <a href="mailto:info@gefaessmedizinremscheid.de" style="color: #2c5f7c;">info@gefaessmedizinremscheid.de</a></p>
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748;">
                  Wir freuen uns, Sie bald in unserer Praxis begrüßen zu dürfen.
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-top: 25px;">
                  Mit freundlichen Grüßen,<br>
                  <strong>Ihr Praxisteam</strong>
                </p>
              </div>

              ${getEmailFooter()}
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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Alternativtermin vorgeschlagen', 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r <strong>${data.patientName}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  Ihr ursprünglich gewünschter Termin konnte leider nicht bestätigt werden. Wir möchten Ihnen jedoch gerne einen Alternativtermin vorschlagen:
                </p>

                <div style="background: #fee2e2; padding: 20px 25px; border-radius: 12px; border-left: 5px solid #dc2626; margin: 25px 0;">
                  <h3 style="color: #991b1b; margin: 0 0 12px 0; font-size: 16px;">Ursprünglicher Terminwunsch:</h3>
                  <p style="margin: 8px 0; font-size: 15px; color: #1a202c;"><strong>Datum:</strong> ${data.date}</p>
                  <p style="margin: 8px 0; font-size: 15px; color: #1a202c;"><strong>Uhrzeit:</strong> ${data.time} Uhr</p>
                </div>

                <div style="background: #d1fae5; padding: 25px; border-radius: 12px; border-left: 5px solid #10b981; margin: 25px 0;">
                  <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">✓ Unser Alternativvorschlag:</h3>
                  <p style="margin: 12px 0; font-size: 17px; color: #1a202c;"><strong>Datum:</strong> ${data.alternativeDate}</p>
                  <p style="margin: 12px 0; font-size: 17px; color: #1a202c;"><strong>Uhrzeit:</strong> ${data.alternativeTime} Uhr</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${data.appointmentType}</p>
                  ${data.reason ? `<p style="margin: 12px 0; font-size: 15px; color: #1a202c;"><strong>Hinweis:</strong> ${data.reason}</p>` : ''}
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 15px;">
                  <strong>Bitte bestätigen Sie den Alternativtermin:</strong>
                </p>
                <ul style="padding-left: 20px; margin-bottom: 25px;">
                  <li style="font-size: 15px; line-height: 2; color: #2d3748;">Telefonisch unter: 02191 6917400</li>
                  <li style="font-size: 15px; line-height: 2; color: #2d3748;">Per E-Mail: info@gefaessmedizinremscheid.de</li>
                </ul>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748;">
                  Wir freuen uns, Sie bald in unserer Praxis begrüßen zu dürfen!
                </p>
              </div>

              ${getEmailFooter()}
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
      subject: `Neue Terminanfrage von ${data.patientName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Neue Terminanfrage', 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  <strong>Es liegt eine neue Terminanfrage vor, die bearbeitet werden muss.</strong>
                </p>

                <div style="background: #eff6ff; padding: 25px; border-radius: 12px; border-left: 5px solid #3b82f6; margin: 25px 0;">
                  <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Patienteninformationen:</h3>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Name:</strong> ${data.patientName}</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>E-Mail:</strong> ${data.patientEmail}</p>
                </div>

                <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 5px solid #4a9d8f; margin: 25px 0;">
                  <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">Terminpräferenzen:</h3>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Bevorzugte Tage:</strong> ${data.date}</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Bevorzugte Uhrzeit:</strong> ${data.time}</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${data.appointmentType}</p>
                </div>

                <div style="text-align: center; margin: 35px 0;">
                  <p style="font-size: 16px; color: #2d3748; margin-bottom: 20px;"><strong>Schnellaktionen:</strong></p>
                  <a href="${confirmUrl}" style="display: inline-block; padding: 14px 28px; background: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 8px;">
                    ✓ Bestätigen
                  </a>
                  <a href="${alternativeUrl}" style="display: inline-block; padding: 14px 28px; background: #f59e0b; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 8px;">
                    Alternativ
                  </a>
                  <a href="${rejectUrl}" style="display: inline-block; padding: 14px 28px; background: #ef4444; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 8px;">
                    Ablehnen
                  </a>
                  <br><br>
                  <a href="${appointmentUrl}" style="display: inline-block; padding: 14px 28px; background: #6b7280; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 8px;">
                    Im Dashboard ansehen
                  </a>
                </div>

                <div style="background: #fef3c7; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
                  <p style="margin: 0; font-size: 14px; color: #92400e;">
                    <strong>Tipp:</strong> Klicken Sie auf einen der Buttons, um direkt auf die Terminanfrage zu reagieren.
                  </p>
                </div>
              </div>

              ${getEmailFooter()}
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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Terminanfrage erhalten')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r <strong>${data.patientName}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  vielen Dank für Ihre Terminanfrage. Wir haben diese erhalten und werden sie zeitnah prüfen.
                </p>

                <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 5px solid #4a9d8f; margin: 25px 0;">
                  <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">Ihre Terminpräferenzen:</h3>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Bevorzugte Tage:</strong> ${data.date}</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Bevorzugte Uhrzeit:</strong> ${data.time}</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${data.appointmentType}</p>
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 15px;">
                  <strong>Wie geht es weiter?</strong>
                </p>
                <ul style="padding-left: 20px; margin-bottom: 25px;">
                  <li style="font-size: 15px; line-height: 2; color: #2d3748;">Wir prüfen Ihre Terminanfrage</li>
                  <li style="font-size: 15px; line-height: 2; color: #2d3748;">Sie erhalten zeitnah einen Terminvorschlag per E-Mail</li>
                  <li style="font-size: 15px; line-height: 2; color: #2d3748;">Bei Rückfragen kontaktieren wir Sie telefonisch</li>
                </ul>

                <div style="background: #e8f4f2; padding: 20px 25px; border-radius: 10px; margin: 25px 0;">
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;"><strong>Bei dringenden Fragen erreichen Sie uns:</strong></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">Tel: <a href="tel:021916917400" style="color: #2c5f7c;">02191 6917400</a></p>
                </div>
              </div>

              ${getEmailFooter()}
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
// E-MAIL-VORLAGEN FÜR TERMINVORSCHLÄGE
// ============================================

interface ProposalEmailData extends AppointmentEmailData {
  token: string;
  baseUrl?: string;
}

/**
 * Sendet Terminvorschlag an Patient
 */
export async function sendAppointmentProposalEmail(data: ProposalEmailData) {
  const { patientName, patientEmail, date, time, appointmentType, token, baseUrl = BASE_URL } = data;

  const acceptUrl = `${baseUrl}/termine/antworten/${token}?action=accept`;
  const rejectUrl = `${baseUrl}/termine/antworten/${token}?action=reject`;

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: patientEmail,
      subject: 'Terminvorschlag - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Terminvorschlag', 'linear-gradient(135deg, #4a9d8f 0%, #2c5f7c 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r <strong>${patientName}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  wir haben Ihre Terminanfrage erhalten und möchten Ihnen folgenden Termin vorschlagen:
                </p>

                <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 5px solid #4a9d8f; margin: 25px 0;">
                  <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">Vorgeschlagener Termin:</h3>
                  <p style="margin: 12px 0; font-size: 18px; color: #1a202c;"><strong>Datum:</strong> ${date}</p>
                  <p style="margin: 12px 0; font-size: 18px; color: #1a202c;"><strong>Uhrzeit:</strong> ${time} Uhr</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${appointmentType}</p>
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  Bitte teilen Sie uns mit, ob Sie diesen Termin wahrnehmen können:
                </p>

                <div style="text-align: center; margin: 35px 0;">
                  <a href="${acceptUrl}" style="display: inline-block; padding: 18px 45px; background: #10b981; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 17px; margin: 10px;">
                    ✓ Termin annehmen
                  </a>
                  <br><br>
                  <a href="${rejectUrl}" style="display: inline-block; padding: 18px 45px; background: #6b7280; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 17px; margin: 10px;">
                    Termin ablehnen
                  </a>
                </div>

                <div style="background: #fff7ed; padding: 20px 25px; border-radius: 10px; border-left: 5px solid #f59e0b; margin: 25px 0;">
                  <p style="margin: 0; font-size: 15px; color: #92400e; line-height: 1.7;">
                    <strong>Wichtig:</strong> Bitte antworten Sie innerhalb von 3 Tagen auf diesen Vorschlag. Falls der Termin nicht passt, geben Sie uns gerne einen Grund an, damit wir Ihnen einen besseren Alternativtermin anbieten können.
                  </p>
                </div>

                <div style="background: #e8f4f2; padding: 20px 25px; border-radius: 10px; margin: 25px 0;">
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;"><strong>Bei Fragen erreichen Sie uns:</strong></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">Tel: <a href="tel:021916917400" style="color: #2c5f7c;">02191 6917400</a></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">E-Mail: <a href="mailto:info@gefaessmedizinremscheid.de" style="color: #2c5f7c;">info@gefaessmedizinremscheid.de</a></p>
                </div>
              </div>

              ${getEmailFooter()}
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
  const { patientName, patientEmail, date, time, appointmentType } = data;

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: patientEmail,
      subject: 'Terminbestätigung - Praxis für Gefäßmedizin Remscheid',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('✓ Termin bestätigt!', 'linear-gradient(135deg, #10b981 0%, #059669 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 20px;">
                  Sehr geehrte/r <strong>${patientName}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  vielen Dank für Ihre Rückmeldung. Ihr Termin ist hiermit bestätigt:
                </p>

                <div style="background: #d1fae5; padding: 25px; border-radius: 12px; border-left: 5px solid #10b981; margin: 25px 0;">
                  <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">Ihr bestätigter Termin:</h3>
                  <p style="margin: 12px 0; font-size: 18px; color: #1a202c;"><strong>Datum:</strong> ${date}</p>
                  <p style="margin: 12px 0; font-size: 18px; color: #1a202c;"><strong>Uhrzeit:</strong> ${time} Uhr</p>
                  <p style="margin: 12px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${appointmentType}</p>
                </div>

                <div style="background: #fff7ed; padding: 20px 25px; border-radius: 10px; border-left: 5px solid #f59e0b; margin: 25px 0;">
                  <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">Wichtige Hinweise:</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #78350f;">
                    <li style="font-size: 15px; line-height: 2;">Bitte erscheinen Sie 10 Minuten vor Terminbeginn</li>
                    <li style="font-size: 15px; line-height: 2;">Bringen Sie Ihre Versichertenkarte mit</li>
                    <li style="font-size: 15px; line-height: 2;">Bei Verhinderung rufen Sie uns bitte rechtzeitig an</li>
                  </ul>
                </div>

                <div style="background: #e8f4f2; padding: 20px 25px; border-radius: 10px; margin: 25px 0;">
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;"><strong>Bei Fragen oder Terminabsage:</strong></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">Tel: <a href="tel:021916917400" style="color: #2c5f7c;">02191 6917400</a></p>
                  <p style="margin: 8px 0; font-size: 15px; color: #2d3748;">E-Mail: <a href="mailto:info@gefaessmedizinremscheid.de" style="color: #2c5f7c;">info@gefaessmedizinremscheid.de</a></p>
                </div>

                <p style="font-size: 16px; line-height: 1.8; color: #2d3748;">
                  Wir freuen uns auf Ihren Besuch!
                </p>
              </div>

              ${getEmailFooter()}
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
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: adminEmail,
      subject: `✓ Terminvorschlag angenommen - ${patientName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Terminvorschlag angenommen', 'linear-gradient(135deg, #10b981 0%, #059669 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  <strong>${patientName}</strong> hat den Terminvorschlag angenommen:
                </p>

                <div style="background: #d1fae5; padding: 25px; border-radius: 12px; border-left: 5px solid #10b981; margin: 25px 0;">
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>Patient:</strong> ${patientName}</p>
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>E-Mail:</strong> ${patientEmail}</p>
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>Datum:</strong> ${date}</p>
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>Uhrzeit:</strong> ${time} Uhr</p>
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${appointmentType}</p>
                </div>

                <p style="font-size: 15px; color: #718096; margin-top: 20px;">
                  Der Termin wurde automatisch bestätigt und der Patient wurde benachrichtigt.
                </p>
              </div>

              ${getEmailFooter()}
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
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: adminEmail,
      subject: `Terminvorschlag abgelehnt - ${patientName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Terminvorschlag abgelehnt', 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  <strong>${patientName}</strong> hat den Terminvorschlag abgelehnt:
                </p>

                <div style="background: #fee2e2; padding: 25px; border-radius: 12px; border-left: 5px solid #ef4444; margin: 25px 0;">
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>Patient:</strong> ${patientName}</p>
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>E-Mail:</strong> ${patientEmail}</p>
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>Abgelehnter Termin:</strong> ${date}, ${time} Uhr</p>
                  <p style="margin: 10px 0; font-size: 16px; color: #1a202c;"><strong>Terminart:</strong> ${appointmentType}</p>
                </div>

                ${rejectionReason ? `
                <div style="background: #fef3c7; padding: 20px 25px; border-radius: 10px; border-left: 5px solid #f59e0b; margin: 25px 0;">
                  <p style="margin: 0 0 10px 0; font-size: 16px; color: #92400e;"><strong>Ablehnungsgrund:</strong></p>
                  <p style="margin: 0; font-size: 15px; color: #78350f; line-height: 1.7;">${rejectionReason}</p>
                </div>
                ` : ''}

                <p style="font-size: 15px; color: #718096; margin-top: 20px;">
                  Bitte kontaktieren Sie den Patienten oder senden Sie einen neuen Terminvorschlag über das Admin-Dashboard.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${BASE_URL}/admin" style="display: inline-block; padding: 14px 28px; background: #2c5f7c; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                    Zum Admin-Dashboard
                  </a>
                </div>
              </div>

              ${getEmailFooter()}
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
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 15px;">
          ${urgencyIcon} ${p.appointment.user.firstName} ${p.appointment.user.lastName}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 15px;">${p.appointment.appointmentType.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 15px;">${daysSince} Tage</td>
      </tr>
    `;
  }).join('');

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: adminEmail,
      subject: `Erinnerung: ${proposals.length} ausstehende Terminvorschläge`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7fafc; font-size: 16px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              ${getEmailHeader('Ausstehende Terminvorschläge', 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)')}

              <div style="padding: 40px 35px;">
                <p style="font-size: 17px; line-height: 1.8; color: #2d3748; margin-bottom: 25px;">
                  Sie haben <strong>${proposals.length}</strong> Terminvorschläge, die noch auf eine Antwort warten:
                </p>

                <!-- Statistik -->
                <div style="display: flex; gap: 15px; margin: 25px 0;">
                  <div style="flex: 1; background-color: #fee2e2; padding: 18px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 28px; font-weight: bold; color: #dc2626;">${urgentCount}</div>
                    <div style="font-size: 13px; color: #991b1b; margin-top: 5px;">🔴 Dringend</div>
                  </div>
                  <div style="flex: 1; background-color: #fef3c7; padding: 18px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 28px; font-weight: bold; color: #d97706;">${normalCount}</div>
                    <div style="font-size: 13px; color: #92400e; margin-top: 5px;">🟡 Normal</div>
                  </div>
                  <div style="flex: 1; background-color: #d1fae5; padding: 18px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 28px; font-weight: bold; color: #059669;">${flexibleCount}</div>
                    <div style="font-size: 13px; color: #065f46; margin-top: 5px;">🟢 Flexibel</div>
                  </div>
                </div>

                <!-- Liste -->
                <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
                  <thead>
                    <tr style="background-color: #f7fafc;">
                      <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e0; font-size: 14px; color: #4a5568;">Patient</th>
                      <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e0; font-size: 14px; color: #4a5568;">Terminart</th>
                      <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e0; font-size: 14px; color: #4a5568;">Wartezeit</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${proposalsList}
                  </tbody>
                </table>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${BASE_URL}/admin" style="display: inline-block; padding: 16px 36px; background: #2c5f7c; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">
                    Zum Admin-Dashboard
                  </a>
                </div>

                <p style="font-size: 14px; color: #718096; margin-top: 20px; text-align: center;">
                  Bitte prüfen Sie das Dashboard und kontaktieren Sie die Patienten bei Bedarf.
                </p>
              </div>

              ${getEmailFooter()}
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
