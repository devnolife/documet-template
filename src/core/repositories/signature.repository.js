/**
 * Signature Repository
 * Data access layer for signatures and signed documents
 */

const BaseRepository = require('./base.repository');

class SignatureRepository extends BaseRepository {
  constructor() {
    super('signed_documents');
  }

  /**
   * Find signed document with signatures
   * @param {string} id - Document UUID
   * @returns {Promise<Object|null>} Signed document with signatures
   */
  async findWithSignatures(id) {
    return await this.findById(id, {
      include: {
        document_signatures: {
          include: {
            signer: {
              select: {
                id: true,
                name: true,
                nbm: true,
                role: true,
                department: true,
                position_title: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Find pending documents
   * @returns {Promise<Array>} Pending documents
   */
  async findPending() {
    return await this.findAll({
      status: 'pending',
      is_complete: false,
    }, {
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Find documents by status
   * @param {string} status - Document status
   * @returns {Promise<Array>} Documents
   */
  async findByStatus(status) {
    return await this.findAll({
      status,
    }, {
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Find documents by prodi
   * @param {string} prodi - Program studi
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated documents
   */
  async findByProdi(prodi, page = 1, limit = 10) {
    return await this.paginate(
      { prodi },
      page,
      limit,
      {
        orderBy: { created_at: 'desc' },
        include: {
          document_signatures: {
            include: {
              signer: {
                select: {
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
      }
    );
  }

  /**
   * Update document status
   * @param {string} id - Document UUID
   * @param {string} status - New status
   * @param {string} notes - Status notes
   * @returns {Promise<Object>} Updated document
   */
  async updateStatus(id, status, notes = null) {
    return await this.update(id, {
      status,
      status_notes: notes,
      ...(status === 'completed' && { completed_at: new Date() }),
    });
  }

  /**
   * Check if document is complete
   * @param {string} id - Document UUID
   * @returns {Promise<boolean>} True if complete
   */
  async isComplete(id) {
    const doc = await this.findById(id);
    return doc && doc.is_complete;
  }
}

module.exports = new SignatureRepository();
