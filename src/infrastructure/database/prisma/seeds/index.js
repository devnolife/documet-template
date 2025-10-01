/**
 * Database Seeding Entry Point
 * Runs all seed files in order
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Run seed files in order
    console.log('1️⃣ Seeding EdDSA system...');
    await require('./seed-eddsa-system');
    console.log('✅ EdDSA system seeded\n');

    console.log('2️⃣ Seeding document signature config...');
    await require('./seed-document-signature-config');
    console.log('✅ Document signature config seeded\n');

    console.log('3️⃣ Seeding enhanced fields...');
    await require('./seed-enhanced-fields');
    console.log('✅ Enhanced fields seeded\n');

    console.log('4️⃣ Seeding documents...');
    await require('./seed-documents');
    console.log('✅ Documents seeded\n');

    console.log('5️⃣ Seeding audit history...');
    await require('./seed-audit-history');
    console.log('✅ Audit history seeded\n');

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
