/**
 * Database Index
 * Main export for database layer
 */

const prisma = require('./prisma/client');
const { DatabaseClient } = require('./prisma/client');

module.exports = {
  prisma,
  DatabaseClient,
};
