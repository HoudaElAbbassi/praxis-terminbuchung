import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Überprüfe Datenbank-Status...\n");
  console.log("=".repeat(60));

  try {
    // Users
    const totalUsers = await prisma.user.count();
    const adminUsers = await prisma.user.count({ where: { role: "ADMIN" } });
    const patientUsers = await prisma.user.count({ where: { role: "PATIENT" } });

    console.log("\n👥 BENUTZER:");
    console.log(`   Gesamt: ${totalUsers}`);
    console.log(`   Admins: ${adminUsers}`);
    console.log(`   Patienten: ${patientUsers}`);

    if (adminUsers > 0) {
      const admins = await prisma.user.findMany({
        where: { role: "ADMIN" },
        select: { email: true, firstName: true, lastName: true },
      });
      console.log("\n   Admin-Konten:");
      admins.forEach((admin) => {
        console.log(`   • ${admin.email} (${admin.firstName} ${admin.lastName})`);
      });
    }

    // Appointment Types
    const appointmentTypes = await prisma.appointmentType.findMany();
    console.log("\n📋 TERMINTYPEN:");
    if (appointmentTypes.length === 0) {
      console.log("   ❌ Keine Termintypen vorhanden!");
    } else {
      console.log(`   ✅ ${appointmentTypes.length} Termintypen:`);
      appointmentTypes.forEach((type) => {
        console.log(`   • ${type.name} (${type.duration} Min)`);
      });
    }

    // Availability
    const availabilities = await prisma.availability.count();
    console.log("\n🕐 VERFÜGBARKEITEN:");
    console.log(`   ${availabilities} Zeitslots konfiguriert`);

    // Appointments
    const totalAppointments = await prisma.appointment.count();
    const pendingAppointments = await prisma.appointment.count({
      where: { status: "PENDING" },
    });
    const confirmedAppointments = await prisma.appointment.count({
      where: { status: "CONFIRMED" },
    });

    console.log("\n📅 TERMINE:");
    console.log(`   Gesamt: ${totalAppointments}`);
    console.log(`   Ausstehend: ${pendingAppointments}`);
    console.log(`   Bestätigt: ${confirmedAppointments}`);

    console.log("\n" + "=".repeat(60));

    // Prüfe ob alle notwendigen Daten vorhanden sind
    if (adminUsers === 0) {
      console.log("\n⚠️  WARNUNG: Keine Admin-Benutzer vorhanden!");
      console.log("   Führe aus: npm run db:seed");
    } else if (appointmentTypes.length === 0) {
      console.log("\n⚠️  WARNUNG: Keine Termintypen vorhanden!");
      console.log("   Führe aus: npm run db:seed");
    } else {
      console.log("\n✅ Datenbank ist betriebsbereit!");
      console.log("\n📝 LOGIN-DATEN FÜR DEPLOYED VERSION:");
      console.log("   Email:    praxis@admin.de");
      console.log("   Passwort: Praxis2024!");
      console.log("\n   oder");
      console.log("\n   Email:    admin@praxis.de");
      console.log("   Passwort: admin123");
    }

  } catch (error) {
    console.error("\n❌ Fehler beim Abrufen der Datenbank-Informationen:", error);
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
