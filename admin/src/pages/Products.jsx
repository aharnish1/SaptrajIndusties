import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  X
} from 'lucide-react';

import { productsAPI } from '../services/api';
import ProductModal from '../components/ProductModal';

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
    status: 'Active'
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      setLoading(true);
      setError(null);

      const response = await productsAPI.getAll({
        search: searchTerm || undefined,
        category:
          selectedCategory !== 'all'
            ? selectedCategory
            : undefined,
        limit: 100
      });

      console.log('Products Response:', response.data);

      const productsData =
        response?.data?.data ||
        response?.data ||
        [];

      setProducts(
        Array.isArray(productsData)
          ? productsData
          : []
      );

    } catch (err) {

      console.error('Error fetching products:', err);

      setError(
        err?.response?.data?.message ||
        'Failed to load products'
      );

      setProducts([]);

    } finally {
      setLoading(false);
    }
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {

    try {

      const response = await productsAPI.getCategories();

      console.log('Categories Response:', response.data);

      const categoriesData =
        response?.data?.data ||
        response?.data ||
        [];

      setCategories(
        Array.isArray(categoriesData)
          ? categoriesData
          : []
      );

    } catch (err) {

      console.error('Error fetching categories:', err);

      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchTerm, selectedCategory]);

  // ADD PRODUCT
  const handleAddProduct = async (imageFile = null) => {

    try {

      setError(null);

      if (!formData.name || !formData.category) {

        setError('Name and category are required');

        return;
      }

      console.log('Sending Product:', formData, 'With image:', imageFile ? imageFile.name : 'No image');

      await productsAPI.create({
        name: formData.name,
        category: formData.category,
        description: formData.description || '',
        status: formData.status || 'Active'
      }, imageFile);

      await fetchProducts();

      setShowAddModal(false);

      setFormData({
        name: '',
        category: '',
        description: '',
        status: 'Active'
      });

    } catch (err) {

      console.error('Error adding product:', err);

      setError(
        err?.response?.data?.message ||
        'Failed to add product'
      );
    }
  };

  // EDIT PRODUCT
  const handleEditProduct = async (imageFile = null) => {

    try {

      setError(null);

      if (!selectedProduct) return;

      await productsAPI.update(
        selectedProduct._id || selectedProduct.id,
        formData,
        imageFile
      );

      await fetchProducts();

      setShowEditModal(false);

      setSelectedProduct(null);

      setFormData({
        name: '',
        category: '',
        description: '',
        status: 'Active'
      });

    } catch (err) {

      console.error('Error updating product:', err);

      setError(
        err?.response?.data?.message ||
        'Failed to update product'
      );
    }
  };

  // DELETE PRODUCT
  const handleDeleteProduct = async (id) => {

    if (
      !window.confirm(
        'Are you sure you want to delete this product?'
      )
    ) {
      return;
    }

    try {

      setError(null);

      await productsAPI.delete(id);

      fetchProducts();

    } catch (err) {

      console.error('Error deleting product:', err);

      setError(
        err?.response?.data?.message ||
        'Failed to delete product'
      );
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (product) => {

    setSelectedProduct(product);

    setFormData({
      name: product.name || '',
      category: product.category || '',
      description: product.description || '',
      status: product.status || 'Active'
    });

    setShowEditModal(true);
  };

  // STATUS COLORS
  const getStatusColor = (status = '') => {

    switch (status.toLowerCase()) {

      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';

      case 'inactive':
        return 'bg-red-500/10 text-red-500 border-red-500/20';

      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  // LOADING
  if (loading) {

    return (
      <div className="flex items-center justify-center h-64">

        <RefreshCw
          className="animate-spin text-industrial-yellow"
          size={32}
        />

      </div>
    );
  }

  // ERROR
  if (error) {

    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">

        {error}

        <button
          onClick={fetchProducts}
          className="ml-4 text-industrial-yellow hover:text-white transition-colors"
        >
          Retry
        </button>

      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-heading font-bold text-white">
            Products Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your product catalog (
            {products.length} products)
          </p>

        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-industrial-yellow text-deep-black px-4 py-2 font-bold rounded hover:bg-white transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>

      </div>

      {/* FILTERS */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-4 mb-6">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1 relative">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
            />

          </div>

          <div className="flex items-center gap-2">

            <Filter
              size={20}
              className="text-gray-400"
            />

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white"
            >

              <option value="all">
                All Categories
              </option>

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              ))}

            </select>

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray overflow-hidden">

        <table className="w-full text-left border-collapse">

          <thead>

            <tr className="bg-gunmetal-gray border-b border-[#333] text-gray-400 text-sm uppercase tracking-wider">

              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {Array.isArray(products) &&
            products.length > 0 ? (

              products.map((product) => (

                <tr
                  key={product._id || product.id}
                  className="border-b border-[#333] hover:bg-[#111] transition-colors"
                >

                  <td className="p-4 text-white font-medium">
                    {product.name}
                  </td>

                  <td className="p-4 text-gray-400">
                    {product.category}
                  </td>

                  <td className="p-4 text-gray-400 max-w-xs truncate">
                    {product.description}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-2 py-1 text-xs rounded border ${getStatusColor(product.status)}`}
                    >
                      {product.status}
                    </span>

                  </td>

                  <td className="p-4 flex gap-3">

                    <button
                      onClick={() =>
                        openEditModal(product)
                      }
                      className="text-gray-400 hover:text-industrial-yellow transition-colors"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteProduct(
                          product._id || product.id
                        )
                      }
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="p-8 text-center text-gray-400"
                >
                  No products found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ADD MODAL */}
      <ProductModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({
            name: '',
            category: '',
            description: '',
            status: 'Active'
          });
        }}
        title="Add New Product"
        onSubmit={handleAddProduct}
        formData={formData}
        setFormData={setFormData}
      />

      {/* EDIT MODAL */}
      <ProductModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
          setFormData({
            name: '',
            category: '',
            description: '',
            status: 'Active'
          });
        }}
        title="Edit Product"
        onSubmit={handleEditProduct}
        formData={formData}
        setFormData={setFormData}
        selectedProduct={selectedProduct}
      />

    </div>
  );
};

export default Products;