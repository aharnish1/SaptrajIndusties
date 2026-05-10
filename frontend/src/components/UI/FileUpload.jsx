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

    if (onFilesChange) {
      onFilesChange([]);
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

    const sizes = [
      'Bytes',
      'KB',
      'MB',
      'GB',
    ];

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
        'Preview not available for CAD files'
      );
    }
  };

  // =========================================
  // FILE DOWNLOAD
  // =========================================

  const downloadFile = (fileObj) => {
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
    setUploading((prev) => ({
      ...prev,
      [fileObj.id]: true,
    }));

    const formData = new FormData();

    formData.append(
      'file',
      fileObj.file
    );

    try {
      const response =
        await axios.post(
          'http://localhost:5000/api/quote/upload/single',
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },

            onUploadProgress:
              (progressEvent) => {
                const progress =
                  Math.round(
                    (progressEvent.loaded *
                      100) /
                    progressEvent.total
                  );

                setFiles((prev) =>
                  prev.map((f) =>
                    f.id === fileObj.id
                      ? {
                          ...f,
                          progress,
                        }
                      : f
                  )
                );
              },
          }
        );

      if (response.data.success) {
        setFiles((prev) => {
          const updatedFiles =
            prev.map((f) =>
              f.id === fileObj.id
                ? {
                    ...f,
                    uploaded: true,
                    progress: 100,
                    url:
                      response.data.data
                        .uploadUrl,
                    filename:
                      response.data.data
                        .filename,
                  }
                : f
            );

          if (onFilesChange) {
            onFilesChange(
              updatedFiles
            );
          }

          return updatedFiles;
        });

        toast.success(
          `${fileObj.name} uploaded successfully`
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Upload failed';

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileObj.id
            ? {
                ...f,
                error: errorMessage,
              }
            : f
        )
      );

      toast.error(
        `${fileObj.name} upload failed`
      );
    } finally {
      setUploading((prev) => ({
        ...prev,
        [fileObj.id]: false,
      }));
    }
  };

  // =========================================
  // DROP HANDLER
  // =========================================

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {

      // Rejected files
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

      // Create file objects
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

      // Validate max files
      if (
        files.length + newFiles.length >
        maxFiles
      ) {
        toast.error(
          `Maximum ${maxFiles} files allowed`
        );

        return;
      }

      // Update safely
      setFiles((prev) => {

        const updatedFiles = [
          ...prev,
          ...newFiles,
        ];

        if (onFilesChange) {
          onFilesChange(updatedFiles);
        }

        return updatedFiles;
      });

      // Upload files
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

    setFiles((prev) => {

      const updatedFiles =
        prev.filter(
          (f) => f.id !== fileId
        );

      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }

      return updatedFiles;
    });

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

      {/* Upload Area */}

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

      {/* Uploaded Files */}

      <AnimatePresence>

        {files.length > 0 && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="mt-8"
          >
            <h4 className="text-white text-2xl font-bold mb-6">
              Uploaded Files (
              {files.length})
            </h4>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {files.map((fileObj) => {

                const Icon =
                  getFileIcon(
                    fileObj.type
                  );

                const iconColor =
                  getFileColor(
                    fileObj.type
                  );

                return (
                  <motion.div
                    key={fileObj.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="bg-[#0A0A0A] border border-gray-700 rounded-xl p-4"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <div
                        className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center ${iconColor}`}
                      >
                        <Icon size={22} />
                      </div>

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            previewFile(
                              fileObj
                            )
                          }
                        >
                          <Eye
                            size={18}
                            className="text-gray-400 hover:text-yellow-400"
                          />
                        </button>

                        <button
                          onClick={() =>
                            downloadFile(
                              fileObj
                            )
                          }
                        >
                          <Download
                            size={18}
                            className="text-gray-400 hover:text-yellow-400"
                          />
                        </button>

                        <button
                          onClick={() =>
                            removeFile(
                              fileObj.id
                            )
                          }
                        >
                          <X
                            size={18}
                            className="text-gray-400 hover:text-red-500"
                          />
                        </button>

                      </div>
                    </div>

                    <h5 className="text-white font-medium mb-2 break-all">
                      {fileObj.name}
                    </h5>

                    <div className="text-sm text-gray-500 mb-2">
                      {formatFileSize(
                        fileObj.size
                      )}
                    </div>

                    <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <Calendar size={12} />
                      {formatUploadDate(
                        fileObj.uploadDate
                      )}
                    </div>

                    {/* Upload Progress */}

                    {uploading[
                      fileObj.id
                    ] && (
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="bg-yellow-400 h-2"
                          animate={{
                            width:
                              `${fileObj.progress}%`,
                          }}
                        />
                      </div>
                    )}

                    {/* Success */}

                    {fileObj.uploaded &&
                      !uploading[
                        fileObj.id
                      ] && (
                        <div className="flex items-center gap-2 text-green-500 text-sm">
                          <CheckCircle size={14} />
                          Uploaded successfully
                        </div>
                      )}

                    {/* Error */}

                    {fileObj.error && (
                      <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle size={14} />
                        {fileObj.error}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}

      {files.length === 0 && (
        <div className="mt-8 rounded-xl p-10 text-center bg-[#0A0A0A]">

          <h4 className="text-white text-xl font-bold mb-2">
            No files uploaded yet
          </h4>

          <p className="text-gray-500">
            Upload files to begin
          </p>
        </div>
      )}

      {/* Preview Modal */}

      <ImagePreviewModal
        isOpen={previewModal.isOpen}
        onClose={() =>
          setPreviewModal({
            isOpen: false,
            imageUrl: null,
            fileName: '',
          })
        }
        imageUrl={previewModal.imageUrl}
        fileName={previewModal.fileName}
      />
    </div>
  );
};

FileUpload.displayName = 'FileUpload';

export default FileUpload;