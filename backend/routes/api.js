const express = require('express');
const router = express.Router();

// ============================================
// CONTROLLERS
// ============================================

const productController = require('../controllers/productController');
const projectController = require('../controllers/projectController');
const inquiryController = require('../controllers/inquiryController');
const contactController = require('../controllers/contactController');
const jobController = require('../controllers/jobController');
const jobApplicationController = require('../controllers/jobApplicationController');

// ============================================
// MULTER
// ============================================

const {
  uploadProductImage,
  uploadProjectImage,
  uploadInquiryFile,
  handleMulterError
} = require('../config/multer');

// ============================================
// PRODUCTS API
// ============================================

// GET ALL PRODUCTS
router.get(
  '/products',
  productController.getProducts
);

// GET PRODUCT CATEGORIES
router.get(
  '/products/categories',
  productController.getProductCategories
);

// GET PRODUCT BY ID
router.get(
  '/products/:id',
  productController.getProductById
);

// CREATE PRODUCT
router.post(
  '/products',
  uploadProductImage,
  handleMulterError,
  productController.createProduct
);

// UPDATE PRODUCT
router.put(
  '/products/:id',
  uploadProductImage,
  handleMulterError,
  productController.updateProduct
);

// DELETE PRODUCT
router.delete(
  '/products/:id',
  productController.deleteProduct
);

// ============================================
// PROJECTS API
// ============================================

// GET ALL PROJECTS
router.get(
  '/projects',
  projectController.getProjects
);

// GET PROJECT CATEGORIES
router.get(
  '/projects/categories',
  projectController.getProjectCategories
);

// GET PROJECT STATS
router.get(
  '/projects/stats',
  projectController.getProjectStats
);

// GET PROJECT BY ID
router.get(
  '/projects/:id',
  projectController.getProjectById
);

// CREATE PROJECT
router.post(
  '/projects',
  uploadProjectImage,
  handleMulterError,
  projectController.createProject
);

// UPDATE PROJECT
router.put(
  '/projects/:id',
  uploadProjectImage,
  handleMulterError,
  projectController.updateProject
);

// DELETE PROJECT
router.delete(
  '/projects/:id',
  projectController.deleteProject
);

// ============================================
// INQUIRIES API
// ============================================

// GET ALL INQUIRIES
router.get(
  '/inquiries',
  inquiryController.getInquiries
);

// GET INQUIRY STATS
router.get(
  '/inquiries/stats',
  inquiryController.getInquiryStats
);

// ============================================
// INQUIRY NOTIFICATION API
// ============================================

// GET UNREAD INQUIRIES
router.get(
  '/inquiries/unread',
  inquiryController.getUnreadInquiries
);

// GET UNREAD COUNT
router.get(
  '/inquiries/unread-count',
  inquiryController.getUnreadCount
);

// MARK INQUIRY AS READ
router.put(
  '/inquiries/:id/read',
  inquiryController.markAsRead
);

// MARK ALL INQUIRIES AS READ
router.put(
  '/inquiries/read-all',
  inquiryController.markAllAsRead
);

// ============================================
// INQUIRY CRUD API
// ============================================

// GET INQUIRY BY ID
router.get(
  '/inquiries/:id',
  inquiryController.getInquiryById
);

// CREATE INQUIRY
router.post(
  '/inquiries',
  uploadInquiryFile,
  handleMulterError,
  inquiryController.createInquiry
);

// UPDATE INQUIRY STATUS
router.put(
  '/inquiries/:id/status',
  inquiryController.updateInquiryStatus
);

// DELETE INQUIRY
router.delete(
  '/inquiries/:id',
  inquiryController.deleteInquiry
);

// ============================================
// CONTACT API
// ============================================

// SUBMIT CONTACT FORM
router.post(
  '/contact',
  contactController.submitContact
);

// GET CONTACTS
router.get(
  '/contacts',
  contactController.getContacts
);

// UPDATE CONTACT STATUS
router.put(
  '/contacts/:id/status',
  contactController.updateContactStatus
);

// DELETE CONTACT
router.delete(
  '/contacts/:id',
  contactController.deleteContact
);

// ============================================
// JOBS API
// ============================================

// USE JOBS ROUTES
router.use('/jobs', require('./jobs'));

// ============================================
// TEAM MEMBERS API
// ============================================

// USE TEAM MEMBERS ROUTES
router.use('/team-members', require('./teamMembers'));

// ============================================
// EXPORT ROUTER
// ============================================

module.exports = router;