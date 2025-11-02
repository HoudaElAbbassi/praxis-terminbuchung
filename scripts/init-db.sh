#!/bin/bash

# Datenbank-Initialisierungsskript für Netlify-Deployment
# Dieses Skript muss lokal ausgeführt werden, um die Produktions-Datenbank zu initialisieren

echo "🚀 Initialisiere Produktions-Datenbank..."
echo ""

# Prüfe ob DATABASE_URL gesetzt ist
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Fehler: DATABASE_URL ist nicht gesetzt!"
  echo ""
  echo "Bitte setzen Sie die DATABASE_URL:"
  echo "export DATABASE_URL=\"ihre-produktions-database-url\""
  echo ""
  exit 1
fi

echo "✅ DATABASE_URL gefunden"
echo ""

# Führe Prisma Migrationen aus
echo "📊 Erstelle Datenbank-Tabellen..."
npx prisma db push

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Fehler beim Erstellen der Tabellen!"
  exit 1
fi

echo ""
echo "✅ Tabellen erfolgreich erstellt"
echo ""

# Fülle Datenbank mit initialen Daten
echo "🌱 Füge initiale Daten hinzu..."
npm run db:seed

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Fehler beim Hinzufügen der Daten!"
  exit 1
fi

echo ""
echo "✅ Initiale Daten erfolgreich hinzugefügt"
echo ""
echo "🎉 Datenbank-Initialisierung abgeschlossen!"
echo ""
echo "Admin-Login:"
echo "  Email: admin@praxis.de"
echo "  Passwort: admin123"
echo ""
echo "⚠️  WICHTIG: Ändern Sie das Admin-Passwort sofort nach dem ersten Login!"
