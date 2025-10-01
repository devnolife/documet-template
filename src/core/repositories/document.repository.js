/**
 * Document Repository
 * Data access layer for documents
 */

const BaseRepository = require('./base.repository');

class DocumentRepository extends BaseRepository {
  constructor() {
    super('documents');
  }

  /**
   * Find document by type and prodi
   * @param {string} type - Document type
   * @param {string} prodi - Program studi
   * @returns {Promise<Object|null>} Document or null
   */
  async findByTypeAndProdi(type, prodi) {
    return await this.findOne({
      type,
      prodi,
      is_active: true,
    }, {
      include: {
        document_fields: {
          where: { is_active: true },
          orderBy: { display_order: 'asc' },
        },
        document_templates: {
          where: { is_default: true },
        },
      },
    });
  }

  /**
   * Find active documents
   * @returns {Promise<Array>} Active documents
   */
  async findActive() {
    return await this.findAll({
      is_active: true,
    }, {
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Find documents by prodi
   * @param {string} prodi - Program studi
   * @returns {Promise<Array>} Documents
   */
  async findByProdi(prodi) {
    return await this.findAll({
      prodi,
      is_active: true,
    });
  }

  /**
   * Find documents by type
   * @param {string} type - Document type
   * @returns {Promise<Array>} Documents
   */
  async findByType(type) {
    return await this.findAll({
      type,
      is_active: true,
    });
  }

  /**
   * Get document with fields
   * @param {number} id - Document ID
   * @returns {Promise<Object|null>} Document with fields
   */
  async findWithFields(id) {
    return await this.findById(id, {
      include: {
        document_fields: {
          where: { is_active: true },
          orderBy: { display_order: 'asc' },
        },
      },
    });
  }

  /**
   * Get document with templates
   * @param {number} id - Document ID
   * @returns {Promise<Object|null>} Document with templates
   */
  async findWithTemplates(id) {
    return await this.findById(id, {
      include: {
        document_templates: true,
      },
    });
  }
}

module.exports = new DocumentRepository();
