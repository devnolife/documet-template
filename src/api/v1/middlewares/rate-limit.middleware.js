/**
 * Rate Limiting Middleware
 * Protect API from abuse
 */

const rateLimit = require('express-rate-limit');
const { ResponseHelper } = require('../../../shared/helpers');
const config = require('../../../config').app;

/**
 * General API rate limiter
 */
const apiLimiter = rateLimit({
  windowMs: config.api.rateLimit.windowMs,
  max: config.api.rateLimit.max,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ResponseHelper.error(
      res,
      'Too many requests, please try again later.',
      429,
      'TOO_MANY_REQUESTS'
    );
  },
});

/**
 * Strict rate limiter for sensitive operations
 */
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: 'Too many requests for this operation.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ResponseHelper.error(
      res,
      'Too many requests for this operation, please try again later.',
      429,
      'TOO_MANY_REQUESTS'
    );
  },
});

/**
 * Rate limiter for document generation
 */
const documentGenerationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // 20 documents per window
  message: 'Document generation limit exceeded.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ResponseHelper.error(
      res,
      'Document generation limit exceeded, please try again later.',
      429,
      'RATE_LIMIT_EXCEEDED'
    );
  },
});

/**
 * Rate limiter for signature operations
 */
const signatureLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 signatures per window
  message: 'Signature operation limit exceeded.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ResponseHelper.error(
      res,
      'Signature operation limit exceeded, please try again later.',
      429,
      'RATE_LIMIT_EXCEEDED'
    );
  },
});

module.exports = {
  apiLimiter,
  strictLimiter,
  documentGenerationLimiter,
  signatureLimiter,
};
