/**
 * Document Service
 * Business logic for document operations
 */

const { documentRepository } = require('../../repositories');
const { DocumentHelper, QRCodeHelper } = require('../../../shared/helpers');
const { CryptoUtil, FileUtil, logger } = require('../../../shared/utils');
const { LocalStorage } = require('../../../infrastructure/storage');
const { errorCodes } = require('../../../shared/constants');

class DocumentService {
  /**
   * Generate document from template
   * @param {string} type - Document type (kkp, kkplus, etc)
   * @param {string} prodi - Program studi
   * @param {Object} data - Document data
   * @returns {Promise<Object>} Generated document info
   */
  async generateDocument(type, prodi, data) {
    try {
      logger.info(`Generating document: ${type} for ${prodi}`);

      // 1. Get document configuration with fields
      const docConfig = await documentRepository.findByTypeAndProdi(type, prodi);
      if (!docConfig) {
        throw new Error(`Document configuration not found for ${type} - ${prodi}`);
      }

      // 2. Validate required fields
      const requiredFields = docConfig.document_fields
        .filter((field) => field.is_required)
        .map((field) => field.field_name);

      const missingFields = requiredFields.filter((field) => !data[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // 3. Load template
      const templateBuffer = await DocumentHelper.loadTemplate(docConfig.template_path);

      // 4. Generate document
      const documentBuffer = DocumentHelper.generateDocument(templateBuffer, data);

      // 5. Generate unique filename and save
      const filename = DocumentHelper.generateFilename(prodi, type);
      const filePath = await DocumentHelper.saveDocument(documentBuffer, filename);

      // 6. Calculate document hash
      const documentHash = CryptoUtil.sha256(documentBuffer);

      // 7. Get file info
      const fileInfo = await LocalStorage.getFileInfo(filename, 'outputs');

      logger.info(`Document generated successfully: ${filename}`);

      return {
        filename,
        filePath: fileInfo.relativePath,
        size: fileInfo.size,
        hash: documentHash,
        type,
        prodi,
        generatedAt: new Date(),
      };
    } catch (error) {
      logger.error('Error generating document:', error);
      throw error;
    }
  }

  /**
   * Get document configuration
   * @param {string} type - Document type
   * @param {string} prodi - Program studi
   * @returns {Promise<Object>} Document configuration
   */
  async getDocumentConfig(type, prodi) {
    try {
      const config = await documentRepository.findByTypeAndProdi(type, prodi);
      if (!config) {
        throw new Error(`Document configuration not found for ${type} - ${prodi}`);
      }

      return {
        id: config.id,
        type: config.type,
        prodi: config.prodi,
        description: config.description,
        version: config.version,
        fields: config.document_fields.map((field) => ({
          name: field.field_name,
          type: field.field_type,
          required: field.is_required,
          defaultValue: field.default_value,
          helpText: field.help_text,
          displayOrder: field.display_order,
        })),
      };
    } catch (error) {
      logger.error('Error getting document config:', error);
      throw error;
    }
  }

  /**
   * List all document types
   * @returns {Promise<Array>} Document types
   */
  async listDocumentTypes() {
    try {
      const documents = await documentRepository.findActive();

      // Group by type
      const types = {};
      documents.forEach((doc) => {
        if (!types[doc.type]) {
          types[doc.type] = {
            type: doc.type,
            prodis: [],
          };
        }
        types[doc.type].prodis.push({
          prodi: doc.prodi,
          description: doc.description,
          version: doc.version,
        });
      });

      return Object.values(types);
    } catch (error) {
      logger.error('Error listing document types:', error);
      throw error;
    }
  }

  /**
   * Validate template
   * @param {string} type - Document type
   * @param {string} prodi - Program studi
   * @returns {Promise<Object>} Validation result
   */
  async validateTemplate(type, prodi) {
    try {
      const config = await documentRepository.findByTypeAndProdi(type, prodi);
      if (!config) {
        throw new Error(`Document configuration not found`);
      }

      const templateBuffer = await DocumentHelper.loadTemplate(config.template_path);
      const requiredFields = config.document_fields
        .filter((f) => f.is_required)
        .map((f) => f.field_name);

      const validation = DocumentHelper.validateTemplate(templateBuffer, requiredFields);

      return {
        valid: validation.valid,
        templatePath: config.template_path,
        requiredFields,
        foundFields: validation.foundFields || [],
        missingFields: validation.missingFields || [],
        error: validation.error,
      };
    } catch (error) {
      logger.error('Error validating template:', error);
      throw error;
    }
  }

  /**
   * Get document by ID
   * @param {number} id - Document ID
   * @returns {Promise<Object>} Document
   */
  async getDocumentById(id) {
    try {
      const document = await documentRepository.findWithFields(id);
      if (!document) {
        throw new Error('Document not found');
      }
      return document;
    } catch (error) {
      logger.error('Error getting document:', error);
      throw error;
    }
  }

  /**
   * Create new document configuration
   * @param {Object} data - Document data
   * @returns {Promise<Object>} Created document
   */
  async createDocument(data) {
    try {
      logger.info('Creating document configuration:', data);

      const document = await documentRepository.create({
        type: data.type,
        prodi: data.prodi,
        template_path: data.templatePath,
        description: data.description,
        version: data.version || '1.0',
        is_active: true,
      });

      logger.info(`Document configuration created: ${document.id}`);
      return document;
    } catch (error) {
      logger.error('Error creating document:', error);
      throw error;
    }
  }

  /**
   * Update document configuration
   * @param {number} id - Document ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated document
   */
  async updateDocument(id, data) {
    try {
      logger.info(`Updating document ${id}:`, data);

      const document = await documentRepository.update(id, {
        template_path: data.templatePath,
        description: data.description,
        version: data.version,
        is_active: data.isActive,
      });

      logger.info(`Document configuration updated: ${id}`);
      return document;
    } catch (error) {
      logger.error('Error updating document:', error);
      throw error;
    }
  }

  /**
   * Delete document configuration
   * @param {number} id - Document ID
   */
  async deleteDocument(id) {
    try {
      logger.info(`Deleting document configuration: ${id}`);
      await documentRepository.delete(id);
      logger.info(`Document configuration deleted: ${id}`);
    } catch (error) {
      logger.error('Error deleting document:', error);
      throw error;
    }
  }
}

module.exports = new DocumentService();
