/**
 * File Utility
 * File system operations and validations
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

class FileUtil {
  /**
   * Ensure directory exists
   * @param {string} dirPath - Directory path
   */
  static async ensureDir(dirPath) {
    await fs.ensureDir(dirPath);
  }

  /**
   * Check if file exists
   * @param {string} filePath - File path
   * @returns {Promise<boolean>} True if file exists
   */
  static async exists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get file size in bytes
   * @param {string} filePath - File path
   * @returns {Promise<number>} File size
   */
  static async getFileSize(filePath) {
    const stats = await fs.stat(filePath);
    return stats.size;
  }

  /**
   * Calculate file checksum
   * @param {string} filePath - File path
   * @param {string} algorithm - Hash algorithm (default: sha256)
   * @returns {Promise<string>} File checksum
   */
  static async calculateChecksum(filePath, algorithm = 'sha256') {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash(algorithm);
      const stream = fs.createReadStream(filePath);

      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', reject);
    });
  }

  /**
   * Generate unique filename
   * @param {string} originalName - Original filename
   * @param {string} prefix - Optional prefix
   * @returns {string} Unique filename
   */
  static generateUniqueFilename(originalName, prefix = '') {
    const ext = path.extname(originalName);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}${timestamp}_${random}${ext}`;
  }

  /**
   * Delete file safely
   * @param {string} filePath - File path
   */
  static async deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      // Ignore error if file doesn't exist
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  /**
   * Copy file
   * @param {string} source - Source file path
   * @param {string} destination - Destination file path
   */
  static async copyFile(source, destination) {
    await fs.copy(source, destination);
  }

  /**
   * Move file
   * @param {string} source - Source file path
   * @param {string} destination - Destination file path
   */
  static async moveFile(source, destination) {
    await fs.move(source, destination);
  }

  /**
   * Read file as buffer
   * @param {string} filePath - File path
   * @returns {Promise<Buffer>} File buffer
   */
  static async readFile(filePath) {
    return await fs.readFile(filePath);
  }

  /**
   * Write buffer to file
   * @param {string} filePath - File path
   * @param {Buffer} data - Data to write
   */
  static async writeFile(filePath, data) {
    await fs.writeFile(filePath, data);
  }

  /**
   * Validate file type
   * @param {string} filename - Filename
   * @param {string[]} allowedExtensions - Allowed extensions
   * @returns {boolean} True if valid
   */
  static isValidFileType(filename, allowedExtensions) {
    const ext = path.extname(filename).toLowerCase();
    return allowedExtensions.includes(ext);
  }

  /**
   * Get file extension
   * @param {string} filename - Filename
   * @returns {string} File extension
   */
  static getExtension(filename) {
    return path.extname(filename).toLowerCase();
  }

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted size
   */
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

module.exports = FileUtil;
