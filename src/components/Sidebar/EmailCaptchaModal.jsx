import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiCheck, FiMail } from 'react-icons/fi';
import './EmailCaptchaModal.css';

const DREAD_OPTIONS = [
    { id: 1, text: "The passage of time", isDread: true },
    { id: 2, text: "Unanswered texts", isDread: true },
    { id: 3, text: "A deflated balloon", isDread: true },
    { id: 4, text: "Sundays at 7pm", isDread: true },
    { id: 5, text: "Cold coffee", isDread: true },
    { id: 6, text: "Forgotten passwords", isDread: true },
    { id: 7, text: "Puppies", isDread: false },
    { id: 8, text: "Sunshine", isDread: false },
    { id: 9, text: "Pizza", isDread: false },
];

const EmailCaptchaModal = ({ onClose, email = "ben.diestel@mail.mcgill.ca" }) => {
    const [selected, setSelected] = useState([]);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const toggleOption = (id) => {
        if (verified) return;
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
        setError("");
    };

    const handleVerify = () => {
        const hasDread = selected.some(id => DREAD_OPTIONS.find(o => o.id === id).isDread);
        const hasJoy = selected.some(id => !DREAD_OPTIONS.find(o => o.id === id).isDread);

        if (hasJoy) {
            setError("❌ ACCESS DENIED: Joy detected. We only accept dread here.");
            return;
        }

        if (!hasDread) {
            setError("⚠️ ERROR: Insufficient dread selected.");
            return;
        }

        setVerified(true);
        setTimeout(() => {
            window.location.href = `mailto:${email}`;
        }, 1500);
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
                className="captcha-window"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={e => e.stopPropagation()}
            >
                <div className="window-title-bar captcha-header">
                    <span className="window-title">🛡️ SECURITY CHECK</span>
                    <button className="window-close-btn" onClick={onClose}><FiX /></button>
                </div>

                <div className="window-content captcha-body">
                    {!verified ? (
                        <>
                            <div className="captcha-prompt-box">
                                <p className="captcha-instruction">Please select all items containing:</p>
                                <h2 className="dread-text">EXISTENTIAL DREAD</h2>
                                <p className="captcha-sub">To prove you are human.</p>
                            </div>

                            <div className="captcha-grid">
                                {DREAD_OPTIONS.map(opt => (
                                    <div
                                        key={opt.id}
                                        className={`captcha-item ${selected.includes(opt.id) ? 'selected' : ''}`}
                                        onClick={() => toggleOption(opt.id)}
                                    >
                                        {opt.text}
                                        {selected.includes(opt.id) && <div className="check-overlay"><FiCheck /></div>}
                                    </div>
                                ))}
                            </div>

                            {error && <div className="captcha-error">{error}</div>}

                            <div className="captcha-actions">
                                <button className="y2k-button" onClick={handleVerify}>VERIFY</button>
                            </div>
                        </>
                    ) : (
                        <div className="success-view">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="success-icon"
                            >
                                <FiCheck size={50} />
                            </motion.div>
                            <h3>HUMANITY CONFIRMED</h3>
                            <p>Opening mail client...</p>
                            <p className="email-reveal"><FiMail /> {email}</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EmailCaptchaModal;
