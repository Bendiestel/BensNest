import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import entries from '../../data/guestbook.json';
import './Guestbook.css';

const MAX_CHAR = 100;
const ENTRIES_PER_PAGE = 4;

const StickyNote = ({ entry }) => {
    // Truncate message to max char count
    const message = entry.message.length > MAX_CHAR
        ? entry.message.substring(0, MAX_CHAR) + "..."
        : entry.message;

    return (
        <motion.div
            className="sticky-note"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                backgroundColor: entry.color,
                rotate: entry.rotation || 0
            }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
        >
            <div className="tape"></div>
            <div className="note-content">
                <p className="note-message">"{message}"</p>
                <div className="note-footer">
                    <span className="note-user">— {entry.user}</span>
                    <span className="note-date">{entry.date}</span>
                </div>
            </div>
        </motion.div>
    );
};

const Guestbook = ({ onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isClosing, setIsClosing] = useState(false);

    const totalPages = Math.ceil(entries.length / ENTRIES_PER_PAGE);
    const currentEntries = entries.slice(currentPage * ENTRIES_PER_PAGE, (currentPage + 1) * ENTRIES_PER_PAGE);

    const handleClose = () => {
        setIsClosing(true);
        // Wait for animation to finish then trigger tab change
        setTimeout(() => {
            onClose();
        }, 600);
    };

    return (
        <div className="guestbook-container">
            <motion.div
                className="scrapbook-page"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={isClosing ? { rotateY: -90, opacity: 0, x: -50 } : { rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "left center" }}
            >
                {/* Close Button */}
                <button className="book-close-btn" onClick={handleClose} title="Close Book">
                    ×
                </button>

                <div className="scrapbook-header">
                    <h2 className="scrapbook-title">✨ MY GUESTBOOK ✨</h2>
                    <p className="scrapbook-subtitle">Flip through the pages!</p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        className="notes-area"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentEntries.map(entry => (
                            <StickyNote key={entry.id} entry={entry} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <div className="pagination-controls">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="page-btn"
                    >
                        &lt; Previous
                    </button>
                    <span className="page-info">Page {currentPage + 1} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="page-btn"
                    >
                        Next &gt;
                    </button>
                </div>

                <div className="scrapbook-footer">
                    <p>Want to sign? E-mail me and I'll add your note!</p>
                </div>

                {/* Decorative Scrapbook Elements */}
                <div className="ring-binder">
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Guestbook;
