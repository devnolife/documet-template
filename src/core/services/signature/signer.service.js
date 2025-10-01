/**
 * Signer Service
 * Business logic for signer management
 */

const { signerRepository } = require('../../repositories');
const { CryptoUtil, logger } = require('../../../shared/utils');
const config = require('../../../config').signature;

class SignerService {
  /**
   * Create new signer with EdDSA keys
   * @param {Object} data - Signer data
   * @returns {Promise<Object>} Created signer
   */
  async createSigner(data) {
    try {
      logger.info('Creating new signer:', { name: data.name, role: data.role });

      // Generate EdDSA key pair
      const { publicKey, privateKey, keyId } = CryptoUtil.generateEdDSAKeyPair();

      // Encrypt private key
      const encryptionKey = process.env.PRIVATE_KEY_ENCRYPTION_PASSWORD || 'default-key';
      const encryptedPrivateKey = CryptoUtil.encrypt(privateKey, encryptionKey);

      // Create signer
      const signer = await signerRepository.create({
        name: data.name,
        nbm: data.nbm,
        email: data.email,
        phone: data.phone,
        role: data.role,
        department: data.department,
        prodi: data.prodi,
        public_key: publicKey,
        private_key: JSON.stringify(encryptedPrivateKey),
        key_id: keyId,
        signature_image_path: data.signatureImagePath,
        position_title: data.positionTitle,
        is_active: true,
      });

      logger.info(`Signer created successfully: ${signer.id}`);

      // Don't return private key in response
      const { private_key, ...signerWithoutKey } = signer;

      return {
        ...signerWithoutKey,
        keyId,
      };
    } catch (error) {
      logger.error('Error creating signer:', error);
      throw error;
    }
  }

  /**
   * Get signer by ID
   * @param {number} id - Signer ID
   * @returns {Promise<Object>} Signer
   */
  async getSignerById(id) {
    try {
      const signer = await signerRepository.findById(id);
      if (!signer) {
        throw new Error('Signer not found');
      }

      // Don't return private key
      const { private_key, ...signerWithoutKey } = signer;
      return signerWithoutKey;
    } catch (error) {
      logger.error('Error getting signer:', error);
      throw error;
    }
  }

  /**
   * Get signer by NBM
   * @param {string} nbm - NBM
   * @returns {Promise<Object>} Signer
   */
  async getSignerByNBM(nbm) {
    try {
      const signer = await signerRepository.findByNBM(nbm);
      if (!signer) {
        throw new Error('Signer not found');
      }

      const { private_key, ...signerWithoutKey } = signer;
      return signerWithoutKey;
    } catch (error) {
      logger.error('Error getting signer by NBM:', error);
      throw error;
    }
  }

  /**
   * List signers by role
   * @param {string} role - Signer role
   * @returns {Promise<Array>} Signers
   */
  async listSignersByRole(role) {
    try {
      const signers = await signerRepository.findByRole(role);

      return signers.map((signer) => {
        const { private_key, ...signerWithoutKey } = signer;
        return signerWithoutKey;
      });
    } catch (error) {
      logger.error('Error listing signers by role:', error);
      throw error;
    }
  }

  /**
   * List signers by prodi
   * @param {string} prodi - Program studi
   * @returns {Promise<Array>} Signers
   */
  async listSignersByProdi(prodi) {
    try {
      const signers = await signerRepository.findByProdi(prodi);

      return signers.map((signer) => {
        const { private_key, ...signerWithoutKey } = signer;
        return signerWithoutKey;
      });
    } catch (error) {
      logger.error('Error listing signers by prodi:', error);
      throw error;
    }
  }

  /**
   * List all active signers
   * @returns {Promise<Array>} Signers
   */
  async listActiveSigners() {
    try {
      const signers = await signerRepository.findActive();

      return signers.map((signer) => {
        const { private_key, ...signerWithoutKey } = signer;
        return signerWithoutKey;
      });
    } catch (error) {
      logger.error('Error listing active signers:', error);
      throw error;
    }
  }

  /**
   * Update signer
   * @param {number} id - Signer ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated signer
   */
  async updateSigner(id, data) {
    try {
      logger.info(`Updating signer ${id}`);

      const updateData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department,
        prodi: data.prodi,
        signature_image_path: data.signatureImagePath,
        position_title: data.positionTitle,
        is_active: data.isActive,
      };

      const signer = await signerRepository.update(id, updateData);

      logger.info(`Signer updated successfully: ${id}`);

      const { private_key, ...signerWithoutKey } = signer;
      return signerWithoutKey;
    } catch (error) {
      logger.error('Error updating signer:', error);
      throw error;
    }
  }

  /**
   * Deactivate signer
   * @param {number} id - Signer ID
   */
  async deactivateSigner(id) {
    try {
      logger.info(`Deactivating signer ${id}`);
      await signerRepository.update(id, { is_active: false });
      logger.info(`Signer deactivated: ${id}`);
    } catch (error) {
      logger.error('Error deactivating signer:', error);
      throw error;
    }
  }

  /**
   * Delete signer
   * @param {number} id - Signer ID
   */
  async deleteSigner(id) {
    try {
      logger.info(`Deleting signer ${id}`);
      await signerRepository.delete(id);
      logger.info(`Signer deleted: ${id}`);
    } catch (error) {
      logger.error('Error deleting signer:', error);
      throw error;
    }
  }

  /**
   * Rotate signer keys
   * @param {number} id - Signer ID
   * @returns {Promise<Object>} New key info
   */
  async rotateSignerKeys(id) {
    try {
      logger.info(`Rotating keys for signer ${id}`);

      // Generate new key pair
      const { publicKey, privateKey, keyId } = CryptoUtil.generateEdDSAKeyPair();

      // Encrypt private key
      const encryptionKey = process.env.PRIVATE_KEY_ENCRYPTION_PASSWORD || 'default-key';
      const encryptedPrivateKey = CryptoUtil.encrypt(privateKey, encryptionKey);

      // Update signer with new keys
      await signerRepository.update(id, {
        public_key: publicKey,
        private_key: JSON.stringify(encryptedPrivateKey),
        key_id: keyId,
      });

      logger.info(`Keys rotated successfully for signer ${id}`);

      return {
        signerId: id,
        newKeyId: keyId,
        rotatedAt: new Date(),
      };
    } catch (error) {
      logger.error('Error rotating signer keys:', error);
      throw error;
    }
  }
}

module.exports = new SignerService();
