import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const testEmail = "admin@praxis.de";
  const testPassword = "admin123";

  console.log("🔐 Teste Login-Credentials...\n");
  console.log(`Email: ${testEmail}`);
  console.log(`Passwort: ${testPassword}\n`);

  try {
    // Suche Benutzer
    const user = await prisma.user.findUnique({
      where: { email: testEmail.toLowerCase() },
    });

    if (!user) {
      console.log("❌ Benutzer nicht gefunden!");
      console.log("\n💡 Lösung: Führen Sie aus:");
      console.log("  ./scripts/init-db.sh\n");
      return;
    }

    console.log("✅ Benutzer gefunden:");
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.firstName} ${user.lastName}`);
    console.log(`   Rolle: ${user.role}`);
    console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
    console.log("");

    // Teste Passwort
    const isPasswordValid = await bcrypt.compare(testPassword, user.password);

    if (isPasswordValid) {
      console.log("✅ Passwort ist KORREKT!");
      console.log("\n🎉 Login sollte funktionieren mit:");
      console.log(`   Email: ${testEmail}`);
      console.log(`   Passwort: ${testPassword}\n`);
    } else {
      console.log("❌ Passwort ist FALSCH!");
      console.log("\n💡 Mögliche Ursachen:");
      console.log("  1. Passwort-Hash ist beschädigt");
      console.log("  2. Falsches Passwort in der Datenbank");
      console.log("\n🔧 Lösung: Erstellen Sie einen neuen Admin:");
      console.log("  npm run create-admin\n");
    }

    // Teste auch mit verschiedenen Variationen
    console.log("🔍 Zusätzliche Tests:");
    const variations = [
      { desc: "Großbuchstaben", email: testEmail.toUpperCase() },
      { desc: "Gemischt", email: "Admin@Praxis.de" },
    ];

    for (const variation of variations) {
      const found = await prisma.user.findUnique({
        where: { email: variation.email.toLowerCase() },
      });
      if (found) {
        console.log(`  ✅ ${variation.desc}: ${variation.email} → Gefunden`);
      } else {
        console.log(`  ❌ ${variation.desc}: ${variation.email} → Nicht gefunden`);
      }
    }
  } catch (error: any) {
    console.error("\n❌ Fehler:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
