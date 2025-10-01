/**
 * QR Code Helper
 * QR code generation and management
 */

const QRCode = require('qrcode');
const path = require('path');
const { FileUtil } = require('../utils');
const config = require('../../config').storage;

class QRCodeHelper {
  /**
   * Generate QR code image
   * @param {Object} data - Data to encode in QR
   * @param {string} filename - Output filename
   * @returns {Promise<string>} Path to generated QR code
   */
  static async generate(data, filename) {
    try {
      const qrDir = config.paths.qrcodes;
      await FileUtil.ensureDir(qrDir);

      const qrPath = path.join(qrDir, filename);
      const jsonData = JSON.stringify(data);

      await QRCode.toFile(qrPath, jsonData, {
        width: config.qrCode.size,
        margin: config.qrCode.margin,
        errorCorrectionLevel: config.qrCode.errorCorrectionLevel,
      });

      return qrPath;
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }

  /**
   * Generate QR code as data URL
   * @param {Object} data - Data to encode
   * @returns {Promise<string>} Data URL
   */
  static async generateDataURL(data) {
    try {
      const jsonData = JSON.stringify(data);
      return await QRCode.toDataURL(jsonData, {
        width: config.qrCode.size,
        margin: config.qrCode.margin,
        errorCorrectionLevel: config.qrCode.errorCorrectionLevel,
      });
    } catch (error) {
      throw new Error(`Failed to generate QR data URL: ${error.message}`);
    }
  }

  /**
   * Create verification QR data
   * @param {string} documentId - Document UUID
   * @param {string} documentHash - Document hash
   * @param {Array} signatures - Signature data
   * @returns {Object} QR data object
   */
  static createVerificationData(documentId, documentHash, signatures) {
    return {
      id: documentId,
      hash: documentHash,
      signatures: signatures.map(sig => ({
        signer: sig.signer_info,
        timestamp: sig.timestamp,
        hash: sig.signature_hash,
      })),
      verifyUrl: `${process.env.APP_URL || 'http://localhost:8080'}/api/v1/verify/${documentId}`,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Generate filename for QR code
   * @param {string} documentId - Document ID
   * @returns {string} QR code filename
   */
  static generateFilename(documentId) {
    return `qr_${documentId}.png`;
  }
}

module.exports = QRCodeHelper;
