import React, { useEffect, useRef, useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const ProjectModal = ({ 
  isOpen, 
  onClose, 
  title, 
  onSubmit, 
  formData, 
  setFormData,
  selectedProject
}) => {
  const titleInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const clientInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const technologiesInputRef = useRef(null);
  const locationInputRef = useRef(null);
  const completionDateInputRef = useRef(null);
  const statusSelectRef = useRef(null);
  const featuredCheckboxRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');

  // Auto-focus title input when modal opens
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Reset image state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
      setImagePreview(null);
      setImageError('');
    } else if (selectedProject && selectedProject.image) {
      // Set existing image for edit modal
      setImagePreview(`${import.meta.env.VITE_BACKEND_URL}/${selectedProject.image}`);
    }
  }, [isOpen, selectedProject]);

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

  const handleTitleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value
    }));
  };

  const handleClientChange = (e) => {
    setFormData(prev => ({
      ...prev,
      client: e.target.value
    }));
  };

  const handleDescriptionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      description: e.target.value
    }));
  };

  const handleTechnologiesChange = (e) => {
    setFormData(prev => ({
      ...prev,
      technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
    }));
  };

  const handleLocationChange = (e) => {
    setFormData(prev => ({
      ...prev,
      location: e.target.value
    }));
  };

  const handleCompletionDateChange = (e) => {
    setFormData(prev => ({
      ...prev,
      completionDate: e.target.value
    }));
  };

  const handleStatusChange = (e) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.value
    }));
  };

  const handleFeaturedChange = (e) => {
    setFormData(prev => ({
      ...prev,
      featured: e.target.checked
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
              Project Image
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
                      alt="Project preview"
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
                      Click to upload project image
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
              Project Title
            </label>

            <input
              ref={titleInputRef}
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="Enter project title"
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
              Client
            </label>

            <input
              ref={clientInputRef}
              type="text"
              value={formData.client}
              onChange={handleClientChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="Enter client name"
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
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Technologies (comma-separated)
            </label>

            <input
              ref={technologiesInputRef}
              type="text"
              value={formData.technologies.join(', ')}
              onChange={handleTechnologiesChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Location
            </label>

            <input
              ref={locationInputRef}
              type="text"
              value={formData.location}
              onChange={handleLocationChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="Enter project location"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Completion Date
            </label>

            <input
              ref={completionDateInputRef}
              type="date"
              value={formData.completionDate || ''}
              onChange={handleCompletionDateChange}
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
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
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input
              ref={featuredCheckboxRef}
              type="checkbox"
              checked={formData.featured}
              onChange={handleFeaturedChange}
              className="w-4 h-4 bg-gunmetal-gray border border-[#333] rounded text-industrial-yellow focus:ring-industrial-yellow focus:ring-2"
            />
            <label className="text-gray-400 text-sm">
              Featured Project
            </label>
          </div>
        </form>

        <div className="flex justify-end gap-4 p-6 border-t border-[#333] flex-shrink-0 bg-[#0A0A0A]">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors"
          >
            {title === 'Add New Project' ? 'Add Project' : 'Update Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
