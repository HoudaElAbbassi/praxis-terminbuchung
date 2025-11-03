import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function testLogin(email: string, password: string) {
  console.log(`\n🔐 Teste Login für: ${email}`);
  console.log("=".repeat(60));

  try {
    // Benutzer finden
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      console.log("❌ Benutzer nicht gefunden!");
      return false;
    }

    console.log("✅ Benutzer gefunden:");
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.firstName} ${user.lastName}`);
    console.log(`   Rolle: ${user.role}`);
    console.log(`   Erstellt: ${user.createdAt.toLocaleString("de-DE")}`);

    // Passwort-Hash anzeigen (erste 20 Zeichen)
    console.log(`   Passwort-Hash: ${user.password.substring(0, 30)}...`);

    // Passwort vergleichen
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log("\n✅ PASSWORT IST KORREKT! Login sollte funktionieren.");
      return true;
    } else {
      console.log("\n❌ PASSWORT IST FALSCH!");

      // Test: Hash des eingegebenen Passworts erstellen
      const testHash = await bcrypt.hash(password, 10);
      console.log(`\n🔍 Test-Hash des eingegebenen Passworts:`);
      console.log(`   ${testHash.substring(0, 30)}...`);

      return false;
    }
  } catch (error) {
    console.error("❌ Fehler beim Testen:", error);
    return false;
  }
}

async function main() {
  console.log("\n" + "=".repeat(60));
  console.log("🧪 PRODUKTIONS-LOGIN-TEST");
  console.log("=".repeat(60));

  // Test beide Admin-Accounts
  await testLogin("praxis@admin.de", "Praxis2024!");
  await testLogin("admin@praxis.de", "admin123");

  console.log("\n" + "=".repeat(60));
}

main()
  .catch((e) => {
    console.error("\n❌ Fehler:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
