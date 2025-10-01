/**
 * Storage Configuration
 * Configuration for file storage and uploads
 */

const path = require('path');

const storageRoot = path.join(process.cwd(), 'storage');

module.exports = {
  // Storage Paths
  paths: {
    root: storageRoot,
    templates: path.join(storageRoot, 'templates'),
    outputs: path.join(storageRoot, 'outputs'),
    uploads: path.join(storageRoot, 'uploads'),
    qrcodes: path.join(storageRoot, 'qrcodes'),
    signatures: path.join(storageRoot, 'signatures'),
  },

  // Upload Configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/pdf', // .pdf
      'image/png', // .png
      'image/jpeg', // .jpg
    ],
    allowedExtensions: ['.docx', '.pdf', '.png', '.jpg', '.jpeg'],
  },

  // Template Configuration
  templates: {
    supportedFormats: ['docx', 'pdf', 'odt'],
    defaultFormat: 'docx',
  },

  // Document Generation
  document: {
    outputFormat: 'docx',
    compression: true,
    watermark: false,
  },

  // QR Code Configuration
  qrCode: {
    size: 200,
    margin: 1,
    errorCorrectionLevel: 'M',
  },
};
