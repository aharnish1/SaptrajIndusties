import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import FileUpload from '../components/UI/FileUpload';
import { Toaster, toast } from 'react-hot-toast';
import { Upload, Loader2, CheckCircle, X, AlertCircle } from 'lucide-react';

const Quote = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionModal, setSubmissionModal] = useState({ isOpen: false, type: 'success', message: '' });
  const formRef = useRef(null);
  const [resetUploadTrigger, setResetUploadTrigger] = useState(0);

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
  };

  const resetForm = () => {
    // Reset form fields
    if (formRef.current) {
      formRef.current.reset();
    }
    
    // Reset uploaded files state
    setUploadedFiles([]);
    
    // Reset FileUpload component state
    setResetUploadTrigger(prev => prev + 1);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent duplicate submissions
    
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());
      
      // Add uploaded files information
      const filesData = uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.url,
        filename: file.filename
      }));
      
      // Prepare submission data
      const submissionData = {
        ...formObject,
        files: filesData,
        submittedAt: new Date().toISOString()
      };
      
      // Simulate API call (replace with actual backend call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (replace with actual API response handling)
      const response = { success: true, message: 'Quote request submitted successfully' };
      
      if (response.success) {
        // Show success modal
        setSubmissionModal({
          isOpen: true,
          type: 'success',
          message: '✅ Quote Request Submitted Successfully. Our team will contact you shortly.'
        });
        
        // Reset form after delay
        setTimeout(() => {
          resetForm();
          setSubmissionModal({ isOpen: false, type: '', message: '' });
        }, 2000);
        
        // Show success toast
        toast.success('Quote request submitted successfully!', {
          duration: 4000,
          icon: '🎉',
          style: {
            background: '#0A0A0A',
            color: '#fff',
            border: '1px solid #FFD000',
          },
        });
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error modal
      setSubmissionModal({
        isOpen: true,
        type: 'error',
        message: `❌ Submission failed: ${error.message || 'Please try again later.'}`
      });
      
      // Show error toast
      toast.error('Failed to submit quote request. Please try again.', {
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
      <div className="bg-gunmetal-gray py-20 border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Request a Quote</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Provide your requirement details and our engineering team will get back to you with a comprehensive proposal.</p>
        </div>
      </div>
      
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="bg-[#0A0A0A] border border-gunmetal-gray p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-industrial-yellow"></div>
            
            <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
              {/* Personal Details */}
              <div>
                <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-[#222] pb-2">1. Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name*" id="q_name" placeholder="John Doe" required />
                  <Input label="Company Name*" id="q_company" placeholder="ABC Manufacturing" required />
                  <Input label="Email Address*" id="q_email" type="email" placeholder="john@example.com" required />
                  <Input label="Phone Number*" id="q_phone" placeholder="+91 XXXXXXXXXX" required />
                </div>
              </div>

              {/* Requirement Details */}
              <div>
                <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-[#222] pb-2">2. Project Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input label="Material Type" id="q_material" placeholder="e.g. Mild Steel, Stainless Steel, Aluminum" />
                  <Input label="Estimated Quantity" id="q_qty" type="number" placeholder="100" />
                </div>
                <Input label="Detailed Requirements*" id="q_details" type="textarea" placeholder="Please describe the project, dimensions, and specific fabrication processes required..." required />
              </div>

              {/* File Uploads */}
              <div>
                <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-[#222] pb-2">3. Technical Drawings</h3>
                <FileUpload 
                  resetTrigger={resetUploadTrigger}
                  onFilesChange={handleFilesChange}
                  maxFiles={10}
                  maxSize={20 * 1024 * 1024}
                />
              </div>

              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`
                    w-full md:w-auto px-12 py-4 text-lg font-semibold rounded-lg
                    transition-all duration-300 relative overflow-hidden
                    ${isSubmitting 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-industrial-yellow text-deep-black hover:bg-industrial-yellow/90 hover:shadow-lg hover:shadow-industrial-yellow/25'
                    }
                  `}
                >
                  {isSubmitting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-gray-700"
                    >
                      <Loader2 size={20} className="animate-spin mr-2" />
                      <span>Submitting Request...</span>
                    </motion.div>
                  )}
                  
                  <span className={isSubmitting ? 'opacity-0' : 'opacity-100'}>
                    {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
                  </span>
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0A0A0A',
            color: '#fff',
            border: '1px solid #333',
          },
          success: {
            iconTheme: {
              primary: '#FFD000',
              secondary: '#000',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#000',
            },
          },
        }}
      />

      {/* Submission Success/Error Modal */}
      <AnimatePresence>
        {submissionModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                relative max-w-md mx-4 p-8 rounded-2xl border-2
                ${submissionModal.type === 'success' 
                  ? 'bg-[#0A0A0A] border-industrial-yellow shadow-lg shadow-industrial-yellow/25' 
                  : 'bg-[#0A0A0A] border-red-500 shadow-lg shadow-red-500/25'
                }
              `}
            >
              {/* Close Button */}
              <button
                onClick={() => setSubmissionModal({ isOpen: false, type: '', message: '' })}
                className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6
                    ${submissionModal.type === 'success' 
                      ? 'bg-industrial-yellow/20' 
                      : 'bg-red-500/20'
                    }
                  `}
                >
                  {submissionModal.type === 'success' ? (
                    <CheckCircle size={32} className="text-industrial-yellow" />
                  ) : (
                    <AlertCircle size={32} className="text-red-500" />
                  )}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl font-bold text-white mb-4"
                >
                  {submissionModal.type === 'success' ? 'Success!' : 'Submission Failed'}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-300 text-lg leading-relaxed"
                >
                  {submissionModal.message}
                </motion.p>

                {submissionModal.type === 'error' && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    onClick={() => setSubmissionModal({ isOpen: false, type: '', message: '' })}
                    className="mt-6 px-6 py-3 bg-industrial-yellow text-deep-black font-semibold rounded-lg hover:bg-industrial-yellow/90 transition-colors"
                  >
                    Try Again
                  </motion.button>
                )}
              </div>

              {/* Success Glow Effect */}
              {submissionModal.type === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-industrial-yellow/10 to-transparent pointer-events-none"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quote;
