import React, { useEffect, useRef, useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const ProductModal = ({ 
  isOpen, 
  onClose, 
  title, 
  onSubmit, 
  formData, 
  setFormData,
  selectedProduct
}) => {
  const nameInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const statusSelectRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');

  // Auto-focus name input when modal opens
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Reset image state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
      setImagePreview(null);
      setImageError('');
    } else if (selectedProduct && selectedProduct.image) {
      // Set existing image for edit modal
      setImagePreview(`${import.meta.env.VITE_BACKEND_URL}/${selectedProduct.image}`);
    }
  }, [isOpen, selectedProduct]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setImageError('Only JPEG, JPG, PNG, and WebP images are allowed');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('File size must be less than 5MB');
      return;
    }

    // Clear previous error
    setImageError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setSelectedImage(file);
    };
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedImage);
  };

  const handleNameChange = (e) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value
    }));
  };

  const handleDescriptionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      description: e.target.value
    }));
  };

  const handleStatusChange = (e) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-[#333] flex-shrink-0">
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto p-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Product Image
            </label>

            <div className="space-y-3">
              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-[#333] rounded-lg p-4 hover:border-industrial-yellow/50 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
                
                {imagePreview ? (
                  // Image Preview
                  <div className="relative max-w-sm mx-auto">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-32 sm:h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  // Upload Prompt
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer text-center"
                  >
                    <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                    <p className="text-gray-400 text-sm mb-1">
                      Click to upload product image
                    </p>
                    <p className="text-gray-500 text-xs">
                      JPEG, JPG, PNG, WebP (max 5MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Image Error */}
              {imageError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                  <p className="text-red-500 text-sm">{imageError}</p>
                </div>
              )}

              {/* File Info */}
              {selectedImage && (
                <div className="bg-[#111] border border-[#333] rounded p-2">
                  <p className="text-gray-400 text-sm">
                    <ImageIcon size={16} className="inline mr-2" />
                    {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Product Name
            </label>

            <input
              ref={nameInputRef}
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Category
            </label>

            <input
              ref={categoryInputRef}
              type="text"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="Enter category"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Description
            </label>

            <textarea
              ref={descriptionInputRef}
              rows={4}
              value={formData.description}
              onChange={handleDescriptionChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Status
            </label>

            <select
              ref={statusSelectRef}
              value={formData.status}
              onChange={handleStatusChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </form>

        <div className="flex justify-end gap-4 p-6 border-t border-[#333] flex-shrink-0 bg-[#0A0A0A]">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors"
          >
            {title === 'Add New Product' ? 'Add Product' : 'Update Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
