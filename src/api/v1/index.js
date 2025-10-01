/**
 * API v1 Index
 * Main export point for API v1 modules
 */

const routes = require('./routes');
const controllers = require('./controllers');
const middlewares = require('./middlewares');

module.exports = {
  routes,
  controllers,
  middlewares,
};
