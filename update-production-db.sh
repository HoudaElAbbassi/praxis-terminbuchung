#!/bin/bash

# Script to update production database schema
# Run this ONCE to sync your production database with the current schema

echo "🔧 Updating Production Database Schema..."
echo ""
echo "Please enter your Production DATABASE_URL:"
echo "(Copy from Neon Dashboard → Connection Details)"
read -r DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL cannot be empty"
  exit 1
fi

echo ""
echo "🚀 Running: prisma db push..."
echo ""

# Run prisma db push with the provided DATABASE_URL
DATABASE_URL="$DATABASE_URL" /opt/homebrew/bin/npx prisma db push

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Success! Production database is now up-to-date."
  echo ""
  echo "Next steps:"
  echo "1. Wait for Netlify build to complete"
  echo "2. Test appointment booking at your-domain.netlify.app/termine/buchen"
  echo "3. Delete this script: rm update-production-db.sh"
else
  echo ""
  echo "❌ Error: Database update failed."
  echo "Please check your DATABASE_URL and try again."
  exit 1
fi
