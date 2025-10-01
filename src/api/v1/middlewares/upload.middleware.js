/**
 * Upload Middleware
 * File upload handling with multer
 */

const multer = require('multer');
const path = require('path');
const { FileUtil } = require('../../../shared/utils');
const config = require('../../../config').storage;

/**
 * Configure multer storage for templates
 */
const templateStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { prodi } = req.params;
    const uploadPath = path.join(config.paths.templates, prodi || 'default');

    try {
      await FileUtil.ensureDir(uploadPath);
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const { type } = req.params;
    const filename = type ? `${type}.docx` : file.originalname;
    cb(null, filename);
  },
});

/**
 * Configure multer storage for general uploads
 */
const generalStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await FileUtil.ensureDir(config.paths.uploads);
      cb(null, config.paths.uploads);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = FileUtil.generateUniqueFilename(file.originalname);
    cb(null, uniqueName);
  },
});

/**
 * File filter for document uploads
 */
const documentFileFilter = (req, file, cb) => {
  const allowedMimeTypes = config.upload.allowedMimeTypes;

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`), false);
  }
};

/**
 * Multer upload middleware for templates
 */
const uploadTemplate = multer({
  storage: templateStorage,
  fileFilter: documentFileFilter,
  limits: {
    fileSize: config.upload.maxFileSize,
  },
});

/**
 * Multer upload middleware for general files
 */
const uploadGeneral = multer({
  storage: generalStorage,
  fileFilter: documentFileFilter,
  limits: {
    fileSize: config.upload.maxFileSize,
  },
});

/**
 * Multer upload middleware for signatures
 */
const uploadSignature = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        await FileUtil.ensureDir(config.paths.signatures);
        cb(null, config.paths.signatures);
      } catch (error) {
        cb(error);
      }
    },
    filename: (req, file, cb) => {
      const uniqueName = FileUtil.generateUniqueFilename(file.originalname, 'sig_');
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG and JPEG images are allowed for signatures'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB for signatures
  },
});

module.exports = {
  uploadTemplate,
  uploadGeneral,
  uploadSignature,
};
