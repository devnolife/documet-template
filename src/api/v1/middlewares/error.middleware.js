/**
 * Error Handling Middleware
 * Centralized error handling for the application
 */

const { logger } = require('../../../shared/utils');
const { ResponseHelper } = require('../../../shared/helpers');
const { statusCodes, errorCodes } = require('../../../shared/constants');

/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Prisma errors
  if (err.code === 'P2002') {
    return ResponseHelper.error(
      res,
      'Duplicate entry. Record already exists.',
      statusCodes.CONFLICT,
      errorCodes.DUPLICATE_ENTRY
    );
  }

  if (err.code === 'P2025') {
    return ResponseHelper.notFound(res, 'Record not found');
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return ResponseHelper.validationError(res, err.errors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ResponseHelper.unauthorized(res, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return ResponseHelper.unauthorized(res, 'Token expired');
  }

  // Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return ResponseHelper.error(
        res,
        'File size too large',
        statusCodes.BAD_REQUEST,
        errorCodes.FILE_TOO_LARGE
      );
    }
    return ResponseHelper.error(
      res,
      err.message,
      statusCodes.BAD_REQUEST,
      errorCodes.FILE_UPLOAD_FAILED
    );
  }

  // Default error
  const statusCode = err.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';
  const errorCode = err.errorCode || errorCodes.INTERNAL_ERROR;

  return ResponseHelper.error(res, message, statusCode, errorCode);
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  return ResponseHelper.notFound(res, `Route ${req.url} not found`);
};

/**
 * Async handler wrapper
 * Wraps async route handlers to catch errors
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler,
};
