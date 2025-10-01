/**
 * Storage Service
 * Local file storage management
 */

const path = require('path');
const { FileUtil } = require('../../shared/utils');
const config = require('../../config').storage;

class LocalStorage {
  constructor() {
    this.paths = config.paths;
  }

  /**
   * Initialize storage directories
   */
  async initialize() {
    const directories = Object.values(this.paths);
    
    for (const dir of directories) {
      await FileUtil.ensureDir(dir);
    }
  }

  /**
   * Save file to storage
   * @param {Buffer} fileBuffer - File buffer
   * @param {string} filename - Filename
   * @param {string} storageType - Storage type (templates, outputs, uploads, etc.)
   * @returns {Promise<Object>} File info
   */
  async saveFile(fileBuffer, filename, storageType = 'uploads') {
    const storagePath = this.paths[storageType];
    if (!storagePath) {
      throw new Error(`Invalid storage type: ${storageType}`);
    }

    const filePath = path.join(storagePath, filename);
    await FileUtil.writeFile(filePath, fileBuffer);

    const fileSize = await FileUtil.getFileSize(filePath);
    const checksum = await FileUtil.calculateChecksum(filePath);

    return {
      path: filePath,
      relativePath: path.relative(process.cwd(), filePath),
      filename,
      size: fileSize,
      checksum,
      storageType,
    };
  }

  /**
   * Get file from storage
   * @param {string} filename - Filename
   * @param {string} storageType - Storage type
   * @returns {Promise<Buffer>} File buffer
   */
  async getFile(filename, storageType = 'uploads') {
    const storagePath = this.paths[storageType];
    if (!storagePath) {
      throw new Error(`Invalid storage type: ${storageType}`);
    }

    const filePath = path.join(storagePath, filename);
    
    if (!(await FileUtil.exists(filePath))) {
      throw new Error(`File not found: ${filename}`);
    }

    return await FileUtil.readFile(filePath);
  }

  /**
   * Delete file from storage
   * @param {string} filename - Filename
   * @param {string} storageType - Storage type
   */
  async deleteFile(filename, storageType = 'uploads') {
    const storagePath = this.paths[storageType];
    if (!storagePath) {
      throw new Error(`Invalid storage type: ${storageType}`);
    }

    const filePath = path.join(storagePath, filename);
    await FileUtil.deleteFile(filePath);
  }

  /**
   * Check if file exists
   * @param {string} filename - Filename
   * @param {string} storageType - Storage type
   * @returns {Promise<boolean>} True if exists
   */
  async fileExists(filename, storageType = 'uploads') {
    const storagePath = this.paths[storageType];
    if (!storagePath) {
      return false;
    }

    const filePath = path.join(storagePath, filename);
    return await FileUtil.exists(filePath);
  }

  /**
   * Get file info
   * @param {string} filename - Filename
   * @param {string} storageType - Storage type
   * @returns {Promise<Object>} File info
   */
  async getFileInfo(filename, storageType = 'uploads') {
    const storagePath = this.paths[storageType];
    if (!storagePath) {
      throw new Error(`Invalid storage type: ${storageType}`);
    }

    const filePath = path.join(storagePath, filename);
    
    if (!(await FileUtil.exists(filePath))) {
      return null;
    }

    const size = await FileUtil.getFileSize(filePath);
    const checksum = await FileUtil.calculateChecksum(filePath);

    return {
      path: filePath,
      relativePath: path.relative(process.cwd(), filePath),
      filename,
      size,
      formattedSize: FileUtil.formatFileSize(size),
      checksum,
      storageType,
      exists: true,
    };
  }

  /**
   * Move file between storage types
   * @param {string} filename - Filename
   * @param {string} fromStorage - Source storage type
   * @param {string} toStorage - Destination storage type
   */
  async moveFile(filename, fromStorage, toStorage) {
    const sourceBuffer = await this.getFile(filename, fromStorage);
    await this.saveFile(sourceBuffer, filename, toStorage);
    await this.deleteFile(filename, fromStorage);
  }

  /**
   * Get storage path
   * @param {string} storageType - Storage type
   * @returns {string} Storage path
   */
  getStoragePath(storageType) {
    return this.paths[storageType] || null;
  }
}

module.exports = new LocalStorage();
