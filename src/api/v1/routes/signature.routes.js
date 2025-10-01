/**
 * Signature Routes
 * Defines API endpoints for signature operations
 */

const express = require('express');
const router = express.Router();
const { signatureController } = require('../controllers');
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth.middleware');
const {
  validateRequired,
  validateUUID,
  validatePagination,
} = require('../middlewares/validation.middleware');
const { signatureLimiter, apiLimiter } = require('../middlewares/rate-limit.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');

/**
 * @route   POST /api/v1/signatures/sign
 * @desc    Sign a document
 * @access  Private
 */
router.post(
  '/sign',
  authenticate,
  signatureLimiter,
  validateRequired(['documentId', 'signerId']),
  validateUUID('documentId'),
  validateUUID('signerId'),
  asyncHandler(signatureController.signDocument)
);

/**
 * @route   GET /api/v1/signatures/verify/:documentId
 * @desc    Verify document signatures
 * @access  Public
 */
router.get(
  '/verify/:documentId',
  validateUUID('documentId'),
  asyncHandler(signatureController.verifyDocument)
);

/**
 * @route   GET /api/v1/signatures/document/:documentId
 * @desc    Get all signatures for a document
 * @access  Public
 */
router.get(
  '/document/:documentId',
  validateUUID('documentId'),
  asyncHandler(signatureController.getDocumentSignatures)
);

/**
 * @route   GET /api/v1/signatures/:id
 * @desc    Get signature by ID
 * @access  Public
 */
router.get('/:id', validateUUID('id'), asyncHandler(signatureController.getSignature));

/**
 * @route   POST /api/v1/signatures/qrcode
 * @desc    Generate QR code for document
 * @access  Private
 */
router.post(
  '/qrcode',
  authenticate,
  validateRequired(['documentId']),
  validateUUID('documentId'),
  asyncHandler(signatureController.generateQRCode)
);

/**
 * @route   GET /api/v1/signatures/logs/:documentId
 * @desc    Get verification logs
 * @access  Private (Admin only)
 */
router.get(
  '/logs/:documentId',
  authenticate,
  authorize(['admin']),
  validateUUID('documentId'),
  validatePagination,
  asyncHandler(signatureController.getVerificationLogs)
);

/**
 * @route   POST /api/v1/signatures/:id/revoke
 * @desc    Revoke a signature
 * @access  Private (Admin only)
 */
router.post(
  '/:id/revoke',
  authenticate,
  authorize(['admin']),
  validateUUID('id'),
  validateRequired(['reason']),
  asyncHandler(signatureController.revokeSignature)
);

// ========== Signer Management Routes ==========

/**
 * @route   POST /api/v1/signatures/signers
 * @desc    Create a new signer
 * @access  Private (Admin only)
 */
router.post(
  '/signers',
  authenticate,
  authorize(['admin']),
  apiLimiter,
  validateRequired(['nbm', 'name', 'role']),
  asyncHandler(signatureController.createSigner)
);

/**
 * @route   GET /api/v1/signatures/signers
 * @desc    List signers
 * @access  Private
 */
router.get(
  '/signers',
  authenticate,
  validatePagination,
  asyncHandler(signatureController.listSigners)
);

/**
 * @route   GET /api/v1/signatures/signers/:id
 * @desc    Get signer by ID
 * @access  Private
 */
router.get(
  '/signers/:id',
  authenticate,
  validateUUID('id'),
  asyncHandler(signatureController.getSigner)
);

/**
 * @route   GET /api/v1/signatures/signers/nbm/:nbm
 * @desc    Get signer by NBM
 * @access  Private
 */
router.get('/signers/nbm/:nbm', authenticate, asyncHandler(signatureController.getSignerByNBM));

/**
 * @route   PATCH /api/v1/signatures/signers/:id
 * @desc    Update signer
 * @access  Private (Admin only)
 */
router.patch(
  '/signers/:id',
  authenticate,
  authorize(['admin']),
  validateUUID('id'),
  asyncHandler(signatureController.updateSigner)
);

/**
 * @route   POST /api/v1/signatures/signers/:id/deactivate
 * @desc    Deactivate signer
 * @access  Private (Admin only)
 */
router.post(
  '/signers/:id/deactivate',
  authenticate,
  authorize(['admin']),
  validateUUID('id'),
  asyncHandler(signatureController.deactivateSigner)
);

/**
 * @route   POST /api/v1/signatures/signers/:id/rotate-keys
 * @desc    Rotate signer keys
 * @access  Private (Admin only)
 */
router.post(
  '/signers/:id/rotate-keys',
  authenticate,
  authorize(['admin']),
  validateUUID('id'),
  asyncHandler(signatureController.rotateSignerKeys)
);

module.exports = router;
