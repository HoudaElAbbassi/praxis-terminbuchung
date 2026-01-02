import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🔐 Erstelle neuen Admin-Benutzer...\n");

  const email = "praxis@gefaessmedizinremscheid.de";
  const password = "Praxis2024!";
  const firstName = "Praxis";
  const lastName = "Administrator";
  const phone = "02191 6917400";

  try {
    // Prüfen, ob Benutzer bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("⚠️  Benutzer existiert bereits. Aktualisiere Passwort und Rolle...\n");

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      console.log("✅ Benutzer aktualisiert!");
    } else {
      // Neuen Admin-Benutzer erstellen
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          role: "ADMIN",
        },
      });

      console.log("✅ Neuer Admin-Benutzer erstellt!");
    }

    console.log("\n" + "=".repeat(50));
    console.log("📋 LOGIN-DATEN:");
    console.log("=".repeat(50));
    console.log(`Email:    ${email}`);
    console.log(`Passwort: ${password}`);
    console.log("=".repeat(50));
    console.log("\n💡 Tipp: Bitte notiere diese Daten!\n");

  } catch (error) {
    console.error("❌ Fehler beim Erstellen des Admin-Benutzers:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("\n❌ Fehler:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
