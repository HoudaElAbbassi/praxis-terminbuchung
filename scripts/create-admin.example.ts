import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // WICHTIG: Ändern Sie diese Werte!
    const email = 'admin@praxis-remscheid.de';
    const password = 'Admin123!'; // Ändern Sie dieses Passwort!
    const firstName = 'Admin';
    const lastName = 'Praxis';
    const phone = '02191 6917400';

    console.log('🔍 Prüfe, ob Admin bereits existiert...');

    // Prüfen, ob User bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.role === 'ADMIN') {
        console.log('ℹ️  Admin-Account existiert bereits:', email);
        console.log('💡 Wenn Sie das Passwort zurücksetzen möchten, löschen Sie den User erst.');
        return;
      } else {
        // User existiert, aber ist kein Admin - mache ihn zum Admin
        console.log('📝 User existiert als PATIENT - ändere zu ADMIN...');
        const updatedUser = await prisma.user.update({
          where: { email },
          data: { role: 'ADMIN' },
        });
        console.log('✅ User zu Admin gemacht:', updatedUser.email);
        return;
      }
    }

    console.log('🔐 Hash Passwort...');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('👤 Erstelle Admin-Account...');
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin erfolgreich erstellt!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Passwort:', password);
    console.log('');
    console.log('⚠️  WICHTIG: Ändern Sie das Passwort nach dem ersten Login!');
    console.log('🌐 Login unter: http://localhost:3000/auth/login');
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Admins:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Script ausführen
createAdmin();
