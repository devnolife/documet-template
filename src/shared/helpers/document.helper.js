/**
 * Document Helper
 * Document processing and manipulation helpers
 */

const Docxtemplater = require('docxtemplater');
const ImageModule = require('docxtemplater-image-module-free');
const PizZip = require('pizzip');
const path = require('path');
const { FileUtil } = require('../utils');
const config = require('../../config').storage;

class DocumentHelper {
  /**
   * Load template file
   * @param {string} templatePath - Path to template
   * @returns {Promise<Buffer>} Template buffer
   */
  static async loadTemplate(templatePath) {
    const fullPath = path.join(config.paths.templates, templatePath);
    
    if (!(await FileUtil.exists(fullPath))) {
      throw new Error(`Template not found: ${templatePath}`);
    }

    return await FileUtil.readFile(fullPath);
  }

  /**
   * Create document from template
   * @param {Buffer} templateBuffer - Template file buffer
   * @param {Object} data - Data to fill in template
   * @returns {Buffer} Generated document buffer
   */
  static generateDocument(templateBuffer, data) {
    try {
      const zip = new PizZip(templateBuffer);
      
      // Configure image module
      const imageOpts = {
        centered: false,
        getImage: (tagValue) => Buffer.from(tagValue, 'base64'),
        getSize: () => [150, 150],
      };

      const doc = new Docxtemplater(zip, {
        modules: [new ImageModule(imageOpts)],
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.render(data);

      return doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });
    } catch (error) {
      throw new Error(`Document generation failed: ${error.message}`);
    }
  }

  /**
   * Save generated document
   * @param {Buffer} documentBuffer - Document buffer
   * @param {string} filename - Output filename
   * @returns {Promise<string>} Path to saved document
   */
  static async saveDocument(documentBuffer, filename) {
    const outputDir = config.paths.outputs;
    await FileUtil.ensureDir(outputDir);

    const outputPath = path.join(outputDir, filename);
    await FileUtil.writeFile(outputPath, documentBuffer);

    return outputPath;
  }

  /**
   * Generate unique document filename
   * @param {string} prodi - Program studi
   * @param {string} type - Document type
   * @returns {string} Unique filename
   */
  static generateFilename(prodi, type) {
    const timestamp = Date.now();
    return `${prodi}_${type}_${timestamp}.docx`;
  }

  /**
   * Validate template placeholders
   * @param {Buffer} templateBuffer - Template buffer
   * @param {string[]} requiredFields - Required field names
   * @returns {Object} Validation result
   */
  static validateTemplate(templateBuffer, requiredFields) {
    try {
      const zip = new PizZip(templateBuffer);
      const doc = new Docxtemplater(zip);
      
      const tags = doc.getFullText().match(/\{([^}]+)\}/g) || [];
      const foundFields = tags.map(tag => tag.replace(/[{}]/g, ''));
      
      const missing = requiredFields.filter(field => !foundFields.includes(field));
      
      return {
        valid: missing.length === 0,
        foundFields,
        missingFields: missing,
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }

  /**
   * Extract text from document
   * @param {Buffer} documentBuffer - Document buffer
   * @returns {string} Extracted text
   */
  static extractText(documentBuffer) {
    try {
      const zip = new PizZip(documentBuffer);
      const doc = new Docxtemplater(zip);
      return doc.getFullText();
    } catch (error) {
      throw new Error(`Text extraction failed: ${error.message}`);
    }
  }

  /**
   * Get template info
   * @param {string} templatePath - Template path
   * @returns {Promise<Object>} Template information
   */
  static async getTemplateInfo(templatePath) {
    const fullPath = path.join(config.paths.templates, templatePath);
    
    if (!(await FileUtil.exists(fullPath))) {
      return null;
    }

    const size = await FileUtil.getFileSize(fullPath);
    const checksum = await FileUtil.calculateChecksum(fullPath);

    return {
      path: templatePath,
      size,
      checksum,
      exists: true,
    };
  }
}

module.exports = DocumentHelper;
