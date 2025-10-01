/**
 * Date Utility
 * Date manipulation and formatting utilities
 */

const moment = require('moment');
require('moment/locale/id'); // Indonesian locale
const momentHijri = require('moment-hijri');

moment.locale('id');

class DateUtil {
  /**
   * Format date to Indonesian format
   * @param {Date|string} date - Date to format
   * @param {string} format - Moment format string
   * @returns {string} Formatted date
   */
  static formatIndonesian(date, format = 'DD MMMM YYYY') {
    return moment(date).format(format);
  }

  /**
   * Convert to Hijri date
   * @param {Date|string} date - Date to convert
   * @returns {string} Hijri date string
   */
  static toHijri(date) {
    return momentHijri(date).format('iDD iMMMM iYYYY');
  }

  /**
   * Get current timestamp
   * @returns {number} Current timestamp
   */
  static now() {
    return Date.now();
  }

  /**
   * Add days to date
   * @param {Date|string} date - Starting date
   * @param {number} days - Number of days to add
   * @returns {Date} New date
   */
  static addDays(date, days) {
    return moment(date).add(days, 'days').toDate();
  }

  /**
   * Check if date is expired
   * @param {Date|string} expiryDate - Expiry date to check
   * @returns {boolean} True if expired
   */
  static isExpired(expiryDate) {
    return moment(expiryDate).isBefore(moment());
  }

  /**
   * Get date range
   * @param {Date|string} startDate - Start date
   * @param {Date|string} endDate - End date
   * @returns {number} Days difference
   */
  static getDaysDifference(startDate, endDate) {
    return moment(endDate).diff(moment(startDate), 'days');
  }

  /**
   * Format for database
   * @param {Date|string} date - Date to format
   * @returns {Date} Database-ready date
   */
  static toDatabase(date) {
    return moment(date).toDate();
  }
}

module.exports = DateUtil;
