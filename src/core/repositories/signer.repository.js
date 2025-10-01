/**
 * Signer Repository
 * Data access layer for signers
 */

const BaseRepository = require('./base.repository');

class SignerRepository extends BaseRepository {
  constructor() {
    super('signers');
  }

  /**
   * Find signer by NBM
   * @param {string} nbm - NBM number
   * @returns {Promise<Object|null>} Signer or null
   */
  async findByNBM(nbm) {
    return await this.findOne({
      nbm,
      is_active: true,
    });
  }

  /**
   * Find signer by email
   * @param {string} email - Email address
   * @returns {Promise<Object|null>} Signer or null
   */
  async findByEmail(email) {
    return await this.findOne({
      email,
      is_active: true,
    });
  }

  /**
   * Find signer by key ID
   * @param {string} keyId - Key ID
   * @returns {Promise<Object|null>} Signer or null
   */
  async findByKeyId(keyId) {
    return await this.findOne({
      key_id: keyId,
      is_active: true,
    });
  }

  /**
   * Find signers by role
   * @param {string} role - Signer role
   * @returns {Promise<Array>} Signers
   */
  async findByRole(role) {
    return await this.findAll({
      role,
      is_active: true,
    });
  }

  /**
   * Find signers by prodi
   * @param {string} prodi - Program studi
   * @returns {Promise<Array>} Signers
   */
  async findByProdi(prodi) {
    return await this.findAll({
      prodi,
      is_active: true,
    }, {
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Find active signers
   * @returns {Promise<Array>} Active signers
   */
  async findActive() {
    return await this.findAll({
      is_active: true,
    }, {
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Update last signed timestamp
   * @param {number} id - Signer ID
   * @returns {Promise<Object>} Updated signer
   */
  async updateLastSigned(id) {
    return await this.update(id, {
      last_signed_at: new Date(),
    });
  }

  /**
   * Find signers for document
   * @param {string} documentType - Document type
   * @param {string} prodi - Program studi
   * @returns {Promise<Array>} Available signers
   */
  async findForDocument(documentType, prodi) {
    // This would need to consider the required roles for the document type
    return await this.findAll({
      prodi,
      is_active: true,
    }, {
      orderBy: { role: 'asc' },
    });
  }
}

module.exports = new SignerRepository();
