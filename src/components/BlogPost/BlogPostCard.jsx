
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiX, FiTrash2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import './BlogPostCard.css';

const BlogPostCard = ({ post, onClose, onDelete, isAdmin }) => {
    const formattedDate = format(new Date(post.timestamp), 'MMMM dd, yyyy @ h:mm a');

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
                className="retro-window"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Window Title Bar */}
                <div className="window-title-bar">
                    <span className="window-title">{post.title}</span>
                    <button className="window-close-btn" onClick={onClose}>
                        <FiX />
                    </button>
                </div>

                {/* Window Content */}
                <div className="window-content">
                    <div className="post-meta-bar">
                        <span className="post-date">Posted: {formattedDate}</span>
                        {isAdmin && (
                            <button className="delete-btn-retro" onClick={handleDelete} title="Delete Post">
                                <FiTrash2 /> DELETE
                            </button>
                        )}
                    </div>

                    {post.image && (
                        <div className="post-image-container">
                            <img src={post.image} alt={post.title} className="post-image" />
                        </div>
                    )}

                    <div className="post-body-text">
                        <ReactMarkdown
                            components={{
                                a: ({ href, children }) => {
                                    // Check if the link is an image
                                    const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(href);

                                    // If it's an image link and the text is the URL itself (raw link)
                                    // OR if the user just wants all image links to embed
                                    if (isImage) {
                                        return (
                                            <div className="embedded-image-container">
                                                <img
                                                    src={href}
                                                    alt={typeof children === 'string' ? children : 'embedded content'}
                                                    className="post-embedded-image"
                                                />
                                            </div>
                                        );
                                    }

                                    // Default link behavior
                                    return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                                }
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BlogPostCard;
