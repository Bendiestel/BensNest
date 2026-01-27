import { motion } from 'framer-motion';
import nestLogo from '../../assets/nest_logo.png';
import './Header.css';

const Header = ({ onCreatePost }) => {
    return (
        <motion.header
            className="header"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="header-content">
                <motion.div
                    className="logo-container"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <img src={nestLogo} alt="Ben's Nest" className="logo pulse-glow" />
                </motion.div>

                <motion.h1
                    className="site-title gradient-text"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                    ✨ BEN'S NEST ✨
                </motion.h1>

                <motion.p
                    className="tagline glow-pink"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    ~ where thoughts grow like branches ~
                </motion.p>

                <motion.div
                    className="visitor-counter pixel-border"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                >
                    <span className="counter-label">VISITORS:</span>
                    <span className="counter-number gradient-text">
                        {Math.floor(Math.random() * 9000) + 1000}
                    </span>
                </motion.div>

                <motion.button
                    className="y2k-button create-btn"
                    onClick={onCreatePost}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ✨ Add New Post ✨
                </motion.button>
            </div>

            <div className="header-sparkles">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="sparkle-dot"
                        style={{
                            left: `${20 + i * 15}%`,
                            animationDelay: `${i * 0.3}s`
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </div>
        </motion.header>
    );
};

export default Header;
