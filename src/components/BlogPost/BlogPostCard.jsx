import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiX, FiCalendar, FiTrash2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import './BlogPostCard.css';

const BlogPostCard = ({ post, onClose, onDelete }) => {
    const formattedDate = format(new Date(post.timestamp), 'MMMM dd, yyyy • h:mm a');

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDelete(post.id);
            onClose();
        }
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
                className="blog-post-card glass"
                initial={{ scale: 0.5, rotateY: 90 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.5, rotateY: -90 }}
                transition={{ type: 'spring', damping: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="post-header">
                    <h1 className="post-title gradient-text">{post.title}</h1>
                    <div className="post-actions">
                        <motion.button
                            className="delete-btn"
                            onClick={handleDelete}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Delete post"
                        >
                            <FiTrash2 />
                        </motion.button>
                        <motion.button
                            className="close-btn-post"
                            onClick={onClose}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiX />
                        </motion.button>
                    </div>
                </div>

                {/* Timestamp */}
                <div className="post-meta">
                    <FiCalendar />
                    <span className="post-date glow-blue">{formattedDate}</span>
                </div>

                <div className="divider"></div>

                {/* Image */}
                {post.image && (
                    <motion.div
                        className="post-image-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img src={post.image} alt={post.title} className="post-image pixel-border" />
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    className="post-body"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </motion.div>

                {/* Decorative stars */}
                <div className="post-decorations">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="decoration-star"
                            style={{
                                top: `${10 + i * 15}%`,
                                left: i % 2 === 0 ? '5%' : '95%',
                            }}
                            animate={{
                                rotate: [0, 360],
                                scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                        >
                            ✨
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BlogPostCard;
