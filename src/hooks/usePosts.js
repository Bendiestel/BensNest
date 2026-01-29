import { useState, useEffect } from 'react';

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                // Import all markdown files from ../posts directory
                const modules = import.meta.glob('../posts/*.md', { query: '?raw', eager: true });

                const loadedPosts = Object.entries(modules).map(([path, content]) => {
                    // Simple frontmatter parser
                    const match = content.default.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/);

                    if (!match) {
                        return {
                            id: path,
                            title: 'Untitled',
                            content: content.default,
                            timestamp: new Date().toISOString()
                        };
                    }

                    const [, frontmatter, body] = match;
                    const metadata = {};

                    // Parse key-value pairs in frontmatter
                    frontmatter.split(/[\r\n]+/).forEach(line => {
                        const [key, ...value] = line.split(':');
                        if (key && value.length > 0) {
                            metadata[key.trim()] = value.join(':').trim();
                        }
                    });

                    // Generate ID from filename
                    const filename = path.split('/').pop().replace('.md', '');

                    return {
                        id: filename,
                        title: metadata.title || 'Untitled',
                        image: metadata.image || null,
                        timestamp: metadata.date || new Date().toISOString(),
                        content: body.trim()
                    };
                });

                // Sort by date (newest first)
                loadedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setPosts(loadedPosts);
            } catch (error) {
                console.error("Error loading posts:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    return {
        posts,
        loading
    };
};
