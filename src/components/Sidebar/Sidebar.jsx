
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import avatar from '../../assets/avatar.png';
import quips from '../../data/quips.json';
import './Sidebar.css';

const Sidebar = ({ onEmailClick, onQuipClick, activeTab, onTabChange }) => {

    return (
        <aside className="sidebar">
            {/* Profile Section */}
            <div className="sidebar-box profile-box">
                <div className="box-header">:: PROFILE ::</div>
                <div className="box-content center-align">
                    <img
                        src={avatar}
                        alt="Ben Diestel"
                        className="profile-pic"
                    />
                    <div className="status-lines">
                        <p><strong>Name:</strong> Ben</p>
                        <p><strong>Mood:</strong> 🎧 Coding</p>
                        <p><strong>Listening:</strong> Grimes</p>
                        <p><strong>Location:</strong> Montreal, QC</p>
                    </div>
                </div>
            </div>

            {/* Quips Section */}
            <div className="sidebar-box updates-box">
                <div className="box-header">:: QUIPS ::</div>
                <div className="box-content scroll-box">
                    {quips.map((quip, index) => (
                        <div key={quip.id}>
                            <div className="quip-item" onClick={() => onQuipClick(quip)}>
                                <p className="quip-text">"{quip.text}"</p>
                            </div>
                            {index < quips.length - 1 && <div className="update-divider">---</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="sidebar-box nav-box">
                <div className="box-header">:: NAV ::</div>
                <ul className="nav-links">
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'home' ? 'active-link' : ''}
                            onClick={(e) => { e.preventDefault(); onTabChange('home'); }}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'about' ? 'active-link' : ''}
                            onClick={(e) => { e.preventDefault(); onTabChange('about'); }}
                        >
                            About Me
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'guestbook' ? 'active-link' : ''}
                            onClick={(e) => { e.preventDefault(); onTabChange('guestbook'); }}
                        >
                            Guestbook
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onEmailClick();
                            }}
                        >
                            E-mail Me
                        </a>
                    </li>
                </ul>
            </div>

            {/* Social Links */}
            <div className="sidebar-box blinkie-box">
                <div className="box-header">:: LINKS ::</div>
                <div className="box-content social-links-grid">
                    <a href="https://github.com/Bendiestel" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaGithub /> GitHub
                    </a>
                    <a href="https://www.instagram.com/discountedcheese4sale/" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaInstagram /> Instagram
                    </a>
                    <a href="https://www.linkedin.com/in/ben-diestel-293242217/" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaLinkedin /> LinkedIn
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
