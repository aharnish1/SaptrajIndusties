import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../components/UI/Input';
import FileUpload from '../components/UI/FileUpload';
import { Toaster, toast } from 'react-hot-toast';
import { Loader2, CheckCircle, X, AlertCircle } from 'lucide-react';
import { inquiriesAPI } from '../services/api';
import aboutBg from "../assets/aboutBg.jpeg";

const Quote = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submissionModal, setSubmissionModal] = useState({
    isOpen: false,
    type: 'success',
    message: '',
  });

  const formRef = useRef(null);

  const [resetUploadTrigger, setResetUploadTrigger] = useState(0);

  const [formData, setFormData] = useState({
    q_name: '',
    q_company: '',
    q_email: '',
    q_phone: '',
    q_material: '',
    q_qty: '',
    q_details: '',
  });

  // FIXED: useCallback prevents unnecessary re-renders
  const handleFilesChange = useCallback((files) => {
    setUploadedFiles(files || []);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      q_name: '',
      q_company: '',
      q_email: '',
      q_phone: '',
      q_material: '',
      q_qty: '',
      q_details: '',
    });

    setUploadedFiles([]);

    setResetUploadTrigger((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const submitData = new FormData();

      submitData.append('name', formData.q_name);
      submitData.append('company', formData.q_company);
      submitData.append('email', formData.q_email);
      submitData.append('phone', formData.q_phone);
      submitData.append('requirement', formData.q_details);
      submitData.append('materialType', formData.q_material || '');
      submitData.append('quantity', formData.q_qty || '');
      submitData.append('message', formData.q_details);

      // FIXED: Handle FileUpload component files properly
      if (uploadedFiles?.length > 0) {
        const fileObj = uploadedFiles[0];
        
        // FileUpload component provides fileObj.file as the actual File object
        if (fileObj.file instanceof File) {
          submitData.append('attachment', fileObj.file);
          console.log('🔍 Appending file to FormData:', fileObj.file);
        } else {
          console.error('🔍 File object is not a File:', fileObj);
        }
      }

      console.log('Submitting quote request...');
      console.log('Files:', uploadedFiles);
      
      // Debug FormData content
      console.log('FormData entries:');
      for (let pair of submitData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await inquiriesAPI.create(submitData);

      console.log('Quote submission response:', response);

      if (response?.success) {
        setSubmissionModal({
          isOpen: true,
          type: 'success',
          message:
            '✅ Quote Request Submitted Successfully. Our team will contact you shortly.',
        });

        toast.success('Quote request submitted successfully!', {
          duration: 4000,
          icon: '🎉',
          style: {
            background: '#0A0A0A',
            color: '#fff',
            border: '1px solid #FFD000',
          },
        });

        resetForm();

        setTimeout(() => {
          setSubmissionModal({
            isOpen: false,
            type: '',
            message: '',
          });
        }, 2500);
      }
    } catch (error) {
      console.error('Form submission error:', error);

      setSubmissionModal({
        isOpen: true,
        type: 'error',
        message: `❌ Submission failed: ${
          error?.message || 'Please try again later.'
        }`,
      });

      toast.error('Failed to submit quote request.', {
        duration: 5000,
        icon: '🚫',
        style: {
          background: '#0A0A0A',
          color: '#fff',
          border: '1px solid #ef4444',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero */}

      <div className="relative py-16 sm:py-24 md:py-32 lg:py-40 border-b border-border-subtle bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${aboutBg})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/70"></div>
                    <div className="absolute inset-0 industrial-grid opacity-20"></div>
            
                    <div className="relative container mx-auto px-4 sm:px-6 md:px-12 text-center z-10">
                      <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-4 steel-heading" data-text="Contact Us">
                        Request a Quote
                      </h1>
            
                      <p className="text-text-muted max-w-2xl mx-auto font-body">
                      Provide your requirement details and our engineering team
            will get back to you with a comprehensive proposal.</p>
                    </div>
                  </div>

      {/* Form */}
      <section className="py-12 sm:py-16 md:py-24 bg-bg-deep industrial-grid">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
          <div className="card-industrial p-6 sm:p-8 rounded-lg sm:rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>

            <form
              ref={formRef}
              className="space-y-6 sm:space-y-8"
              onSubmit={handleSubmit}
            >
              {/* Contact Info */}
              <div>
                <h3 className="text-text-primary font-bold mb-4 uppercase tracking-wider text-sm border-b border-border-subtle pb-2 font-body">
                  1. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    label="Full Name*"
                    id="q_name"
                    value={formData.q_name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                  />

                  <Input
                    label="Company Name*"
                    id="q_company"
                    value={formData.q_company}
                    onChange={handleInputChange}
                    placeholder="ABC Manufacturing"
                    required
                  />

                  <Input
                    label="Email Address*"
                    id="q_email"
                    type="email"
                    value={formData.q_email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    required
                  />

                  <Input
                    label="Phone Number*"
                    id="q_phone"
                    value={formData.q_phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXXXXXXX"
                    required
                  />
                </div>
              </div>

              {/* Project Specs */}
              <div>
                <h3 className="text-text-primary font-bold mb-4 uppercase tracking-wider text-sm border-b border-border-subtle pb-2 font-body">
                  2. Project Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <Input
                    label="Material Type"
                    id="q_material"
                    value={formData.q_material}
                    onChange={handleInputChange}
                    placeholder="e.g. Mild Steel"
                  />

                  <Input
                    label="Estimated Quantity"
                    id="q_qty"
                    type="number"
                    value={formData.q_qty}
                    onChange={handleInputChange}
                    placeholder="100"
                  />
                </div>

                <Input
                  label="Detailed Requirements*"
                  id="q_details"
                  type="textarea"
                  value={formData.q_details}
                  onChange={handleInputChange}
                  placeholder="Describe your project..."
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <h3 className="text-text-primary font-bold mb-4 uppercase tracking-wider text-sm border-b border-border-subtle pb-2 font-body">
                  3. Technical Drawings
                </h3>

                <FileUpload
                  resetTrigger={resetUploadTrigger}
                  onFilesChange={handleFilesChange}
                  maxFiles={10}
                  maxSize={20 * 1024 * 1024}
                />
              </div>

              {/* Submit */}
              <div className="pt-2 sm:pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full sm:w-auto px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300
                  ${
                    isSubmitting
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'btn-primary-gradient text-deep-black hover:opacity-90'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2
                        size={18}
                        className="animate-spin mr-2"
                      />
                      Submitting...
                    </div>
                  ) : (
                    'Submit Request'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Toast */}
      <Toaster position="top-right" />

      {/* Modal */}
      <AnimatePresence>
        {submissionModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`relative max-w-md mx-4 p-8 rounded-2xl border-2
              ${
                submissionModal.type === 'success'
                  ? 'bg-[#0A0A0A] border-industrial-yellow'
                  : 'bg-[#0A0A0A] border-red-500'
              }`}
            >
              <button
                onClick={() =>
                  setSubmissionModal({
                    isOpen: false,
                    type: '',
                    message: '',
                  })
                }
                className="absolute top-4 right-4"
              >
                <X size={20} />
              </button>

              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  {submissionModal.type === 'success' ? (
                    <CheckCircle
                      size={40}
                      className="text-industrial-yellow"
                    />
                  ) : (
                    <AlertCircle
                      size={40}
                      className="text-red-500"
                    />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {submissionModal.type === 'success'
                    ? 'Success!'
                    : 'Submission Failed'}
                </h3>

                <p className="text-gray-300">
                  {submissionModal.message}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quote;