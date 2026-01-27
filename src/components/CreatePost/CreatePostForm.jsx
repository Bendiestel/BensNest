import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import ImageUploader from './ImageUploader';
import './CreatePostForm.css';

const CreatePostForm = ({ onSubmit, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!content.trim()) {
            newErrors.content = 'Content is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        onSubmit({
            title: title.trim(),
            content: content.trim(),
            image
        });

        // Reset form
        setTitle('');
        setContent('');
        setImage(null);
        setErrors({});
    };

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="create-post-form glass"
                initial={{ scale: 0.5, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 100 }}
                transition={{ type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="form-header">
                    <h2 className="gradient-text">✨ Create New Post ✨</h2>
                    <motion.button
                        className="close-btn"
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiX />
                    </motion.button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label glow-pink">
                            📝 Post Title
                        </label>
                        <input
                            type="text"
                            className={`y2k-input ${errors.title ? 'error' : ''}`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your post title..."
                            maxLength={100}
                        />
                        {errors.title && (
                            <span className="error-text">⚠️ {errors.title}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label glow-blue">
                            🎨 Post Image
                        </label>
                        <ImageUploader
                            onImageSelect={setImage}
                            currentImage={image}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label glow-green">
                            ✍️ Post Content
                        </label>
                        <textarea
                            className={`y2k-textarea ${errors.content ? 'error' : ''}`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts..."
                            maxLength={5000}
                        />
                        {errors.content && (
                            <span className="error-text">⚠️ {errors.content}</span>
                        )}
                        <div className="char-count">
                            {content.length} / 5000 characters
                        </div>
                    </div>

                    <div className="form-actions">
                        <motion.button
                            type="button"
                            className="y2k-button cancel-btn"
                            onClick={onClose}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            className="y2k-button submit-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiSend /> Publish Post
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default CreatePostForm;
