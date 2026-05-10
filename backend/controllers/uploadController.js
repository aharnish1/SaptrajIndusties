const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/quotes');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/dxf',
    'application/dwg',
    'application/step',
    'application/stp',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/x-dxf',
    'application/x-dwg',
    'application/x-step',
    'application/x-stp'
  ];
  
  const allowedExtensions = ['.pdf', '.dxf', '.dwg', '.step', '.stp', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed types: PDF, DXF, DWG, STEP, STP, JPG, PNG'), false);
  }
};

// Configure Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit
    files: 10 // Maximum 10 files
  }
});

// Upload single file
const uploadSingle = (req, res) => {
  const singleUpload = upload.single('file');
  
  singleUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size too large. Maximum size is 20MB.'
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum 10 files allowed.'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Upload error: ' + err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.'
      });
    }
    
    // Return file information
    res.status(200).json({
      success: true,
      message: 'File uploaded successfully.',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path,
        uploadUrl: `/uploads/quotes/${req.file.filename}`
      }
    });
  });
};

// Upload multiple files
const uploadMultiple = (req, res) => {
  const multipleUpload = upload.array('files', 10);
  
  multipleUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size too large. Maximum size is 20MB.'
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum 10 files allowed.'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Upload error: ' + err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded.'
      });
    }
    
    // Return files information
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
      uploadUrl: `/uploads/quotes/${file.filename}`
    }));
    
    res.status(200).json({
      success: true,
      message: `${req.files.length} files uploaded successfully.`,
      data: uploadedFiles
    });
  });
};

// Delete file
const deleteFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadsDir, filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: 'File not found.'
    });
  }
  
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting file.'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'File deleted successfully.'
    });
  });
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  deleteFile
};
