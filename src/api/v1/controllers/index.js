/**
 * Controllers Index
 * Exports all controllers
 */

const documentController = require('./document.controller');
const signatureController = require('./signature.controller');
const adminController = require('./admin.controller');

module.exports = {
  documentController,
  signatureController,
  adminController,
};
