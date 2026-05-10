const db = require('../data/mockData');

// Get all products
const getProducts = (req, res) => {
  try {
    const { category, search } = req.query;
    let filteredProducts = [...db.products];

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get product by ID
const getProductById = (req, res) => {
  try {
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Create new product
const createProduct = (req, res) => {
  try {
    const { name, category, description, specifications, images } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name and category are required'
      });
    }

    const newProduct = {
      id: Date.now(),
      name,
      category,
      description: description || '',
      specifications: specifications || [],
      images: images || [],
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.products.push(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// Update product
const updateProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = db.products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updatedProduct = {
      ...db.products[productIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    db.products[productIndex] = updatedProduct;

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// Delete product
const deleteProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = db.products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    db.products.splice(productIndex, 1);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// Get product categories
const getProductCategories = (req, res) => {
  try {
    const categories = [...new Set(db.products.map(product => product.category))];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCategories
};
