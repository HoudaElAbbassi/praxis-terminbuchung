/**
 * Test-Script für Strato SMTP Email-Versand
 *
 * Verwendung:
 * 1. Stelle sicher dass .env korrekt konfiguriert ist
 * 2. Führe aus: npx tsx scripts/test-email.ts
 */

import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testEmail() {
  console.log('🧪 Teste Strato SMTP Email-Versand...\n');

  // Konfiguration anzeigen (ohne Passwort)
  console.log('📋 SMTP-Konfiguration:');
  console.log(`   Host: ${process.env.SMTP_HOST || 'NICHT GESETZT'}`);
  console.log(`   Port: ${process.env.SMTP_PORT || 'NICHT GESETZT'}`);
  console.log(`   User: ${process.env.SMTP_USER || 'NICHT GESETZT'}`);
  console.log(`   Password: ${process.env.SMTP_PASSWORD ? '***' + process.env.SMTP_PASSWORD.slice(-3) : 'NICHT GESETZT'}`);
  console.log(`   From: ${process.env.EMAIL_FROM || 'NICHT GESETZT'}\n`);

  // Validierung
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('❌ Fehler: SMTP_USER oder SMTP_PASSWORD nicht in .env gesetzt!');
    process.exit(1);
  }

  // Erstelle Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.strato.de',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Teste Verbindung
    console.log('🔌 Teste SMTP-Verbindung...');
    await transporter.verify();
    console.log('✅ SMTP-Verbindung erfolgreich!\n');

    // Sende Test-Email
    console.log('📧 Sende Test-Email...');
    const info = await transporter.sendMail({
      from: `Praxis für Gefäßmedizin Remscheid <${process.env.EMAIL_FROM}>`,
      to: process.env.SMTP_USER, // Sendet an sich selbst
      subject: '✅ Test-Email - Strato SMTP funktioniert!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #006BA6 0%, #4a9d8f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f7fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .success { background: #10b981; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">✅ SMTP Test erfolgreich!</h1>
              </div>
              <div class="content">
                <div class="success">
                  <strong>Ihre Strato SMTP-Konfiguration funktioniert einwandfrei!</strong>
                </div>

                <h3>Test-Details:</h3>
                <ul>
                  <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
                  <li><strong>Port:</strong> ${process.env.SMTP_PORT}</li>
                  <li><strong>Absender:</strong> ${process.env.EMAIL_FROM}</li>
                  <li><strong>Zeitstempel:</strong> ${new Date().toLocaleString('de-DE')}</li>
                </ul>

                <p><strong>Was bedeutet das?</strong></p>
                <p>
                  Ihre Terminbuchungs-Emails werden jetzt erfolgreich über Strato versendet:
                </p>
                <ul>
                  <li>✅ Patienten erhalten Terminbestätigungen</li>
                  <li>✅ Praxis erhält Benachrichtigungen über neue Anfragen</li>
                  <li>✅ Alle Email-Funktionen sind aktiviert</li>
                </ul>

                <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
                  Praxis für Gefäßmedizin Remscheid<br>
                  Dr. med. Abdelkarim Alyandouzi
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Test-Email erfolgreich versendet!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Empfänger: ${process.env.SMTP_USER}\n`);
    console.log('🎉 Alles funktioniert! Prüfen Sie Ihr Email-Postfach.\n');

  } catch (error) {
    console.error('\n❌ FEHLER beim Email-Versand:');
    if (error instanceof Error) {
      console.error(`   ${error.message}\n`);

      // Häufige Fehler und Lösungen
      if (error.message.includes('Authentication failed')) {
        console.log('💡 Lösungsvorschläge:');
        console.log('   1. Überprüfen Sie SMTP_USER (vollständige Email-Adresse)');
        console.log('   2. Überprüfen Sie SMTP_PASSWORD');
        console.log('   3. Setzen Sie ggf. ein neues Passwort im Strato Kundencenter');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.log('💡 Lösungsvorschläge:');
        console.log('   1. Prüfen Sie SMTP_HOST und SMTP_PORT');
        console.log('   2. Stellen Sie sicher, dass Port 587 nicht blockiert ist');
        console.log('   3. Versuchen Sie Port 465 mit SMTP_SECURE="true"');
      } else if (error.message.includes('ETIMEDOUT')) {
        console.log('💡 Lösungsvorschläge:');
        console.log('   1. Firewall blockiert eventuell ausgehende SMTP-Verbindungen');
        console.log('   2. Versuchen Sie eine andere Netzwerkverbindung');
      }
    }
    process.exit(1);
  }
}

// Script ausführen
testEmail();
