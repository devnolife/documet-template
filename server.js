/**
 * Server Entry Point
 * Starts the Express application
 */

require('dotenv').config();
const app = require('./src/app');
const appConfig = require('./src/config/app.config');
const { logger } = require('./src/shared/utils');
const prisma = require('./src/infrastructure/database/prisma');

const PORT = appConfig.server.port;
const HOST = appConfig.server.host;

/**
 * Start server
 */
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connection established successfully');

    // Start listening
    const server = app.listen(PORT, HOST, () => {
      logger.info(`Server started successfully`, {
        port: PORT,
        host: HOST,
        env: appConfig.server.env,
        url: `http://${HOST}:${PORT}`,
        apiUrl: `http://${HOST}:${PORT}${appConfig.api.prefix}/${appConfig.api.version}`,
      });

      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Generate Document API Server                        ║
║                                                           ║
║   Status    : Running                                    ║
║   Port      : ${PORT}                                       ║
║   Host      : ${HOST}                                    ║
║   Env       : ${appConfig.server.env}                             ║
║                                                           ║
║   API URL   : http://${HOST}:${PORT}${appConfig.api.prefix}/${appConfig.api.version}     ║
║   Docs      : http://${HOST}:${PORT}/api/docs          ║
║   Health    : http://${HOST}:${PORT}${appConfig.api.prefix}/${appConfig.api.version}/health ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      logger.info(`${signal} received, shutting down gracefully...`);

      server.close(async () => {
        logger.info('HTTP server closed');

        // Disconnect Prisma
        await prisma.$disconnect();
        logger.info('Database connection closed');

        logger.info('Server shutdown complete');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server', {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

// Start the server
startServer();
