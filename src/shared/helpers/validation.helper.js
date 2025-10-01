/**
 * Validation Helper
 * Data validation and sanitization helpers
 */

class ValidationHelper {
  /**
   * Validate required fields
   * @param {Object} data - Data to validate
   * @param {string[]} requiredFields - Required field names
   * @returns {Object} Validation result
   */
  static validateRequired(data, requiredFields) {
    const missing = [];

    for (const field of requiredFields) {
      if (!data[field] || data[field] === '') {
        missing.push(field);
      }
    }

    return {
      valid: missing.length === 0,
      missing,
    };
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number (Indonesian format)
   * @param {string} phone - Phone number
   * @returns {boolean} True if valid
   */
  static isValidPhone(phone) {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  }

  /**
   * Validate UUID format
   * @param {string} uuid - UUID to validate
   * @returns {boolean} True if valid
   */
  static isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Sanitize string input
   * @param {string} input - Input string
   * @returns {string} Sanitized string
   */
  static sanitizeString(input) {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Validate NBM format
   * @param {string} nbm - NBM to validate
   * @returns {boolean} True if valid
   */
  static isValidNBM(nbm) {
    // NBM format: typically 10-20 digits
    const nbmRegex = /^[0-9]{10,20}$/;
    return nbmRegex.test(nbm);
  }

  /**
   * Validate date format
   * @param {string} date - Date string
   * @returns {boolean} True if valid
   */
  static isValidDate(date) {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate);
  }

  /**
   * Validate field type
   * @param {any} value - Value to validate
   * @param {string} type - Expected type
   * @returns {boolean} True if valid
   */
  static isValidType(value, type) {
    switch (type) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'boolean':
        return typeof value === 'boolean';
      case 'array':
        return Array.isArray(value);
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      case 'date':
        return this.isValidDate(value);
      case 'email':
        return this.isValidEmail(value);
      default:
        return false;
    }
  }

  /**
   * Validate pagination parameters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {number} maxLimit - Maximum allowed limit
   * @returns {Object} Validated parameters
   */
  static validatePagination(page = 1, limit = 10, maxLimit = 100) {
    const validPage = Math.max(1, parseInt(page) || 1);
    const validLimit = Math.min(maxLimit, Math.max(1, parseInt(limit) || 10));

    return {
      page: validPage,
      limit: validLimit,
      offset: (validPage - 1) * validLimit,
    };
  }

  /**
   * Validate JSON string
   * @param {string} jsonString - JSON string
   * @returns {Object} Validation result with parsed data
   */
  static validateJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      return {
        valid: true,
        data: parsed,
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }

  /**
   * Validate file size
   * @param {number} size - File size in bytes
   * @param {number} maxSize - Maximum allowed size
   * @returns {boolean} True if valid
   */
  static isValidFileSize(size, maxSize) {
    return size > 0 && size <= maxSize;
  }
}

module.exports = ValidationHelper;
