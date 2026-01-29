import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { format } from 'date-fns';
import { FiCalendar } from 'react-icons/fi';
import './TreeNode.css';

gsap.registerPlugin(ScrollTrigger);

const TreeNode = ({ post, side, index, onClick }) => {
    const nodeRef = useRef(null);
    const branchRef = useRef(null);

    useEffect(() => {
        if (!nodeRef.current || !branchRef.current) return;

        // Animate node appearance on scroll
        gsap.fromTo(
            nodeRef.current,
            {
                opacity: 0,
                y: 50,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                scrollTrigger: {
                    trigger: nodeRef.current,
                    start: 'top 90%',
                    end: 'top 60%',
                    scrub: 1,
                },
            }
        );



        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [side]);

    const formattedDate = format(new Date(post.timestamp), 'MMM dd, yyyy • h:mm a');

    return (
        <div className={`tree-node ${side}`} ref={nodeRef}>
            {/* Branch connecting to trunk */}
            <div className={`branch ${side}`} ref={branchRef}>
                <div className="branch-glow"></div>
            </div>

            {/* Node Card */}
            <motion.div
                className="node-card glass-pink"
                onClick={onClick}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {post.image && (
                    <div className="node-image-container">
                        <img src={post.image} alt={post.title} className="node-image" />
                        <div className="image-overlay"></div>
                    </div>
                )}

                <div className="node-content">
                    <h3 className="node-title gradient-text">{post.title}</h3>

                    <div className="node-timestamp">
                        <FiCalendar />
                        <span>{formattedDate}</span>
                    </div>

                    <p className="node-preview">
                        {post.content.substring(0, 100)}
                        {post.content.length > 100 ? '...' : ''}
                    </p>

                    <div className="node-read-more glow-blue">
                        Click to read more →
                    </div>
                </div>

                {/* Decorative corners */}
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
            </motion.div>
        </div>
    );
};

export default TreeNode;
