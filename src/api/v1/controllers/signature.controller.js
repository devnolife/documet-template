/**
 * Signature Controller
 * Handles HTTP requests for digital signature operations
 */

const { signatureService, signerService } = require('../../../core/services');
const { ResponseHelper } = require('../../../shared/helpers');
const { logger } = require('../../../shared/utils');
const { HTTP_STATUS } = require('../../../shared/constants');

class SignatureController {
  /**
   * Sign a document
   * POST /api/v1/signatures/sign
   */
  async signDocument(req, res, next) {
    try {
      const { documentId, signerId, metadata } = req.body;
      const userId = req.user?.id;

      logger.info('Signing document', {
        documentId,
        signerId,
        userId,
        ip: req.ip,
      });

      const result = await signatureService.signDocument(documentId, signerId, metadata);

      logger.info('Document signed successfully', {
        documentId,
        signatureId: result.signature.id,
        completed: result.completed,
      });

      return ResponseHelper.success(
        res,
        result,
        'Document signed successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      logger.error('Error signing document', {
        error: error.message,
        stack: error.stack,
        body: req.body,
      });
      next(error);
    }
  }

  /**
   * Verify document signatures
   * GET /api/v1/signatures/verify/:documentId
   */
  async verifyDocument(req, res, next) {
    try {
      const { documentId } = req.params;

      logger.info('Verifying document', { documentId });

      const verification = await signatureService.verifyDocument(documentId);

      return ResponseHelper.success(
        res,
        verification,
        verification.valid ? 'Document verification successful' : 'Document verification failed'
      );
    } catch (error) {
      logger.error('Error verifying document', {
        error: error.message,
        documentId: req.params.documentId,
      });
      next(error);
    }
  }

  /**
   * Get document signatures
   * GET /api/v1/signatures/document/:documentId
   */
  async getDocumentSignatures(req, res, next) {
    try {
      const { documentId } = req.params;

      const signatures = await signatureService.getDocumentSignatures(documentId);

      return ResponseHelper.success(res, signatures, 'Signatures retrieved successfully');
    } catch (error) {
      logger.error('Error getting document signatures', {
        error: error.message,
        documentId: req.params.documentId,
      });
      next(error);
    }
  }

  /**
   * Get signature by ID
   * GET /api/v1/signatures/:id
   */
  async getSignature(req, res, next) {
    try {
      const { id } = req.params;

      const signature = await signatureService.getSignatureById(id);

      if (!signature) {
        return ResponseHelper.error(
          res,
          'Signature not found',
          HTTP_STATUS.NOT_FOUND,
          'SIGNATURE_NOT_FOUND'
        );
      }

      return ResponseHelper.success(res, signature, 'Signature retrieved successfully');
    } catch (error) {
      logger.error('Error getting signature', {
        error: error.message,
        signatureId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * Generate QR code for document
   * POST /api/v1/signatures/qrcode
   */
  async generateQRCode(req, res, next) {
    try {
      const { documentId, data } = req.body;

      logger.info('Generating QR code', { documentId });

      const qrCode = await signatureService.generateQRCode(documentId, data);

      return ResponseHelper.success(
        res,
        qrCode,
        'QR code generated successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      logger.error('Error generating QR code', {
        error: error.message,
        body: req.body,
      });
      next(error);
    }
  }

  /**
   * Get verification logs for a document
   * GET /api/v1/signatures/logs/:documentId
   */
  async getVerificationLogs(req, res, next) {
    try {
      const { documentId } = req.params;
      const { page = 1, limit = 20 } = req.query;

      const logs = await signatureService.getVerificationLogs(documentId, {
        page: parseInt(page),
        limit: parseInt(limit),
      });

      return ResponseHelper.success(res, logs, 'Verification logs retrieved successfully');
    } catch (error) {
      logger.error('Error getting verification logs', {
        error: error.message,
        documentId: req.params.documentId,
      });
      next(error);
    }
  }

  /**
   * Revoke a signature
   * POST /api/v1/signatures/:id/revoke
   */
  async revokeSignature(req, res, next) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const userId = req.user?.id;

      logger.warn('Revoking signature', {
        signatureId: id,
        reason,
        userId,
      });

      await signatureService.revokeSignature(id, reason);

      logger.info('Signature revoked', { signatureId: id });

      return ResponseHelper.success(res, null, 'Signature revoked successfully');
    } catch (error) {
      logger.error('Error revoking signature', {
        error: error.message,
        signatureId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * Create a new signer
   * POST /api/v1/signatures/signers
   */
  async createSigner(req, res, next) {
    try {
      const { nbm, name, role, prodi, email, phone, position } = req.body;

      logger.info('Creating new signer', {
        nbm,
        name,
        role,
        prodi,
        createdBy: req.user?.id,
      });

      const signer = await signerService.createSigner({
        nbm,
        name,
        role,
        prodi,
        email,
        phone,
        position,
      });

      logger.info('Signer created successfully', {
        signerId: signer.id,
        nbm: signer.nbm,
      });

      return ResponseHelper.success(
        res,
        signer,
        'Signer created successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      logger.error('Error creating signer', {
        error: error.message,
        body: req.body,
      });
      next(error);
    }
  }

  /**
   * Get signer by ID
   * GET /api/v1/signatures/signers/:id
   */
  async getSigner(req, res, next) {
    try {
      const { id } = req.params;

      const signer = await signerService.getSignerById(id);

      if (!signer) {
        return ResponseHelper.error(
          res,
          'Signer not found',
          HTTP_STATUS.NOT_FOUND,
          'SIGNER_NOT_FOUND'
        );
      }

      return ResponseHelper.success(res, signer, 'Signer retrieved successfully');
    } catch (error) {
      logger.error('Error getting signer', {
        error: error.message,
        signerId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * Get signer by NBM
   * GET /api/v1/signatures/signers/nbm/:nbm
   */
  async getSignerByNBM(req, res, next) {
    try {
      const { nbm } = req.params;

      const signer = await signerService.getSignerByNBM(nbm);

      if (!signer) {
        return ResponseHelper.error(
          res,
          'Signer not found',
          HTTP_STATUS.NOT_FOUND,
          'SIGNER_NOT_FOUND'
        );
      }

      return ResponseHelper.success(res, signer, 'Signer retrieved successfully');
    } catch (error) {
      logger.error('Error getting signer by NBM', {
        error: error.message,
        nbm: req.params.nbm,
      });
      next(error);
    }
  }

  /**
   * List signers
   * GET /api/v1/signatures/signers
   */
  async listSigners(req, res, next) {
    try {
      const { role, prodi, page = 1, limit = 20 } = req.query;

      let signers;

      if (role) {
        signers = await signerService.listSignersByRole(role, {
          page: parseInt(page),
          limit: parseInt(limit),
        });
      } else if (prodi) {
        signers = await signerService.listSignersByProdi(prodi, {
          page: parseInt(page),
          limit: parseInt(limit),
        });
      } else {
        signers = await signerService.listSigners({
          page: parseInt(page),
          limit: parseInt(limit),
        });
      }

      return ResponseHelper.success(res, signers, 'Signers retrieved successfully');
    } catch (error) {
      logger.error('Error listing signers', {
        error: error.message,
        query: req.query,
      });
      next(error);
    }
  }

  /**
   * Update signer
   * PATCH /api/v1/signatures/signers/:id
   */
  async updateSigner(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const signer = await signerService.updateSigner(id, updateData);

      logger.info('Signer updated', {
        signerId: id,
        updates: Object.keys(updateData),
        updatedBy: req.user?.id,
      });

      return ResponseHelper.success(res, signer, 'Signer updated successfully');
    } catch (error) {
      logger.error('Error updating signer', {
        error: error.message,
        signerId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * Deactivate signer
   * POST /api/v1/signatures/signers/:id/deactivate
   */
  async deactivateSigner(req, res, next) {
    try {
      const { id } = req.params;

      await signerService.deactivateSigner(id);

      logger.info('Signer deactivated', {
        signerId: id,
        deactivatedBy: req.user?.id,
      });

      return ResponseHelper.success(res, null, 'Signer deactivated successfully');
    } catch (error) {
      logger.error('Error deactivating signer', {
        error: error.message,
        signerId: req.params.id,
      });
      next(error);
    }
  }

  /**
   * Rotate signer keys
   * POST /api/v1/signatures/signers/:id/rotate-keys
   */
  async rotateSignerKeys(req, res, next) {
    try {
      const { id } = req.params;

      logger.warn('Rotating signer keys', {
        signerId: id,
        initiatedBy: req.user?.id,
      });

      const signer = await signerService.rotateSignerKeys(id);

      logger.info('Signer keys rotated successfully', {
        signerId: id,
      });

      return ResponseHelper.success(res, signer, 'Signer keys rotated successfully');
    } catch (error) {
      logger.error('Error rotating signer keys', {
        error: error.message,
        signerId: req.params.id,
      });
      next(error);
    }
  }
}

module.exports = new SignatureController();
