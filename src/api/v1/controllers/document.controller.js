/**
 * Document Controller
 * Handles HTTP requests for document operations
 */

const { documentService } = require('../../../core/services');
const { ResponseHelper } = require('../../../shared/helpers');
const { logger } = require('../../../shared/utils');
const { HTTP_STATUS } = require('../../../shared/constants');

class DocumentController {
  /**
   * Generate a new document
   * POST /api/v1/documents/generate
   */
  async generateDocument(req, res, next) {
    try {
      const { type, prodi, data } = req.body;
      const userId = req.user?.id;

      logger.info('Generating document', {
        type,
        prodi,
        userId,
        ip: req.ip,
      });

      const result = await documentService.generateDocument(type, prodi, data, userId);

      logger.info('Document generated successfully', {
        documentId: result.document.id,
        filePath: result.filePath,
      });

      return ResponseHelper.success(
        res,
        result,
        'Document generated successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      logger.error('Error generating document', {
        error: error.message,
        stack: error.stack,
        body: req.body,
      });
      next(error);
    }
  }

  /**
   * Get document by ID
   * GET /api/v1/documents/:id
   */
  async getDocument(req, res, next) {
    try {
      const { id } = req.params;

      const document = await documentService.getDocumentById(id);

      if (!document) {
        return ResponseHelper.error(
          res,
          'Document not found',
          HTTP_STATUS.NOT_FOUND,
          'DOCUMENT_NOT_FOUND'
        );
      }

      return ResponseHelper.success(res, document, 'Document retrieved successfully');
    } catch (error) {
      logger.error('Error getting document', {
        error: error.message,
        documentId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * List documents with pagination and filters
   * GET /api/v1/documents
   */
  async listDocuments(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        type,
        prodi,
        status,
        sortBy = 'created_at',
        sortOrder = 'desc',
      } = req.query;

      const filters = {};
      if (type) filters.type = type;
      if (prodi) filters.prodi = prodi;
      if (status) filters.status = status;

      const result = await documentService.listDocuments({
        page: parseInt(page),
        limit: parseInt(limit),
        filters,
        sortBy,
        sortOrder,
      });

      return ResponseHelper.success(res, result, 'Documents retrieved successfully');
    } catch (error) {
      logger.error('Error listing documents', {
        error: error.message,
        query: req.query,
      });
      next(error);
    }
  }

  /**
   * Get document configuration
   * GET /api/v1/documents/config/:type/:prodi
   */
  async getDocumentConfig(req, res, next) {
    try {
      const { type, prodi } = req.params;

      const config = await documentService.getDocumentConfig(type, prodi);

      if (!config) {
        return ResponseHelper.error(
          res,
          'Document configuration not found',
          HTTP_STATUS.NOT_FOUND,
          'CONFIG_NOT_FOUND'
        );
      }

      return ResponseHelper.success(res, config, 'Configuration retrieved successfully');
    } catch (error) {
      logger.error('Error getting document config', {
        error: error.message,
        type: req.params.type,
        prodi: req.params.prodi,
      });
      next(error);
    }
  }

  /**
   * List available document types
   * GET /api/v1/documents/types
   */
  async listDocumentTypes(req, res, next) {
    try {
      const types = await documentService.listDocumentTypes();

      return ResponseHelper.success(res, types, 'Document types retrieved successfully');
    } catch (error) {
      logger.error('Error listing document types', {
        error: error.message,
      });
      next(error);
    }
  }

  /**
   * Validate document template
   * POST /api/v1/documents/validate-template
   */
  async validateTemplate(req, res, next) {
    try {
      const { type, prodi } = req.body;

      const validation = await documentService.validateTemplate(type, prodi);

      return ResponseHelper.success(
        res,
        validation,
        validation.valid ? 'Template is valid' : 'Template validation failed'
      );
    } catch (error) {
      logger.error('Error validating template', {
        error: error.message,
        body: req.body,
      });
      next(error);
    }
  }

  /**
   * Download document file
   * GET /api/v1/documents/:id/download
   */
  async downloadDocument(req, res, next) {
    try {
      const { id } = req.params;

      const document = await documentService.getDocumentById(id);

      if (!document) {
        return ResponseHelper.error(
          res,
          'Document not found',
          HTTP_STATUS.NOT_FOUND,
          'DOCUMENT_NOT_FOUND'
        );
      }

      if (!document.file_path) {
        return ResponseHelper.error(
          res,
          'Document file not found',
          HTTP_STATUS.NOT_FOUND,
          'FILE_NOT_FOUND'
        );
      }

      const fs = require('fs');
      const path = require('path');

      const filePath = path.resolve(document.file_path);

      if (!fs.existsSync(filePath)) {
        return ResponseHelper.error(
          res,
          'Document file does not exist',
          HTTP_STATUS.NOT_FOUND,
          'FILE_NOT_FOUND'
        );
      }

      const fileName = path.basename(filePath);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

      logger.info('Document downloaded', {
        documentId: id,
        fileName,
        userId: req.user?.id,
      });

      return res.sendFile(filePath);
    } catch (error) {
      logger.error('Error downloading document', {
        error: error.message,
        documentId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * Get document verification info
   * GET /api/v1/documents/:id/verify
   */
  async verifyDocument(req, res, next) {
    try {
      const { id } = req.params;

      const document = await documentService.getDocumentById(id);

      if (!document) {
        return ResponseHelper.error(
          res,
          'Document not found',
          HTTP_STATUS.NOT_FOUND,
          'DOCUMENT_NOT_FOUND'
        );
      }

      const verificationInfo = {
        documentId: document.id,
        hash: document.hash,
        createdAt: document.created_at,
        type: document.type,
        prodi: document.prodi,
        status: document.status,
        signatures: document.document_signatures?.length || 0,
        qrCode: document.qr_code_path,
      };

      return ResponseHelper.success(
        res,
        verificationInfo,
        'Verification info retrieved successfully'
      );
    } catch (error) {
      logger.error('Error verifying document', {
        error: error.message,
        documentId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * Update document metadata
   * PATCH /api/v1/documents/:id
   */
  async updateDocument(req, res, next) {
    try {
      const { id } = req.params;
      const { metadata, status } = req.body;

      const updateData = {};
      if (metadata) updateData.metadata = metadata;
      if (status) updateData.status = status;

      const document = await documentService.updateDocument(id, updateData);

      logger.info('Document updated', {
        documentId: id,
        updates: Object.keys(updateData),
        userId: req.user?.id,
      });

      return ResponseHelper.success(res, document, 'Document updated successfully');
    } catch (error) {
      logger.error('Error updating document', {
        error: error.message,
        documentId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * Delete document
   * DELETE /api/v1/documents/:id
   */
  async deleteDocument(req, res, next) {
    try {
      const { id } = req.params;

      await documentService.deleteDocument(id);

      logger.info('Document deleted', {
        documentId: id,
        userId: req.user?.id,
      });

      return ResponseHelper.success(res, null, 'Document deleted successfully');
    } catch (error) {
      logger.error('Error deleting document', {
        error: error.message,
        documentId: req.params.id,
      });
      next(error);
    }
  }
}

module.exports = new DocumentController();
