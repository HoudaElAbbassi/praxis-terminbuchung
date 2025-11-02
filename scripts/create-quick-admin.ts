import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🔐 Erstelle Admin-Benutzer...\n");

  // Feste Credentials für schnelles Setup
  const email = "admin@praxis.de";
  const password = "Admin2024!";
  const firstName = "Admin";
  const lastName = "Praxis";
  const phone = "+49 123 456789";

  try {
    // Prüfen, ob Benutzer bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      console.log("⚠️  Benutzer existiert bereits!");
      console.log(`   Email: ${existingUser.email}`);
      console.log(`   Rolle: ${existingUser.role}\n`);

      if (existingUser.role !== "ADMIN") {
        console.log("🔄 Befördere Benutzer zu Admin...");
        await prisma.user.update({
          where: { email: email.toLowerCase() },
          data: { role: "ADMIN" },
        });
        console.log("✅ Benutzer wurde zum Admin befördert!\n");
      }

      // Passwort aktualisieren
      console.log("🔄 Aktualisiere Passwort...");
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: { password: hashedPassword },
      });
      console.log("✅ Passwort wurde aktualisiert!\n");
    } else {
      // Neuen Admin erstellen
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          role: "ADMIN",
        },
      });

      console.log("✅ Admin-Benutzer erfolgreich erstellt!\n");
    }

    console.log("🎉 Fertig! Login-Daten:");
    console.log("=".repeat(50));
    console.log(`   Email:    ${email}`);
    console.log(`   Passwort: ${password}`);
    console.log("=".repeat(50));
    console.log("\n💡 Testen Sie jetzt den Login:");
    console.log(`   https://arzt.netlify.app/admin\n`);
  } catch (error: any) {
    console.error("\n❌ Fehler:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
