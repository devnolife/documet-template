/**
 * Middlewares Index
 * Central export for all middlewares
 */

const { errorHandler, notFoundHandler, asyncHandler } = require('./error.middleware');
const {
  validateRequired,
  validateUUID,
  validatePagination,
  validateEmail,
  validateFileUpload,
  sanitizeInput,
} = require('./validation.middleware');
const { uploadTemplate, uploadGeneral, uploadSignature } = require('./upload.middleware');
const {
  apiLimiter,
  strictLimiter,
  documentGenerationLimiter,
  signatureLimiter,
} = require('./rate-limit.middleware');
const { authenticate, authorize, optionalAuth } = require('./auth.middleware');

module.exports = {
  // Error handling
  errorHandler,
  notFoundHandler,
  asyncHandler,

  // Validation
  validateRequired,
  validateUUID,
  validatePagination,
  validateEmail,
  validateFileUpload,
  sanitizeInput,

  // Upload
  uploadTemplate,
  uploadGeneral,
  uploadSignature,

  // Rate limiting
  apiLimiter,
  strictLimiter,
  documentGenerationLimiter,
  signatureLimiter,

  // Authentication
  authenticate,
  authorize,
  optionalAuth,
};
