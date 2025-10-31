const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@praxis.de' },
    update: {},
    create: {
      email: 'admin@praxis.de',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Praxis',
      phone: '+49 123 456789',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('   Email: admin@praxis.de');
  console.log('   Password: admin123');

  // Create Appointment Types
  const appointmentTypes = [
    {
      name: 'Erstgespräch',
      duration: 45,
      description: 'Ausführliches Erstgespräch für neue Patienten',
    },
    {
      name: 'Standard-Konsultation',
      duration: 30,
      description: 'Reguläre Konsultation',
    },
    {
      name: 'Spezialbehandlung',
      duration: 60,
      description: 'Spezielle Behandlungen und Untersuchungen',
    },
  ];

  for (const type of appointmentTypes) {
    await prisma.appointmentType.upsert({
      where: { name: type.name },
      update: {},
      create: type,
    });
    console.log(`✅ Appointment type created: ${type.name}`);
  }

  console.log('\n🎉 Seeding completed!');
  console.log('\n📌 You can now:');
  console.log('   1. Start the dev server: npm run dev');
  console.log('   2. Visit: http://localhost:3000');
  console.log('   3. Login as admin: admin@praxis.de / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
