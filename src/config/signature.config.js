/**
 * Digital Signature Configuration
 * Configuration for EdDSA signature system
 */

module.exports = {
  // EdDSA Configuration
  eddsa: {
    algorithm: 'EdDSA',
    curve: 'ed25519',
    keySize: 256,
    encoding: 'base64',
  },

  // Signature Requirements by Document Type
  documentTypes: {
    kkp: {
      requiredSignatures: 3,
      requiredRoles: ['dosen_pembimbing', 'ketua_prodi', 'dekan'],
      description: 'Kartu Kendali Proposal',
    },
    kkplus: {
      requiredSignatures: 3,
      requiredRoles: ['dosen_pembimbing', 'ketua_prodi', 'dekan'],
      description: 'Kartu Kendali Proposal Plus',
    },
    bimbingan: {
      requiredSignatures: 2,
      requiredRoles: ['dosen_pembimbing', 'mahasiswa'],
      description: 'Kartu Bimbingan',
    },
  },

  // Verification Settings
  verification: {
    hashAlgorithm: 'SHA-256',
    timestampValidation: true,
    maxValidityDays: 365, // Dokumen valid selama 1 tahun
  },

  // Security Settings
  security: {
    encryptPrivateKeys: true,
    encryptionAlgorithm: 'aes-256-gcm',
    keyRotationDays: 90, // Rotate keys setiap 90 hari
  },
};
