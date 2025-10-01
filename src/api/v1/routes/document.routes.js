/**
 * Document Routes
 * Defines API endpoints for document operations
 */

const express = require('express');
const router = express.Router();
const { documentController } = require('../controllers');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth.middleware');
const {
  validateRequired,
  validateUUID,
  validatePagination,
} = require('../middlewares/validation.middleware');
const { documentGenerationLimiter } = require('../middlewares/rate-limit.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');

/**
 * @route   POST /api/v1/documents/generate
 * @desc    Generate a new document
 * @access  Public (with rate limit)
 */
router.post(
  '/generate',
  documentGenerationLimiter,
  validateRequired(['type', 'prodi', 'data']),
  optionalAuth,
  asyncHandler(documentController.generateDocument)
);

/**
 * @route   GET /api/v1/documents/types
 * @desc    List available document types
 * @access  Public
 */
router.get('/types', asyncHandler(documentController.listDocumentTypes));

/**
 * @route   GET /api/v1/documents/config/:type/:prodi
 * @desc    Get document configuration
 * @access  Public
 */
router.get('/config/:type/:prodi', asyncHandler(documentController.getDocumentConfig));

/**
 * @route   POST /api/v1/documents/validate-template
 * @desc    Validate document template
 * @access  Private (Admin only)
 */
router.post(
  '/validate-template',
  authenticate,
  authorize(['admin']),
  validateRequired(['type', 'prodi']),
  asyncHandler(documentController.validateTemplate)
);

/**
 * @route   GET /api/v1/documents
 * @desc    List documents with pagination
 * @access  Private
 */
router.get('/', authenticate, validatePagination, asyncHandler(documentController.listDocuments));

/**
 * @route   GET /api/v1/documents/:id
 * @desc    Get document by ID
 * @access  Public
 */
router.get('/:id', validateUUID('id'), asyncHandler(documentController.getDocument));

/**
 * @route   GET /api/v1/documents/:id/download
 * @desc    Download document file
 * @access  Public
 */
router.get('/:id/download', validateUUID('id'), asyncHandler(documentController.downloadDocument));

/**
 * @route   GET /api/v1/documents/:id/verify
 * @desc    Get document verification info
 * @access  Public
 */
router.get('/:id/verify', validateUUID('id'), asyncHandler(documentController.verifyDocument));

/**
 * @route   PATCH /api/v1/documents/:id
 * @desc    Update document metadata
 * @access  Private (Admin only)
 */
router.patch(
  '/:id',
  authenticate,
  authorize(['admin']),
  validateUUID('id'),
  asyncHandler(documentController.updateDocument)
);

/**
 * @route   DELETE /api/v1/documents/:id
 * @desc    Delete document
 * @access  Private (Admin only)
 */
router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  validateUUID('id'),
  asyncHandler(documentController.deleteDocument)
);

module.exports = router;
