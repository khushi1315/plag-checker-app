
// src/components/FileDrop.js
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf, FaTimes } from 'react-icons/fa';

function FileDrop({ onFile }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': [] },
    onDrop: (files) => onFile(files[0]),
  });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <FaFilePdf size={28} />
      <span>Drag & drop PDF here or click to select</span>
    </div>
  );
}

export default FileDrop;
