import React, { useEffect, useRef, useState } from 'react';
import { X, Upload, Image as ImageIcon, User, Briefcase } from 'lucide-react';

const TeamMemberModal = ({
  isOpen,
  onClose,
  onSave,
  teamMember
}) => {
  const nameInputRef = useRef(null);
  const designationInputRef = useRef(null);
  const bioInputRef = useRef(null);
  const experienceInputRef = useRef(null);
  const orderInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    bio: '',
    experience: '',
    order: 0,
    isActive: true
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');

  // Initialize form data
  useEffect(() => {
    if (teamMember) {
      setFormData({
        name: teamMember?.name || '',
        designation: teamMember?.designation || '',
        bio: teamMember?.bio || '',
        experience: teamMember?.experience || '',
        order: teamMember?.order || 0,
        isActive: teamMember?.isActive !== false
      });

      if (teamMember?.image) {
        setImagePreview(
          teamMember.image.startsWith('http')
            ? teamMember.image
            : `${import.meta.env.VITE_BACKEND_URL || ''}${teamMember.image}`
        );
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({
        name: '',
        designation: '',
        bio: '',
        experience: '',
        order: 0,
        isActive: true
      });

      setSelectedImage(null);
      setImagePreview(null);
    }
  }, [teamMember, isOpen]);

  // Auto focus
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError('Image size must be less than 2MB');
      return;
    }

    setImageError('');
    setSelectedImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setImageError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Name is required');
      nameInputRef.current?.focus();
      return;
    }

    if (!formData.designation.trim()) {
      alert('Designation is required');
      designationInputRef.current?.focus();
      return;
    }

    if (!formData.bio.trim()) {
      alert('Bio is required');
      bioInputRef.current?.focus();
      return;
    }

    const submitData = new FormData();

    submitData.append('name', formData.name);
    submitData.append('designation', formData.designation);
    submitData.append('bio', formData.bio);
    submitData.append('experience', formData.experience);
    submitData.append('order', formData.order);
    submitData.append('isActive', formData.isActive);

    if (selectedImage) {
      submitData.append('image', selectedImage);
    }

    console.log('🔍 Frontend Team Member Debug - FormData payload:');
    for (let [key, value] of submitData.entries()) {
      console.log(`🔍 ${key}:`, value);
    }
    console.log('🔍 Frontend Team Member Debug - Selected image:', selectedImage);

    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg border border-[#333] w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333]">
          <h2 className="text-xl font-semibold text-white">
            {teamMember ? 'Edit Team Member' : 'Add Team Member'}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Profile Image
            </label>

            <div className="flex items-center gap-4">

              {/* Preview */}
              <div className="relative">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 rounded-lg object-cover border-2 border-[#333]"
                    />

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-[#2a2a2a] border-2 border-[#333] flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-white hover:bg-[#333] transition-colors"
                >
                  <Upload size={16} />
                  {teamMember ? 'Change Image' : 'Upload Image'}
                </button>
              </div>
            </div>

            {imageError && (
              <p className="text-red-400 text-sm mt-1">
                {imageError}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>

            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                ref={nameInputRef}
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                placeholder="Enter full name"
                required
              />
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Designation *
            </label>

            <div className="relative">
              <Briefcase
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                ref={designationInputRef}
                type="text"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    designation: e.target.value
                  })
                }
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                placeholder="e.g. Production Head"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio *
            </label>

            <textarea
              ref={bioInputRef}
              value={formData.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bio: e.target.value
                })
              }
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow resize-none"
              rows={4}
              placeholder="Brief professional biography..."
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Experience
            </label>

            <div className="relative">
              <Briefcase
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                ref={experienceInputRef}
                type="text"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: e.target.value
                  })
                }
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                placeholder="e.g. 10+ years"
              />
            </div>
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Order
            </label>

            <input
              ref={orderInputRef}
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  order: parseInt(e.target.value) || 0
                })
              }
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
              min="0"
            />
          </div>

          {/* Active */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.checked
                  })
                }
                className="w-4 h-4"
              />

              Active Team Member
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-[#333]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-industrial-yellow text-black rounded-lg hover:bg-yellow-400 transition-colors"
            >
              {teamMember ? 'Update Team Member' : 'Add Team Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberModal;