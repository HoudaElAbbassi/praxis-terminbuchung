import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as readline from "readline";

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log("🔐 Neuen Admin-Benutzer erstellen\n");

  const email = await question("Email-Adresse: ");
  const password = await question("Passwort: ");
  const firstName = await question("Vorname: ");
  const lastName = await question("Nachname: ");
  const phone = await question("Telefonnummer: ");

  // Prüfen, ob Benutzer bereits existiert
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    console.log("\n❌ Ein Benutzer mit dieser Email existiert bereits!");
    console.log("\nMöchten Sie die Rolle zu ADMIN ändern? (j/n)");
    const answer = await question("> ");

    if (answer.toLowerCase() === "j" || answer.toLowerCase() === "y") {
      await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: { role: "ADMIN" },
      });
      console.log("\n✅ Benutzer wurde zum Admin befördert!");
    }
  } else {
    // Neuen Admin-Benutzer erstellen
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

    console.log("\n✅ Admin-Benutzer erfolgreich erstellt!");
    console.log("\nLogin-Daten:");
    console.log(`  Email: ${admin.email}`);
    console.log(`  Passwort: ${password}`);
    console.log(`  Rolle: ${admin.role}`);
  }

  rl.close();
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error("\n❌ Fehler:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
