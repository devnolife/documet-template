/**
 * Admin Routes
 * Defines API endpoints for administrative operations
 */

const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { validatePagination } = require('../middlewares/validation.middleware');
const { strictLimiter } = require('../middlewares/rate-limit.middleware');
const { asyncHandler } = require('../middlewares/error.middleware');

// Apply authentication and admin authorization to all admin routes
router.use(authenticate);
router.use(authorize(['admin']));

/**
 * @route   GET /api/v1/admin/statistics
 * @desc    Get system statistics
 * @access  Private (Admin only)
 */
router.get('/statistics', asyncHandler(adminController.getStatistics));

/**
 * @route   GET /api/v1/admin/activities
 * @desc    Get recent activities
 * @access  Private (Admin only)
 */
router.get('/activities', asyncHandler(adminController.getRecentActivities));

/**
 * @route   GET /api/v1/admin/audit-logs
 * @desc    Get audit logs
 * @access  Private (Admin only)
 */
router.get('/audit-logs', validatePagination, asyncHandler(adminController.getAuditLogs));

/**
 * @route   GET /api/v1/admin/health
 * @desc    Get system health status
 * @access  Private (Admin only)
 */
router.get('/health', asyncHandler(adminController.getSystemHealth));

/**
 * @route   GET /api/v1/admin/documents/by-prodi
 * @desc    Get documents grouped by prodi
 * @access  Private (Admin only)
 */
router.get('/documents/by-prodi', asyncHandler(adminController.getDocumentsByProdi));

/**
 * @route   GET /api/v1/admin/documents/by-type
 * @desc    Get documents grouped by type
 * @access  Private (Admin only)
 */
router.get('/documents/by-type', asyncHandler(adminController.getDocumentsByType));

/**
 * @route   POST /api/v1/admin/cleanup
 * @desc    Clean up old files
 * @access  Private (Admin only)
 */
router.post('/cleanup', strictLimiter, asyncHandler(adminController.cleanupOldFiles));

/**
 * @route   GET /api/v1/admin/export
 * @desc    Export data
 * @access  Private (Admin only)
 */
router.get('/export', strictLimiter, asyncHandler(adminController.exportData));

module.exports = router;
