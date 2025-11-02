import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Überprüfe Datenbank-Status...\n");

  try {
    // Prüfe ob Verbindung möglich ist
    await prisma.$connect();
    console.log("✅ Datenbankverbindung erfolgreich\n");

    // Prüfe Tabellen
    console.log("📊 Prüfe Tabellen:");

    const userCount = await prisma.user.count();
    console.log(`  Users: ${userCount} Benutzer gefunden`);

    const appointmentTypeCount = await prisma.appointmentType.count();
    console.log(`  AppointmentTypes: ${appointmentTypeCount} Termintypen gefunden`);

    const appointmentCount = await prisma.appointment.count();
    console.log(`  Appointments: ${appointmentCount} Termine gefunden`);

    const availabilityCount = await prisma.availability.count();
    console.log(`  Availability: ${availabilityCount} Verfügbarkeiten gefunden\n`);

    // Prüfe Admin-Benutzer
    console.log("👤 Prüfe Admin-Benutzer:");
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (admins.length === 0) {
      console.log("  ❌ KEIN Admin-Benutzer gefunden!");
      console.log("\n💡 Lösung: Führen Sie aus:");
      console.log("  ./scripts/init-db.sh");
      console.log("  ODER");
      console.log("  npm run create-admin\n");
    } else {
      console.log("  ✅ Admin-Benutzer gefunden:");
      admins.forEach((admin) => {
        console.log(
          `    - ${admin.email} (${admin.firstName} ${admin.lastName})`
        );
      });
      console.log("\n");
    }

    // Zusammenfassung
    if (userCount === 0) {
      console.log("⚠️  DATENBANK IST LEER!");
      console.log("\n🚀 Initialisieren Sie die Datenbank mit:");
      console.log("  export DATABASE_URL=\"ihre-database-url\"");
      console.log("  ./scripts/init-db.sh\n");
    } else {
      console.log("✅ Datenbank ist initialisiert!");
      if (admins.length > 0) {
        console.log("\n🎉 Sie können sich jetzt einloggen!");
        console.log(`   Email: ${admins[0].email}`);
        console.log("   Passwort: admin123 (falls Standard-Admin)\n");
      }
    }
  } catch (error: any) {
    console.error("❌ Fehler bei der Datenbankverbindung:\n");
    console.error(error.message);
    console.log("\n💡 Mögliche Ursachen:");
    console.log("  1. DATABASE_URL ist nicht gesetzt");
    console.log("  2. DATABASE_URL ist falsch");
    console.log("  3. Datenbank-Server ist nicht erreichbar");
    console.log("  4. Tabellen wurden noch nicht erstellt\n");
    console.log("🔧 Prüfen Sie:");
    console.log("  echo $DATABASE_URL");
    console.log("\n");
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
