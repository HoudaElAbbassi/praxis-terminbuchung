-- Cleanup old database schema
-- Drop all views first
DROP VIEW IF EXISTS booking_details CASCADE;

-- Drop old tables
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop any other potentially conflicting objects
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS verification_tokens CASCADE;
