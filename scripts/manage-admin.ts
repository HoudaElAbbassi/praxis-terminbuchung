import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as readline from "readline";

const prisma = new PrismaClient();

// Readline Interface erstellen
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Hilfsfunktion für Benutzereingaben
function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log("\n" + "=".repeat(60));
  console.log("🔐 Admin-Verwaltung - Praxis für Gefäßmedizin Remscheid");
  console.log("=".repeat(60) + "\n");

  // Zeige bestehende Admin-Accounts
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });

  if (admins.length > 0) {
    console.log("📋 Bestehende Admin-Accounts:\n");
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.email}`);
      console.log(`   Name: ${admin.firstName} ${admin.lastName}`);
      console.log(`   Erstellt: ${admin.createdAt.toLocaleString("de-DE")}\n`);
    });
  } else {
    console.log("ℹ️  Keine Admin-Accounts gefunden.\n");
  }

  console.log("Was möchten Sie tun?");
  console.log("1. Passwort für bestehenden Admin zurücksetzen");
  console.log("2. Neuen Admin-Account erstellen");
  console.log("3. Beenden\n");

  const choice = await question("Ihre Wahl (1-3): ");

  if (choice === "1") {
    // Passwort zurücksetzen
    console.log("\n--- PASSWORT ZURÜCKSETZEN ---\n");
    const email = await question("E-Mail des Admin-Accounts: ");
    const newPassword = await question("Neues Passwort: ");

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      console.log("\n❌ Kein Benutzer mit dieser E-Mail gefunden!");
      rl.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data: {
        password: hashedPassword,
        role: "ADMIN", // Stelle sicher, dass die Rolle ADMIN ist
      },
    });

    console.log("\n✅ Passwort erfolgreich geändert!");
    console.log("\n" + "=".repeat(60));
    console.log("📋 NEUE LOGIN-DATEN:");
    console.log("=".repeat(60));
    console.log(`Email:    ${email}`);
    console.log(`Passwort: ${newPassword}`);
    console.log("=".repeat(60) + "\n");

  } else if (choice === "2") {
    // Neuen Admin erstellen
    console.log("\n--- NEUEN ADMIN ERSTELLEN ---\n");
    const email = await question("E-Mail: ");
    const password = await question("Passwort: ");
    const firstName = await question("Vorname: ");
    const lastName = await question("Nachname: ");
    const phone = await question("Telefon (optional): ") || "02191 6917400";

    // Prüfen, ob E-Mail bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      console.log("\n⚠️  Benutzer mit dieser E-Mail existiert bereits!");
      const update = await question("Soll dieser zu Admin gemacht und Passwort aktualisiert werden? (j/n): ");

      if (update.toLowerCase() === "j" || update.toLowerCase() === "ja") {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
          where: { email: email.toLowerCase().trim() },
          data: {
            password: hashedPassword,
            role: "ADMIN",
            firstName,
            lastName,
            phone,
          },
        });

        console.log("\n✅ Benutzer zu Admin gemacht und Daten aktualisiert!");
      } else {
        console.log("\n❌ Vorgang abgebrochen.");
        rl.close();
        return;
      }
    } else {
      // Neuen Admin erstellen
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email: email.toLowerCase().trim(),
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          role: "ADMIN",
        },
      });

      console.log("\n✅ Neuer Admin-Account erfolgreich erstellt!");
    }

    console.log("\n" + "=".repeat(60));
    console.log("📋 LOGIN-DATEN:");
    console.log("=".repeat(60));
    console.log(`Email:    ${email}`);
    console.log(`Passwort: ${password}`);
    console.log("=".repeat(60));
    console.log("\n💡 Login unter: http://localhost:3000/auth/login\n");

  } else {
    console.log("\n👋 Auf Wiedersehen!\n");
  }

  rl.close();
}

main()
  .catch((e) => {
    console.error("\n❌ Fehler:", e);
    rl.close();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
