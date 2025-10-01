/**
 * Response Helper
 * Standardized API response formatting
 */

const { statusCodes } = require('../constants');

class ResponseHelper {
  /**
   * Success response
   * @param {Object} res - Express response object
   * @param {any} data - Response data
   * @param {string} message - Success message
   * @param {number} statusCode - HTTP status code
   */
  static success(res, data = null, message = 'Success', statusCode = statusCodes.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Error response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {string} errorCode - Application error code
   * @param {any} details - Additional error details
   */
  static error(res, message, statusCode = statusCodes.INTERNAL_SERVER_ERROR, errorCode = null, details = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errorCode,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Paginated response
   * @param {Object} res - Express response object
   * @param {Array} data - Response data array
   * @param {Object} pagination - Pagination info
   */
  static paginated(res, data, pagination) {
    return res.status(statusCodes.OK).json({
      success: true,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
      },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Created response
   * @param {Object} res - Express response object
   * @param {any} data - Created resource data
   * @param {string} message - Success message
   */
  static created(res, data, message = 'Resource created successfully') {
    return this.success(res, data, message, statusCodes.CREATED);
  }

  /**
   * No content response
   * @param {Object} res - Express response object
   */
  static noContent(res) {
    return res.status(statusCodes.NO_CONTENT).send();
  }

  /**
   * Not found response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static notFound(res, message = 'Resource not found') {
    return this.error(res, message, statusCodes.NOT_FOUND, 'NOT_FOUND');
  }

  /**
   * Validation error response
   * @param {Object} res - Express response object
   * @param {Array} errors - Validation errors
   */
  static validationError(res, errors) {
    return this.error(
      res,
      'Validation failed',
      statusCodes.UNPROCESSABLE_ENTITY,
      'VALIDATION_ERROR',
      errors
    );
  }

  /**
   * Unauthorized response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static unauthorized(res, message = 'Unauthorized access') {
    return this.error(res, message, statusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
  }

  /**
   * Forbidden response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static forbidden(res, message = 'Access forbidden') {
    return this.error(res, message, statusCodes.FORBIDDEN, 'FORBIDDEN');
  }
}

module.exports = ResponseHelper;
