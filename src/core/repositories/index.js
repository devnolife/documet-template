/**
 * Repositories Index
 * Central export for all repositories
 */

const documentRepository = require('./document.repository');
const signatureRepository = require('./signature.repository');
const signerRepository = require('./signer.repository');

module.exports = {
  documentRepository,
  signatureRepository,
  signerRepository,
};
