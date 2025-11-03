import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Prüfe Admin-Benutzer in der Datenbank...\n");

  try {
    // Alle Admin-Benutzer anzeigen
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    if (admins.length === 0) {
      console.log("❌ Keine Admin-Benutzer gefunden!");
      console.log("\n💡 Führe aus: npx tsx scripts/create-new-admin.ts");
    } else {
      console.log(`✅ ${admins.length} Admin-Benutzer gefunden:\n`);
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.email}`);
        console.log(`   Name: ${admin.firstName} ${admin.lastName}`);
        console.log(`   ID: ${admin.id}`);
        console.log(`   Erstellt: ${admin.createdAt.toLocaleString("de-DE")}`);
        console.log("");
      });
    }

    // Alle Benutzer zählen
    const totalUsers = await prisma.user.count();
    console.log(`📊 Gesamt Benutzer in der Datenbank: ${totalUsers}`);

  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Admin-Benutzer:", error);
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
