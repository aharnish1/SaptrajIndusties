const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

// Ensure uploads directory exists
const ensureUploadsDir = async (subfolder = 'products') => {
  const uploadsDir = path.join(__dirname, '../uploads');
  const targetDir = path.join(uploadsDir, subfolder);
  
  try {
    await fs.ensureDir(uploadsDir);
    await fs.ensureDir(targetDir);
    console.log(`✅ Uploads directories created/verified for ${subfolder}`);
  } catch (error) {
    console.error(`❌ Error creating uploads directories for ${subfolder}:`, error);
  }
};

// Generate unique filename
const generateUniqueFilename = (originalname) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = path.extname(originalname);
  const basename = path.basename(originalname, extension);
  const filename = `${basename}-${timestamp}-${randomString}${extension}`;
  
  console.log('🔍 Multer Debug - Filename generation:', {
    originalname,
    timestamp,
    randomString,
    extension,
    basename,
    finalFilename: filename
  });
  
  return filename;
};

// Create storage configuration for specific folder
const createStorage = (folder = 'products') => {
  return multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadPath = path.join(__dirname, `../uploads/${folder}`);
      await ensureUploadsDir(folder);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueFilename = generateUniqueFilename(file.originalname);
      cb(null, uniqueFilename);
    }
  });
};

// File writing verification
const verifyFileWrite = (filePath, filename) => {
  const fullPath = path.join(filePath, filename);
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`❌ File verification failed: ${fullPath}`, err);
    } else {
      console.log(`✅ File verification success: ${fullPath}`);
      // Check file size
      fs.stat(fullPath, (statErr, stats) => {
        if (statErr) {
          console.error(`❌ File stat failed: ${fullPath}`, statErr);
        } else {
          console.log(`📁 File size: ${stats.size} bytes`);
        }
      });
    }
  });
};

// Product storage configuration
const productStorage = createStorage('products');

// Project storage configuration  
const projectStorage = createStorage('projects');

// Inquiry storage configuration
const inquiryStorage = createStorage('inquiries');

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and WebP images are allowed.'), false);
  }
};

// File filter for inquiry files (supports multiple file types)
const inquiryFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // CAD files
    'application/dxf',
    'application/x-dxf',
    'text/plain'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed types: JPEG, JPG, PNG, WebP, PDF, DOC, DOCX, DXF, and TXT.'), false);
  }
};

// Multer configuration for products
const productUpload = multer({
  storage: productStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only one file per request
  }
});

// Multer configuration for projects
const projectUpload = multer({
  storage: projectStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only one file per request
  }
});

// Multer configuration for inquiries
const inquiryUpload = multer({
  storage: inquiryStorage,
  fileFilter: inquiryFileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit
    files: 1 // Only one file per request
  }
});

// Single image upload middleware
const uploadProductImage = productUpload.single('image');
const uploadProjectImage = projectUpload.single('image');
const uploadInquiryFile = inquiryUpload.single('attachment');

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB for images, 20MB for inquiry files.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Only one file is allowed per request.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.'
      });
    }
  }
  
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  // Only call next if it's provided (for proper Express middleware chain)
  if (typeof next === 'function') {
    next(error);
  }
};

// Helper function to delete old image
const deleteOldImage = async (imagePath) => {
  if (!imagePath) return;
  
  try {
    const fullPath = path.join(__dirname, '..', imagePath);
    if (await fs.pathExists(fullPath)) {
      await fs.remove(fullPath);
      console.log('🗑️ Old image deleted:', imagePath);
    }
  } catch (error) {
    console.error('❌ Error deleting old image:', error);
  }
};

// Resume storage configuration
const resumeStorage = createStorage('resumes');

// Resume file filter (PDF, DOC, DOCX)
const resumeFileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
  }
};

// Resume upload configuration
const resumeUpload = multer({
  storage: resumeStorage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for resumes
  }
});

// Resume upload middleware
const uploadResumeFile = resumeUpload.single('resume');

// Team member storage configuration
const teamMemberStorage = createStorage('team-members');

// Team member file filter (images only)
const teamMemberFileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
  }
};

// Team member upload configuration
const teamMemberUpload = multer({
  storage: teamMemberStorage,
  fileFilter: teamMemberFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit for team member images
  }
});

// Team member upload middleware
const uploadTeamMemberImage = teamMemberUpload.single('image');

// Initialize uploads directory on startup
ensureUploadsDir();

module.exports = {
  uploadProductImage,
  uploadProjectImage,
  uploadInquiryFile,
  uploadResumeFile,
  uploadTeamMemberImage,
  handleMulterError,
  deleteOldImage,
  ensureUploadsDir
};
