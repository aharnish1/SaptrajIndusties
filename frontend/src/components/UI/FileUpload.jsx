import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';

import {
  Upload,
  File,
  X,
  Eye,
  CheckCircle,
  AlertCircle,
  Download,
  Calendar,
  FileText,
  Image,
  Box,
} from 'lucide-react';

import ImagePreviewModal from './ImagePreviewModal';

const FileUpload = ({
  onFilesChange,
  maxFiles = 10,
  maxSize = 20 * 1024 * 1024,
  resetTrigger,
}) => {

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    imageUrl: null,
    fileName: '',
  });

  const fileInputRef = useRef(null);

  // =========================================
  // SAFE PARENT UPDATE
  // =========================================

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files, onFilesChange]);

  // =========================================
  // RESET STATE
  // =========================================

  const resetUploadState = () => {

    setFiles([]);
    setUploading({});
    setDragActive(false);

    setPreviewModal({
      isOpen: false,
      imageUrl: null,
      fileName: '',
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // =========================================
  // RESET WHEN FORM SUBMITS
  // =========================================

  useEffect(() => {
    if (resetTrigger) {
      resetUploadState();
    }
  }, [resetTrigger]);

  // =========================================
  // HELPERS
  // =========================================

  const formatFileSize = (bytes) => {

    if (bytes === 0) return '0 Bytes';

    const k = 1024;

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(
      Math.log(bytes) / Math.log(k)
    );

    return (
      parseFloat(
        (bytes / Math.pow(k, i)).toFixed(2)
      ) +
      ' ' +
      sizes[i]
    );
  };

  const formatUploadDate = (date) => {

    return new Intl.DateTimeFormat(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    ).format(date);
  };

  const getFileIcon = (mimetype) => {

    if (mimetype.includes('pdf'))
      return FileText;

    if (mimetype.includes('image'))
      return Image;

    if (
      mimetype.includes('dxf') ||
      mimetype.includes('dwg')
    )
      return Box;

    return File;
  };

  const getFileColor = (mimetype) => {

    if (mimetype.includes('pdf'))
      return 'text-red-500';

    if (mimetype.includes('image'))
      return 'text-green-500';

    if (
      mimetype.includes('dxf') ||
      mimetype.includes('dwg')
    )
      return 'text-blue-500';

    return 'text-gray-500';
  };

  // =========================================
  // FILE PREVIEW
  // =========================================

  const previewFile = (fileObj) => {

    if (!fileObj.url) {
      toast.error('File not uploaded yet');
      return;
    }

    if (fileObj.type.includes('image')) {

      setPreviewModal({
        isOpen: true,
        imageUrl:
          'http://localhost:5000' +
          fileObj.url,
        fileName: fileObj.name,
      });

    } else if (
      fileObj.type.includes('pdf')
    ) {

      window.open(
        `http://localhost:5000${fileObj.url}`,
        '_blank'
      );

    } else {

      toast(
        'Preview not available for this file type'
      );
    }
  };

  // =========================================
  // FILE DOWNLOAD
  // =========================================

  const downloadFile = (fileObj) => {

    if (!fileObj.url) {
      toast.error('File not uploaded yet');
      return;
    }

    const link =
      document.createElement('a');

    link.href =
      `http://localhost:5000${fileObj.url}`;

    link.download = fileObj.name;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // =========================================
  // FILE UPLOAD
  // =========================================

  const uploadFile = async (fileObj) => {
    // FIXED: Don't upload separately, just mark as ready for form submission
    console.log('🔍 FileUpload - File ready for form submission:', fileObj);
    
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileObj.id
          ? {
              ...f,
              uploaded: true,
              progress: 100,
              url: URL.createObjectURL(fileObj.file), // Temporary preview URL
            }
          : f
      )
    );

    toast.success(
      `${fileObj.name} ready for submission`
    );
  };

  // =========================================
  // DROP HANDLER
  // =========================================

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {

      if (rejectedFiles.length > 0) {

        rejectedFiles.forEach(
          ({ file, errors }) => {

            errors.forEach((error) => {

              if (
                error.code ===
                'file-too-large'
              ) {
                toast.error(
                  `${file.name} exceeds 20MB`
                );
              }

              else if (
                error.code ===
                'file-invalid-type'
              ) {
                toast.error(
                  `${file.name} has invalid format`
                );
              }
            });
          }
        );
      }

      const newFiles =
        acceptedFiles.map((file) => ({
          id: Math.random()
            .toString(36)
            .substr(2, 9),

          file,
          name: file.name,
          size: file.size,
          type: file.type,
          uploaded: false,
          progress: 0,
          error: null,
          url: null,
          filename: null,
          uploadDate: new Date(),
        }));

      if (
        files.length + newFiles.length >
        maxFiles
      ) {

        toast.error(
          `Maximum ${maxFiles} files allowed`
        );

        return;
      }

      setFiles((prev) => [
        ...prev,
        ...newFiles,
      ]);

      newFiles.forEach((fileObj) => {
        uploadFile(fileObj);
      });

    },

    [files.length, maxFiles]
  );

  // =========================================
  // REMOVE FILE
  // =========================================

  const removeFile = (fileId) => {

    setFiles((prev) =>
      prev.filter(
        (f) => f.id !== fileId
      )
    );

    toast.success('File removed');
  };

  // =========================================
  // DROPZONE
  // =========================================

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true,
    maxFiles,
    maxSize,

    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': [
        '.jpg',
        '.jpeg',
      ],
      'image/png': ['.png'],
      'application/dxf': ['.dxf'],
      'application/dwg': ['.dwg'],
    },
  });

  // =========================================
  // UI
  // =========================================

  return (
    <div className="w-full">

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-700 rounded-xl p-10 text-center bg-[#0A0A0A] cursor-pointer hover:border-yellow-400 transition-all duration-300"
        onClick={() =>
          fileInputRef.current?.click()
        }
      >

        <input
          {...getInputProps()}
          ref={fileInputRef}
        />

        <Upload
          size={40}
          className="mx-auto text-yellow-400 mb-4"
        />

        <h3 className="text-white text-2xl font-bold mb-2">
          Upload Technical Drawings
        </h3>

        <p className="text-gray-400">
          Drag and drop your files here
        </p>
      </div>

      {/* KEEP YOUR EXISTING UI BELOW */}
    </div>
  );
};

FileUpload.displayName = 'FileUpload';

export default FileUpload;