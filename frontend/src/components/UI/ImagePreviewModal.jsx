import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

const ImagePreviewModal = ({ isOpen, onClose, imageUrl, fileName }) => {
  const [zoom, setZoom] = React.useState(1);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-7xl max-h-[90vh] mx-4"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">{fileName}</h3>
                  <p className="text-sm text-gray-400">Image Preview</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-black/50 rounded-lg px-2 py-1">
                    <button
                      onClick={handleZoomOut}
                      className="p-1 text-gray-400 hover:text-industrial-yellow transition-colors"
                      disabled={zoom <= 0.5}
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="text-white text-sm min-w-[3rem] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1 text-gray-400 hover:text-industrial-yellow transition-colors"
                      disabled={zoom >= 3}
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>
                  
                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-industrial-yellow/20 text-industrial-yellow rounded-lg hover:bg-industrial-yellow/30 transition-colors"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                    title="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className="overflow-auto max-h-[90vh] rounded-lg border border-gray-700">
              <div className="flex items-center justify-center min-h-[50vh] p-8">
                <motion.img
                  src={imageUrl}
                  alt={fileName}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  style={{ transform: `scale(${zoom})` }}
                  transition={{ transform: { duration: 0.2 } }}
                  draggable={false}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span>Scroll to pan • Zoom: {Math.round(zoom * 100)}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;
