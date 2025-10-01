/**
 * Database Configuration
 * Configuration for database connections and settings
 */

module.exports = {
  // PostgreSQL Configuration
  postgresql: {
    url: process.env.DATABASE_URL,
    pool: {
      min: parseInt(process.env.DB_POOL_MIN) || 2,
      max: parseInt(process.env.DB_POOL_MAX) || 10,
    },
    options: {
      connectTimeout: 10000,
      idleTimeout: 30000,
    },
  },

  // Prisma Configuration
  prisma: {
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'info', 'warn', 'error']
      : ['warn', 'error'],
    errorFormat: 'pretty',
  },
};
