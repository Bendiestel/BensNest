import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { processImageForStorage } from '../../utils/imageUtils';
import './ImageUploader.css';

const ImageUploader = ({ onImageSelect, currentImage }) => {
    const [preview, setPreview] = useState(currentImage || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        setUploading(true);
        setError(null);

        try {
            const base64Image = await processImageForStorage(file);
            setPreview(base64Image);
            onImageSelect(base64Image);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    }, [onImageSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    const removeImage = () => {
        setPreview(null);
        onImageSelect(null);
        setError(null);
    };

    return (
        <div className="image-uploader">
            <AnimatePresence mode="wait">
                {!preview ? (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`dropzone glass-pink ${isDragActive ? 'active' : ''}`}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />

                        {uploading ? (
                            <div className="upload-status">
                                <div className="loader"></div>
                                <p>Processing image...</p>
                            </div>
                        ) : (
                            <>
                                <FiUpload className="upload-icon gradient-text" />
                                <p className="upload-text">
                                    {isDragActive ? (
                                        <span className="glow-pink">✨ Drop it here! ✨</span>
                                    ) : (
                                        <>
                                            <span className="gradient-text">Drag & drop</span> an image here
                                            <br />
                                            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                                or click to browse
                                            </span>
                                        </>
                                    )}
                                </p>
                                <div className="file-types">
                                    <FiImage /> JPG, PNG, GIF, WebP (max 5MB)
                                </div>
                            </>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="preview-container glass-blue"
                    >
                        <img src={preview} alt="Preview" className="preview-image" />
                        <motion.button
                            className="remove-btn"
                            onClick={removeImage}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiX />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="error-message"
                >
                    ⚠️ {error}
                </motion.div>
            )}
        </div>
    );
};

export default ImageUploader;
