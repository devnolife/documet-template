/**
 * Signature Service
 * Business logic for digital signature operations
 */

const { signatureRepository, signerRepository } = require('../../repositories');
const { CryptoUtil, logger } = require('../../../shared/utils');
const { QRCodeHelper } = require('../../../shared/helpers');
const { LocalStorage } = require('../../../infrastructure/storage');
const { prisma } = require('../../../infrastructure/database');

class SignatureService {
  /**
   * Sign a document
   * @param {string} documentId - Signed document UUID
   * @param {number} signerId - Signer ID
   * @returns {Promise<Object>} Signature result
   */
  async signDocument(documentId, signerId) {
    try {
      logger.info(`Signing document ${documentId} by signer ${signerId}`);

      // 1. Get signed document
      const signedDoc = await signatureRepository.findWithSignatures(documentId);
      if (!signedDoc) {
        throw new Error('Document not found');
      }

      // 2. Check if document is already complete
      if (signedDoc.is_complete) {
        throw new Error('Document is already fully signed');
      }

      // 3. Get signer information
      const signer = await signerRepository.findById(signerId);
      if (!signer) {
        throw new Error('Signer not found');
      }

      if (!signer.is_active) {
        throw new Error('Signer is not active');
      }

      // 4. Check if signer already signed this document
      const existingSignature = signedDoc.document_signatures.find(
        (sig) => sig.signer_id === signerId
      );
      if (existingSignature) {
        throw new Error('Signer has already signed this document');
      }

      // 5. Sign the document hash
      const signature = CryptoUtil.signData(signedDoc.document_hash, signer.private_key);
      const signatureHash = CryptoUtil.sha256(signature);

      // 6. Create signature record
      const signerInfo = {
        name: signer.name,
        nbm: signer.nbm,
        role: signer.role,
        department: signer.department,
        position: signer.position_title,
      };

      await prisma.document_signatures.create({
        data: {
          signed_doc_id: documentId,
          signer_id: signerId,
          signature_data: signature,
          signature_hash: signatureHash,
          signer_info: JSON.stringify(signerInfo),
          algorithm: 'EdDSA',
          timestamp: new Date(),
          is_valid: true,
        },
      });

      // 7. Update signature count
      const newCount = signedDoc.total_signatures_received + 1;
      const isComplete = newCount >= signedDoc.total_signatures_required;

      await signatureRepository.update(documentId, {
        total_signatures_received: newCount,
        is_complete: isComplete,
        ...(isComplete && {
          status: 'completed',
          completed_at: new Date(),
        }),
      });

      // 8. Update signer's last signed timestamp
      await signerRepository.updateLastSigned(signerId);

      // 9. Create audit log
      await prisma.document_history.create({
        data: {
          signed_doc_id: documentId,
          action: 'signed',
          description: `Document signed by ${signer.name} (${signer.role})`,
          performed_by: signer.name,
          metadata: JSON.stringify({
            signerId,
            signatureHash,
            timestamp: new Date(),
          }),
        },
      });

      logger.info(`Document ${documentId} signed successfully by ${signer.name}`);

      return {
        success: true,
        documentId,
        signer: signerInfo,
        signatureHash,
        timestamp: new Date(),
        signaturesReceived: newCount,
        signaturesRequired: signedDoc.total_signatures_required,
        isComplete,
      };
    } catch (error) {
      logger.error('Error signing document:', error);
      throw error;
    }
  }

  /**
   * Verify document signatures
   * @param {string} documentId - Document UUID
   * @returns {Promise<Object>} Verification result
   */
  async verifyDocument(documentId) {
    try {
      logger.info(`Verifying document ${documentId}`);

      // 1. Get document with signatures
      const signedDoc = await signatureRepository.findWithSignatures(documentId);
      if (!signedDoc) {
        throw new Error('Document not found');
      }

      // 2. Verify each signature
      const verificationResults = [];
      let allValid = true;

      for (const sig of signedDoc.document_signatures) {
        const isValid = CryptoUtil.verifySignature(
          signedDoc.document_hash,
          sig.signature_data,
          sig.signer.public_key
        );

        verificationResults.push({
          signer: JSON.parse(sig.signer_info),
          timestamp: sig.timestamp,
          valid: isValid,
          signatureHash: sig.signature_hash,
        });

        if (!isValid) {
          allValid = false;
        }
      }

      // 3. Log verification attempt
      await prisma.verification_logs.create({
        data: {
          signed_doc_id: documentId,
          verification_method: 'api_call',
          verification_result: allValid,
          verification_details: JSON.stringify({
            signaturesChecked: verificationResults.length,
            allValid,
            results: verificationResults,
          }),
        },
      });

      logger.info(`Document ${documentId} verification completed: ${allValid}`);

      return {
        documentId,
        documentHash: signedDoc.document_hash,
        isValid: allValid,
        isComplete: signedDoc.is_complete,
        status: signedDoc.status,
        signatures: verificationResults,
        verifiedAt: new Date(),
      };
    } catch (error) {
      logger.error('Error verifying document:', error);
      throw error;
    }
  }

  /**
   * Get document signatures
   * @param {string} documentId - Document UUID
   * @returns {Promise<Object>} Document signatures
   */
  async getDocumentSignatures(documentId) {
    try {
      const signedDoc = await signatureRepository.findWithSignatures(documentId);
      if (!signedDoc) {
        throw new Error('Document not found');
      }

      return {
        documentId,
        type: signedDoc.document_type,
        prodi: signedDoc.prodi,
        status: signedDoc.status,
        isComplete: signedDoc.is_complete,
        signaturesRequired: signedDoc.total_signatures_required,
        signaturesReceived: signedDoc.total_signatures_received,
        signatures: signedDoc.document_signatures.map((sig) => ({
          signer: JSON.parse(sig.signer_info),
          timestamp: sig.timestamp,
          isValid: sig.is_valid,
          algorithm: sig.algorithm,
        })),
        createdAt: signedDoc.created_at,
        completedAt: signedDoc.completed_at,
      };
    } catch (error) {
      logger.error('Error getting document signatures:', error);
      throw error;
    }
  }

  /**
   * Generate QR code for document
   * @param {string} documentId - Document UUID
   * @returns {Promise<Object>} QR code info
   */
  async generateQRCode(documentId) {
    try {
      logger.info(`Generating QR code for document ${documentId}`);

      const signedDoc = await signatureRepository.findWithSignatures(documentId);
      if (!signedDoc) {
        throw new Error('Document not found');
      }

      // Create QR data
      const qrData = QRCodeHelper.createVerificationData(
        documentId,
        signedDoc.document_hash,
        signedDoc.document_signatures
      );

      // Generate QR code image
      const filename = QRCodeHelper.generateFilename(documentId);
      const qrPath = await QRCodeHelper.generate(qrData, filename);

      // Update document with QR code info
      await signatureRepository.update(documentId, {
        qr_code_data: JSON.stringify(qrData),
        qr_code_image: filename,
      });

      logger.info(`QR code generated for document ${documentId}`);

      return {
        documentId,
        qrCodePath: qrPath,
        qrCodeFilename: filename,
        qrData,
      };
    } catch (error) {
      logger.error('Error generating QR code:', error);
      throw error;
    }
  }

  /**
   * Get verification logs for document
   * @param {string} documentId - Document UUID
   * @returns {Promise<Array>} Verification logs
   */
  async getVerificationLogs(documentId) {
    try {
      const logs = await prisma.verification_logs.findMany({
        where: { signed_doc_id: documentId },
        orderBy: { verified_at: 'desc' },
      });

      return logs.map((log) => ({
        verifiedAt: log.verified_at,
        method: log.verification_method,
        result: log.verification_result,
        details: JSON.parse(log.verification_details || '{}'),
        verifierIp: log.verifier_ip,
      }));
    } catch (error) {
      logger.error('Error getting verification logs:', error);
      throw error;
    }
  }
}

module.exports = new SignatureService();
