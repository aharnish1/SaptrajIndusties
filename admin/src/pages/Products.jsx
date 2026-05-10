import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, RefreshCw, X } from 'lucide-react';
import { getProducts, saveProducts, addProduct, updateProduct, deleteProduct } from '../services/storageService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    specifications: {},
    status: 'Active'
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = getProducts();
      let filteredProducts = productsData;
      
      // Filter by search term
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
          product.category === selectedCategory
        );
      }
      
      setProducts(filteredProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      setCategories(response.data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchTerm, selectedCategory]);

  const handleAddProduct = async () => {
    try {
      const success = addProduct(formData);
      if (success) {
        fetchProducts();
        setShowAddModal(false);
        setFormData({ name: '', category: '', description: '', specifications: {}, status: 'Active' });
      } else {
        setError('Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product');
    }
  };

  const handleEditProduct = async () => {
    try {
      const success = updateProduct(selectedProduct.id, formData);
      if (success) {
        fetchProducts();
        setShowEditModal(false);
        setSelectedProduct(null);
        setFormData({ name: '', category: '', description: '', specifications: {}, status: 'Active' });
      } else {
        setError('Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const success = deleteProduct(id);
        if (success) {
          fetchProducts();
        } else {
          setError('Failed to delete product');
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        setError('Failed to delete product');
      }
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      specifications: product.specifications || {},
      status: product.status
    });
    setShowEditModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'inactive':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const ProductModal = ({ isOpen, onClose, title, onSubmit }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Product Name</label>
              <input
                type="text"
                id="product-name"
                name="productName"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Category</label>
              <select
                id="product-category"
                name="productCategory"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Description</label>
              <textarea
                id="product-description"
                name="productDescription"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
                rows={4}
                placeholder="Enter product description"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Status</label>
              <select
                id="product-status"
                name="productStatus"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onSubmit}
              className="px-6 py-2 bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors"
            >
              {title === 'Add New Product' ? 'Add Product' : 'Update Product'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin text-industrial-yellow" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
        {error}
        <button onClick={fetchProducts} className="ml-4 text-industrial-yellow hover:text-white transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Products Management</h1>
          <p className="text-gray-400 mt-2">Manage your product catalog ({products.length} products)</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-industrial-yellow text-deep-black px-4 py-2 font-bold rounded hover:bg-white transition-colors"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="products-search"
                name="productsSearch"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              id="category-filter"
              name="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gunmetal-gray border-b border-[#333] text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                  <td className="p-4 text-white font-medium">{product.name}</td>
                  <td className="p-4 text-gray-400">{product.category}</td>
                  <td className="p-4 text-gray-400 text-sm max-w-xs truncate">{product.description}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3">
                    <button 
                      onClick={() => openEditModal(product)}
                      className="text-gray-400 hover:text-industrial-yellow transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-gray-400 hover:text-laser-red transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      <ProductModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ name: '', category: '', description: '', specifications: {}, status: 'Active' });
        }}
        title="Add New Product"
        onSubmit={handleAddProduct}
      />

      {/* Edit Product Modal */}
      <ProductModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
          setFormData({ name: '', category: '', description: '', specifications: {}, status: 'Active' });
        }}
        title="Edit Product"
        onSubmit={handleEditProduct}
      />
    </div>
  );
};

export default Products;
