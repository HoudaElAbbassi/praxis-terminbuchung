import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createAdmin() {
  // Lese Argumente aus Kommandozeile
  const email = process.argv[2];
  const password = process.argv[3];
  const firstName = process.argv[4];
  const lastName = process.argv[5];
  const phone = process.argv[6] || "02191 6917400";

  if (!email || !password || !firstName || !lastName) {
    console.log("\n❌ Fehler: Nicht alle erforderlichen Felder angegeben!");
    console.log("\nVerwendung:");
    console.log("  npx tsx scripts/create-admin-cli.ts <email> <passwort> <vorname> <nachname> [telefon]");
    console.log("\nBeispiel:");
    console.log('  npx tsx scripts/create-admin-cli.ts admin@praxis.de "MeinPasswort123!" Max Mustermann "02191 123456"');
    console.log("\n💡 Tipps:");
    console.log("  - Verwenden Sie Anführungszeichen für Passwörter mit Sonderzeichen");
    console.log("  - Telefonnummer ist optional (Standard: 02191 6917400)\n");
    process.exit(1);
  }

  try {
    console.log("\n🔍 Prüfe, ob Benutzer bereits existiert...");

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      console.log(`\n⚠️  Benutzer mit E-Mail "${email}" existiert bereits!`);
      console.log(`   Aktuelle Rolle: ${existingUser.role}`);
      console.log(`   Name: ${existingUser.firstName} ${existingUser.lastName}\n`);
      console.log("💡 Verwenden Sie stattdessen: npx tsx scripts/reset-admin-password.ts");
      console.log(`   Beispiel: npx tsx scripts/reset-admin-password.ts ${email} "NeuesPasswort123!"\n`);
      process.exit(1);
    }

    console.log("✓ E-Mail verfügbar");

    // Passwort hashen
    console.log("\n🔐 Erstelle Passwort-Hash...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen Admin erstellen
    console.log("👤 Erstelle Admin-Account...");
    const admin = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: "ADMIN",
      },
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ Admin-Account erfolgreich erstellt!");
    console.log("=".repeat(60));
    console.log("\n📋 LOGIN-DATEN:");
    console.log(`   E-Mail:   ${admin.email}`);
    console.log(`   Passwort: ${password}`);
    console.log(`   Name:     ${admin.firstName} ${admin.lastName}`);
    console.log(`   Telefon:  ${admin.phone}`);
    console.log(`   Rolle:    ${admin.role}`);
    console.log("\n🌐 Login unter: http://localhost:3000/auth/login");
    console.log("\n⚠️  WICHTIG: Notieren Sie sich diese Daten!\n");

  } catch (error) {
    console.error("\n❌ Fehler beim Erstellen des Admin-Accounts:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
