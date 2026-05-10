const express = require('express');
const router = express.Router();

// Import controllers
const productController = require('../controllers/productController');
const projectController = require('../controllers/projectController');
const inquiryController = require('../controllers/inquiryController');
const contactController = require('../controllers/contactController');

// --- PRODUCTS API ---
router.get('/products', productController.getProducts);
router.get('/products/categories', productController.getProductCategories);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// --- PROJECTS API ---
router.get('/projects', projectController.getProjects);
router.get('/projects/industries', projectController.getProjectIndustries);
router.get('/projects/stats', projectController.getProjectStats);
router.get('/projects/:id', projectController.getProjectById);
router.post('/projects', projectController.createProject);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// --- INQUIRIES API ---
router.get('/inquiries', inquiryController.getInquiries);
router.get('/inquiries/stats', inquiryController.getInquiryStats);
router.get('/inquiries/:id', inquiryController.getInquiryById);
router.post('/inquiries', inquiryController.createInquiry);
router.put('/inquiries/:id/status', inquiryController.updateInquiryStatus);
router.delete('/inquiries/:id', inquiryController.deleteInquiry);

// --- CONTACT API ---
router.post('/contact', contactController.submitContact);
router.get('/contacts', contactController.getContacts);
router.put('/contacts/:id/status', contactController.updateContactStatus);
router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
