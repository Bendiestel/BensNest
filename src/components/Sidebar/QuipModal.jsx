import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import './QuipModal.css';

const QuipModal = ({ quip, onClose }) => {
    if (!quip) return null;

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="quip-modal-window"
                initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
                transition={{ type: "spring", damping: 15 }}
                onClick={e => e.stopPropagation()}
            >
                <div className="window-title-bar quip-modal-header">
                    <span className="window-title">💭 QUIP MAXIMIZED</span>
                    <button className="window-close-btn" onClick={onClose}><FiX /></button>
                </div>

                <div className="window-content quip-modal-body">
                    <div className="quip-large-text">
                        <span className="quote-mark">“</span>
                        {quip.text}
                        <span className="quote-mark">”</span>
                    </div>
                </div>

                <div className="quip-modal-footer">
                    <button className="y2k-button" onClick={onClose}>OKAY</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default QuipModal;
