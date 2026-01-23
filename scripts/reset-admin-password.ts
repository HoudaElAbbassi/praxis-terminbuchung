import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function resetPassword() {
  // Lese Argumente aus Kommandozeile
  const email = process.argv[2];
  const newPassword = process.argv[3];

  if (!email || !newPassword) {
    console.log("\n❌ Fehler: Email und Passwort erforderlich!");
    console.log("\nVerwendung:");
    console.log("  npx tsx scripts/reset-admin-password.ts <email> <neues-passwort>");
    console.log("\nBeispiel:");
    console.log('  npx tsx scripts/reset-admin-password.ts admin@praxis.de "MeinNeuesPasswort123!"');
    console.log("\n💡 Tipp: Verwenden Sie Anführungszeichen für Passwörter mit Sonderzeichen!\n");
    process.exit(1);
  }

  try {
    console.log("\n🔍 Suche Benutzer...");

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      console.log(`\n❌ Kein Benutzer mit der E-Mail "${email}" gefunden!\n`);

      // Zeige verfügbare Admin-Accounts
      const admins = await prisma.user.findMany({
        where: { role: "ADMIN" },
        select: { email: true, firstName: true, lastName: true },
      });

      if (admins.length > 0) {
        console.log("📋 Verfügbare Admin-Accounts:");
        admins.forEach((admin, index) => {
          console.log(`${index + 1}. ${admin.email} (${admin.firstName} ${admin.lastName})`);
        });
        console.log("");
      }

      process.exit(1);
    }

    console.log(`✓ Benutzer gefunden: ${user.firstName} ${user.lastName}`);
    console.log(`✓ Aktuelle Rolle: ${user.role}`);

    // Passwort hashen
    console.log("\n🔐 Erstelle neues Passwort...");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Passwort aktualisieren und sicherstellen, dass Rolle ADMIN ist
    await prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data: {
        password: hashedPassword,
        role: "ADMIN", // Stelle sicher, dass die Rolle ADMIN ist
      },
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ Passwort erfolgreich geändert!");
    console.log("=".repeat(60));
    console.log("\n📋 NEUE LOGIN-DATEN:");
    console.log(`   E-Mail:   ${email}`);
    console.log(`   Passwort: ${newPassword}`);
    console.log(`   Rolle:    ADMIN`);
    console.log("\n🌐 Login unter: http://localhost:3000/auth/login");
    console.log("\n⚠️  WICHTIG: Notieren Sie sich diese Daten!\n");

  } catch (error) {
    console.error("\n❌ Fehler beim Zurücksetzen des Passworts:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
