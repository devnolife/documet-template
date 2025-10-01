/**
 * Services Index
 * Central export for all services
 */

const { documentService } = require('./document');
const { signatureService, signerService } = require('./signature');

module.exports = {
  documentService,
  signatureService,
  signerService,
};
