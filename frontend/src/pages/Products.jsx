import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import { productsAPI } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          productsAPI.getProducts({ 
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            search: searchTerm || undefined,
            limit: 50 
          }),
          productsAPI.getCategories()
        ]);
        
        setProducts(productsResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-deep-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-deep-black">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white mb-2">Error loading products</p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gunmetal-gray py-20 border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Products</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Precision manufactured parts engineered to exacting specifications.</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-[#1a1a1a] py-6 border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-[#333] text-gray-300 hover:bg-[#444]'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded transition-colors ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#333] text-gray-300 hover:bg-[#444]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-[#333] text-white px-4 py-2 pr-10 rounded border border-[#444] focus:border-blue-500 focus:outline-none"
              />
              <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product._id || product.id}>
                  <div className="aspect-video bg-[#111] mb-6 flex items-center justify-center border border-[#222] overflow-hidden relative">
                    {product.image ? (
                      <img 
                        src={`${import.meta.env.VITE_BACKEND_URL}/${product.image}`} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log('Image failed to load:', `${import.meta.env.VITE_BACKEND_URL}/${product.image}`);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', `${import.meta.env.VITE_BACKEND_URL}/${product.image}`);
                        }}
                      />
                    ) : product.images && product.images.length > 0 ? (
                      <img 
                        src={`/uploads/${product.images[0]}`} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="text-gray-600 font-mono text-xs uppercase items-center justify-center" style={{ display: (product.image || product.images?.length > 0) ? 'none' : 'flex' }}>
                      [Product Image]
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-sm font-medium">{product.category}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.status === 'Active' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
