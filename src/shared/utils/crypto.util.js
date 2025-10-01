/**
 * Crypto Utility
 * Cryptographic operations for signatures and hashing
 */

const crypto = require('crypto');
const { generateKeyPairSync, sign, verify } = require('crypto');

class CryptoUtil {
  /**
   * Generate EdDSA key pair
   * @returns {Object} Public and private keys
   */
  static generateEdDSAKeyPair() {
    const { publicKey, privateKey } = generateKeyPairSync('ed25519', {
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return {
      publicKey,
      privateKey,
      keyId: this.generateKeyId(),
    };
  }

  /**
   * Generate unique key ID
   * @returns {string} 32-character hex string
   */
  static generateKeyId() {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Sign data with EdDSA
   * @param {string} data - Data to sign
   * @param {string} privateKey - Private key in PEM format
   * @returns {string} Base64 encoded signature
   */
  static signData(data, privateKey) {
    const signature = sign(null, Buffer.from(data), privateKey);
    return signature.toString('base64');
  }

  /**
   * Verify EdDSA signature
   * @param {string} data - Original data
   * @param {string} signature - Base64 encoded signature
   * @param {string} publicKey - Public key in PEM format
   * @returns {boolean} True if signature is valid
   */
  static verifySignature(data, signature, publicKey) {
    try {
      const signatureBuffer = Buffer.from(signature, 'base64');
      return verify(null, Buffer.from(data), publicKey, signatureBuffer);
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate SHA-256 hash
   * @param {string|Buffer} data - Data to hash
   * @returns {string} Hex encoded hash
   */
  static sha256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Generate MD5 hash (for checksums)
   * @param {string|Buffer} data - Data to hash
   * @returns {string} Hex encoded hash
   */
  static md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  /**
   * Encrypt data using AES-256-GCM
   * @param {string} data - Data to encrypt
   * @param {string} password - Encryption password
   * @returns {Object} Encrypted data with IV and auth tag
   */
  static encrypt(data, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: cipher.getAuthTag().toString('hex'),
    };
  }

  /**
   * Decrypt data using AES-256-GCM
   * @param {Object} encryptedData - Object with encrypted, iv, and authTag
   * @param {string} password - Decryption password
   * @returns {string} Decrypted data
   */
  static decrypt(encryptedData, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  /**
   * Generate random UUID
   * @returns {string} UUID v4
   */
  static generateUUID() {
    return crypto.randomUUID();
  }
}

module.exports = CryptoUtil;
