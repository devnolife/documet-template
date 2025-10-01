/**
 * Configuration Index
 * Central export point for all configurations
 */

const appConfig = require('./app.config');
const databaseConfig = require('./database.config');
const storageConfig = require('./storage.config');
const signatureConfig = require('./signature.config');

module.exports = {
  app: appConfig,
  database: databaseConfig,
  storage: storageConfig,
  signature: signatureConfig,
};
