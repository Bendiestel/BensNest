
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
    return (
        <div className="header-container">
            <div className="banner">
                <h1 className="banner-title">✨ BEN'S NEST ✨</h1>
                <p className="banner-subtitle">est. 2026</p>
            </div>

            <div className="marquee-container">
                <marquee scrollamount="5" scrolldelay="100">
                    ★ WELCOME TO MY NEST ★ GUESTBOOK COMING SOON ★
                </marquee>
            </div>
        </div>
    );
};

export default Header;
