/**
 * Prisma Client Instance
 * Singleton pattern for database connection
 */

const { PrismaClient } = require('@prisma/client');
const config = require('../../../config').database;
const { logger } = require('../../../shared/utils');

class DatabaseClient {
  constructor() {
    if (!DatabaseClient.instance) {
      this.prisma = new PrismaClient({
        log: config.prisma.log,
        errorFormat: config.prisma.errorFormat,
      });

      // Connection lifecycle hooks
      this.prisma.$use(async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();

        logger.debug(`Query ${params.model}.${params.action} took ${after - before}ms`);
        return result;
      });

      DatabaseClient.instance = this;
    }

    return DatabaseClient.instance;
  }

  /**
   * Get Prisma client instance
   * @returns {PrismaClient} Prisma client
   */
  getClient() {
    return this.prisma;
  }

  /**
   * Connect to database
   */
  async connect() {
    try {
      await this.prisma.$connect();
      logger.info('Database connected successfully');
    } catch (error) {
      logger.error('Database connection failed:', error);
      throw error;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    try {
      await this.prisma.$disconnect();
      logger.info('Database disconnected successfully');
    } catch (error) {
      logger.error('Database disconnection failed:', error);
      throw error;
    }
  }

  /**
   * Health check
   */
  async healthCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', timestamp: new Date() };
    } catch (error) {
      return { status: 'unhealthy', error: error.message, timestamp: new Date() };
    }
  }
}

// Create singleton instance
const dbClient = new DatabaseClient();

module.exports = dbClient.getClient();
module.exports.DatabaseClient = DatabaseClient;
