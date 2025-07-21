'use client';

import { useState, useCallback } from 'react';
import { FiUpload, FiX, FiFile, FiCheckCircle, FiClock } from 'react-icons/fi';

export default function UploadArea() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const uploadPromises = files.map((file, index) => 
      uploadFile(file, index)
    );

    try {
      await Promise.all(uploadPromises);
      // Handle successful upload
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const uploadFile = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to upload ${file.name}`);
      }
  
      // Optionally update progress manually to 100%
      setUploadProgress(prev => ({
        ...prev,
        [`${file.name}-${index}`]: 100,
      }));
    } catch (error) {
      console.error(error);
      setUploadProgress(prev => ({
        ...prev,
        [`${file.name}-${index}`]: 0,
      }));
    }
  };
  

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUpload className="h-12 w-12 text-gray-400" />
          <p className="text-lg font-medium text-gray-900">Drag and drop files here</p>
          <p className="text-sm text-gray-500">or</p>
          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Browse Files
            <input 
              type="file" 
              className="hidden" 
              multiple 
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.md"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, DOC, DOCX, TXT, MD (Max 50MB)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Files to upload ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FiFile className="h-5 w-5 text-gray-400" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {uploadProgress[`${file.name}-${index}`] === 100 ? (
                    <span className="text-green-500 text-sm flex items-center">
                      <FiCheckCircle className="mr-1" /> Done
                    </span>
                  ) : uploadProgress[`${file.name}-${index}`] > 0 ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${uploadProgress[`${file.name}-${index}`]}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {uploadProgress[`${file.name}-${index}`]}%
                      </span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={Object.values(uploadProgress).some(p => p > 0 && p < 100)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FiUpload className="h-4 w-4" />
              <span>Upload All</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
  