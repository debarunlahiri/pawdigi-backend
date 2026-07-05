#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const REQUIRED_TABLES = [
  'admin_profiles',
  'api_request_logs',
  'audit_event_logs',
  'cart_items',
  'carts',
  'categories',
  'customer_profiles',
  'device_tokens',
  'deworming_records',
  'documents',
  'inventories',
  'medical_records',
  'notifications',
  'order_items',
  'orders',
  'otp_challenges',
  'payments',
  'pet_guardians',
  'pet_passports',
  'pets',
  'product_images',
  'products',
  'refresh_token_sessions',
  'reminders',
  'reviews',
  'scheduler_execution_logs',
  'shipments',
  'users',
  'vaccination_records',
  'vendor_profiles',
];

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required before ensuring database tables');
  }

  const prisma = new PrismaClient();

  try {
    const rows = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
    `;

    const existingTables = new Set(rows.map((row) => row.table_name));
    const missingTables = REQUIRED_TABLES.filter((table) => !existingTables.has(table));

    if (missingTables.length === 0) {
      console.log('[db:ensure] Required database tables already exist.');
      return;
    }

    console.log(`[db:ensure] Missing tables: ${missingTables.join(', ')}`);
    console.log('[db:ensure] Running prisma db push to create/update schema...');

    execFileSync('npx', ['prisma', 'db', 'push', '--skip-generate'], {
      stdio: 'inherit',
      env: process.env,
    });

    console.log('[db:ensure] Database schema is ready.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('[db:ensure] Failed to ensure database schema.');
  console.error(error);
  process.exit(1);
});
