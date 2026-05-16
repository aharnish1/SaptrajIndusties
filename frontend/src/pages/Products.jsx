import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import { productsAPI } from '../services/api';
import aboutBg from "../assets/aboutBg.jpeg";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Actual input value
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced value for API
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsResponse, categoriesResponse] = await Promise.all([
          productsAPI.getProducts({
            category:
              selectedCategory !== 'all'
                ? selectedCategory
                : undefined,
            search: debouncedSearch || undefined,
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

  }, [selectedCategory, debouncedSearch]);

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
          <p className="text-gray-400">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-deep-black">
        <div className="text-center">
          <p className="text-red-500 mb-3">
            Error loading products
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">

      {/* Hero Section */}
      <div
        className="relative py-32 md:py-40 border-b border-[#333] bg-cover bg-center"
        style={{
          backgroundImage: `url(${aboutBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative container mx-auto px-4 sm:px-6 md:px-12 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            Our Products
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Precision manufactured parts engineered to exacting specifications.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1a1a1a] py-6 border-b border-[#333]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* Categories */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">

              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#333] text-gray-300 hover:bg-[#444]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-[320px] xl:w-[380px] flex-shrink-0">

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="
                  w-full
                  bg-[#222]
                  text-white
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  border
                  border-[#444]
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:outline-none
                  transition-all
                  duration-200
                  placeholder:text-gray-500
                  text-sm
                "
              />

              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="py-20 md:py-24 bg-deep-black">

        <div className="container mx-auto px-4 sm:px-6 md:px-12">

          {products.length === 0 ? (

            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No products found matching your criteria.
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

              {products.map((product) => (

                <Card key={product._id || product.id}>

                  {/* Image */}
                  <div className="aspect-video bg-[#111] mb-6 flex items-center justify-center border border-[#222] overflow-hidden relative rounded-lg">

                    {product.image ? (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-600 text-xs uppercase">
                        [Product Image]
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">

                    <h3 className="text-xl font-heading font-bold text-white break-words">
                      {product.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between gap-3 flex-wrap">

                      <span className="text-blue-400 text-sm font-medium">
                        {product.category}
                      </span>

                      <span
                        className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                          product.status === 'Active'
                            ? 'bg-green-900/40 text-green-300 border border-green-700'
                            : 'bg-gray-700 text-gray-300 border border-gray-600'
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
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