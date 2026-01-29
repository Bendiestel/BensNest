import { motion } from 'framer-motion';
import './AboutMe.css';

const AboutMe = () => {
    return (
        <div className="letter-container">
            <motion.div
                className="stationary-page"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="letter-header">
                    <span className="letter-date">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>

                <div className="letter-content">
                    <h1>A Letter from Me</h1>
                    <p>Hi, my name is Ben, and thank you so much for checking out this little website I built! Please explore and read some of my posts, I think you’ll find something interesting here.</p>

                    <p>If you’d like to see my professional experience, check out my <a href="https://www.linkedin.com/in/ben-diestel-293242217/" target="_blank" rel="noopener noreferrer">LinkedIn</a>. And if you want to see what I’m up to day-to-day, feel free to visit my <a href="https://www.instagram.com/discountedcheese4sale/" target="_blank" rel="noopener noreferrer">Instagram</a>!</p>
                </div>

                <div className="letter-footer">
                    <p className="signature">— Ben</p>
                </div>

                {/* Decorative sticker */}
                <div className="letter-sticker">⭐</div>
            </motion.div>
        </div>
    );
};

export default AboutMe;
