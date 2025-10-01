/**
 * API v1 Routes Index
 * Centralized route management
 */

const express = require('express');
const router = express.Router();

// Import route modules
const documentRoutes = require('./document.routes');
const signatureRoutes = require('./signature.routes');
const adminRoutes = require('./admin.routes');

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    version: 'v1',
  });
});

// Mount routes
router.use('/documents', documentRoutes);
router.use('/signatures', signatureRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
