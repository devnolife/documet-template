/**
 * Base Repository
 * Generic repository pattern implementation
 */

const { prisma } = require('../../infrastructure/database');
const { logger } = require('../../shared/utils');

class BaseRepository {
  constructor(model) {
    this.model = model;
    this.prisma = prisma;
  }

  /**
   * Find all records with optional filters
   * @param {Object} where - Filter conditions
   * @param {Object} options - Query options (include, orderBy, etc.)
   * @returns {Promise<Array>} Records
   */
  async findAll(where = {}, options = {}) {
    try {
      return await this.prisma[this.model].findMany({
        where,
        ...options,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.findAll:`, error);
      throw error;
    }
  }

  /**
   * Find record by ID
   * @param {number|string} id - Record ID
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Record or null
   */
  async findById(id, options = {}) {
    try {
      return await this.prisma[this.model].findUnique({
        where: { id },
        ...options,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.findById:`, error);
      throw error;
    }
  }

  /**
   * Find one record by conditions
   * @param {Object} where - Filter conditions
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Record or null
   */
  async findOne(where, options = {}) {
    try {
      return await this.prisma[this.model].findFirst({
        where,
        ...options,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.findOne:`, error);
      throw error;
    }
  }

  /**
   * Create new record
   * @param {Object} data - Record data
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Created record
   */
  async create(data, options = {}) {
    try {
      return await this.prisma[this.model].create({
        data,
        ...options,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.create:`, error);
      throw error;
    }
  }

  /**
   * Update record by ID
   * @param {number|string} id - Record ID
   * @param {Object} data - Update data
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Updated record
   */
  async update(id, data, options = {}) {
    try {
      return await this.prisma[this.model].update({
        where: { id },
        data,
        ...options,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.update:`, error);
      throw error;
    }
  }

  /**
   * Update many records
   * @param {Object} where - Filter conditions
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Update result
   */
  async updateMany(where, data) {
    try {
      return await this.prisma[this.model].updateMany({
        where,
        data,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.updateMany:`, error);
      throw error;
    }
  }

  /**
   * Delete record by ID
   * @param {number|string} id - Record ID
   * @returns {Promise<Object>} Deleted record
   */
  async delete(id) {
    try {
      return await this.prisma[this.model].delete({
        where: { id },
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.delete:`, error);
      throw error;
    }
  }

  /**
   * Delete many records
   * @param {Object} where - Filter conditions
   * @returns {Promise<Object>} Delete result
   */
  async deleteMany(where) {
    try {
      return await this.prisma[this.model].deleteMany({
        where,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.deleteMany:`, error);
      throw error;
    }
  }

  /**
   * Count records
   * @param {Object} where - Filter conditions
   * @returns {Promise<number>} Count
   */
  async count(where = {}) {
    try {
      return await this.prisma[this.model].count({
        where,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.count:`, error);
      throw error;
    }
  }

  /**
   * Paginated query
   * @param {Object} where - Filter conditions
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Paginated result
   */
  async paginate(where = {}, page = 1, limit = 10, options = {}) {
    try {
      const skip = (page - 1) * limit;
      
      const [data, total] = await Promise.all([
        this.prisma[this.model].findMany({
          where,
          skip,
          take: limit,
          ...options,
        }),
        this.count(where),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error(`Error in ${this.model}.paginate:`, error);
      throw error;
    }
  }

  /**
   * Check if record exists
   * @param {Object} where - Filter conditions
   * @returns {Promise<boolean>} True if exists
   */
  async exists(where) {
    try {
      const count = await this.count(where);
      return count > 0;
    } catch (error) {
      logger.error(`Error in ${this.model}.exists:`, error);
      throw error;
    }
  }

  /**
   * Upsert record
   * @param {Object} where - Unique filter
   * @param {Object} create - Data for create
   * @param {Object} update - Data for update
   * @returns {Promise<Object>} Upserted record
   */
  async upsert(where, create, update) {
    try {
      return await this.prisma[this.model].upsert({
        where,
        create,
        update,
      });
    } catch (error) {
      logger.error(`Error in ${this.model}.upsert:`, error);
      throw error;
    }
  }
}

module.exports = BaseRepository;
