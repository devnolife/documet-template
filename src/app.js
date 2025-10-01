/**
 * Express Application Configuration
 * Main application setup with middleware and routes
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Import configurations
const appConfig = require('./config/app.config');

// Import utilities
const { logger } = require('./shared/utils');

// Import middlewares
const { errorHandler, notFoundHandler } = require('./api/v1/middlewares/error.middleware');
const { apiLimiter } = require('./api/v1/middlewares/rate-limit.middleware');

// Import routes
const v1Routes = require('./api/v1/routes');

// Initialize Express app
const app = express();

// ========== Security Middleware ==========
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
);

// ========== CORS Configuration ==========
app.use(
  cors({
    origin: appConfig.cors.origin,
    credentials: appConfig.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ========== Request Parsing ==========
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ========== Logging Middleware ==========
// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Morgan logging configuration
const morganFormat = appConfig.server.env === 'production' ? 'combined' : 'dev';

app.use(
  morgan(morganFormat, {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400, // Only log errors in production
  })
);

// Request logging for debugging
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// ========== Static Files ==========
// Serve QR codes
app.use('/qrcodes', express.static(path.join(process.cwd(), 'storage/qrcodes')));

// Serve signatures
app.use('/signatures', express.static(path.join(process.cwd(), 'storage/signatures')));

// ========== API Rate Limiting ==========
app.use('/api', apiLimiter);

// ========== API Routes ==========
// API version 1
app.use(`${appConfig.api.prefix}/${appConfig.api.version}`, v1Routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Generate Document API',
    version: appConfig.api.version,
    documentation: `${req.protocol}://${req.get('host')}/api/docs`,
    endpoints: {
      health: `${appConfig.api.prefix}/${appConfig.api.version}/health`,
      documents: `${appConfig.api.prefix}/${appConfig.api.version}/documents`,
      signatures: `${appConfig.api.prefix}/${appConfig.api.version}/signatures`,
      admin: `${appConfig.api.prefix}/${appConfig.api.version}/admin`,
    },
  });
});

// API documentation endpoint (placeholder)
app.get('/api/docs', (req, res) => {
  res.json({
    success: true,
    message: 'API Documentation',
    version: appConfig.api.version,
    endpoints: {
      documents: {
        generate: {
          method: 'POST',
          path: '/api/v1/documents/generate',
          description: 'Generate a new document',
          auth: 'Optional',
        },
        list: {
          method: 'GET',
          path: '/api/v1/documents',
          description: 'List documents with pagination',
          auth: 'Required',
        },
        getById: {
          method: 'GET',
          path: '/api/v1/documents/:id',
          description: 'Get document by ID',
          auth: 'Public',
        },
        download: {
          method: 'GET',
          path: '/api/v1/documents/:id/download',
          description: 'Download document file',
          auth: 'Public',
        },
      },
      signatures: {
        sign: {
          method: 'POST',
          path: '/api/v1/signatures/sign',
          description: 'Sign a document',
          auth: 'Required',
        },
        verify: {
          method: 'GET',
          path: '/api/v1/signatures/verify/:documentId',
          description: 'Verify document signatures',
          auth: 'Public',
        },
        signers: {
          create: {
            method: 'POST',
            path: '/api/v1/signatures/signers',
            description: 'Create a new signer',
            auth: 'Admin',
          },
          list: {
            method: 'GET',
            path: '/api/v1/signatures/signers',
            description: 'List signers',
            auth: 'Required',
          },
        },
      },
      admin: {
        statistics: {
          method: 'GET',
          path: '/api/v1/admin/statistics',
          description: 'Get system statistics',
          auth: 'Admin',
        },
        health: {
          method: 'GET',
          path: '/api/v1/admin/health',
          description: 'Get system health',
          auth: 'Admin',
        },
      },
    },
  });
});

// ========== Error Handlers ==========
// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ========== Graceful Shutdown ==========
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// ========== Unhandled Rejection Handler ==========
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', {
    promise,
    reason,
  });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

module.exports = app;
