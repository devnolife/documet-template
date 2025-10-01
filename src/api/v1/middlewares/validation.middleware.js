/**
 * Validation Middleware
 * Request validation middleware
 */

const { ValidationHelper, ResponseHelper } = require('../../../shared/helpers');
const { errorCodes } = require('../../../shared/constants');

/**
 * Validate required fields in request body
 */
const validateRequired = (fields) => {
  return (req, res, next) => {
    const result = ValidationHelper.validateRequired(req.body, fields);

    if (!result.valid) {
      return ResponseHelper.validationError(res, {
        message: 'Required fields are missing',
        missing: result.missing,
      });
    }

    next();
  };
};

/**
 * Validate UUID parameter
 */
const validateUUID = (paramName = 'id') => {
  return (req, res, next) => {
    const uuid = req.params[paramName];

    if (!ValidationHelper.isValidUUID(uuid)) {
      return ResponseHelper.error(
        res,
        `Invalid ${paramName} format. Must be a valid UUID.`,
        400,
        errorCodes.VALIDATION_ERROR
      );
    }

    next();
  };
};

/**
 * Validate pagination parameters
 */
const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;

  const validated = ValidationHelper.validatePagination(
    page,
    limit,
    100 // max limit
  );

  req.pagination = validated;
  next();
};

/**
 * Validate email format
 */
const validateEmail = (fieldName = 'email') => {
  return (req, res, next) => {
    const email = req.body[fieldName];

    if (email && !ValidationHelper.isValidEmail(email)) {
      return ResponseHelper.validationError(res, {
        message: `Invalid ${fieldName} format`,
        field: fieldName,
      });
    }

    next();
  };
};

/**
 * Validate file upload
 */
const validateFileUpload = (options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedMimeTypes = [],
    allowedExtensions = [],
  } = options;

  return (req, res, next) => {
    if (!req.file) {
      return ResponseHelper.error(res, 'No file uploaded', 400, errorCodes.FILE_UPLOAD_FAILED);
    }

    const { size, mimetype, originalname } = req.file;

    // Check file size
    if (!ValidationHelper.isValidFileSize(size, maxSize)) {
      return ResponseHelper.error(
        res,
        `File size exceeds maximum allowed size of ${maxSize} bytes`,
        400,
        errorCodes.FILE_TOO_LARGE
      );
    }

    // Check mime type
    if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(mimetype)) {
      return ResponseHelper.error(
        res,
        `File type ${mimetype} is not allowed`,
        400,
        errorCodes.FILE_TYPE_NOT_ALLOWED
      );
    }

    // Check extension
    if (allowedExtensions.length > 0) {
      const ext = originalname.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(`.${ext}`)) {
        return ResponseHelper.error(
          res,
          `File extension .${ext} is not allowed`,
          400,
          errorCodes.FILE_TYPE_NOT_ALLOWED
        );
      }
    }

    next();
  };
};

/**
 * Sanitize input strings
 */
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = ValidationHelper.sanitizeString(req.body[key]);
      }
    });
  }
  next();
};

module.exports = {
  validateRequired,
  validateUUID,
  validatePagination,
  validateEmail,
  validateFileUpload,
  sanitizeInput,
};
