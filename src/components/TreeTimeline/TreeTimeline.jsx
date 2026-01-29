import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TreeNode from './TreeNode';
import './TreeTimeline.css';

gsap.registerPlugin(ScrollTrigger);

const TreeTimeline = ({ posts, onPostClick }) => {
    const timelineRef = useRef(null);
    const trunkRef = useRef(null);

    useEffect(() => {
        if (!trunkRef.current || posts.length === 0) return;

        // Animate trunk growth on scroll
        gsap.to(trunkRef.current, {
            height: '100%',
            scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
            },
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [posts]);

    if (posts.length === 0) {
        return (
            <div className="empty-timeline">
                <motion.div
                    className="empty-message glass-pink"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                >
                    <h2 className="gradient-text">🌱 A New Beginning 🌱</h2>
                    <p>My nest is currently empty, but new memories will be planted here soon. Stay tuned!</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="tree-timeline" ref={timelineRef}>
            {/* Central Trunk */}
            <div className="trunk-container">
                <div className="trunk" ref={trunkRef}>
                    <div className="trunk-glow"></div>
                </div>
            </div>

            {/* Timeline Posts */}
            <div className="timeline-nodes">
                {posts.map((post, index) => {
                    const side = index % 2 === 0 ? 'left' : 'right';

                    return (
                        <TreeNode
                            key={post.id}
                            post={post}
                            side={side}
                            index={index}
                            onClick={() => onPostClick(post)}
                        />
                    );
                })}
            </div>

            {/* Decorative elements */}
            <div className="tree-sparkles">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="tree-sparkle"
                        style={{
                            top: `${i * 10 + 10}%`,
                            left: i % 2 === 0 ? '45%' : '55%',
                        }}
                        animate={{
                            scale: [0.5, 1, 0.5],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TreeTimeline;
