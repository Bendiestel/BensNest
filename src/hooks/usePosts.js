import { useState, useEffect } from 'react';
import { savePosts, loadPosts, deletePost as removePost } from '../utils/localStorage';
import { nanoid } from 'nanoid';

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load posts on mount
    useEffect(() => {
        const loadedPosts = loadPosts();
        setPosts(loadedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        setLoading(false);
    }, []);

    // Create new post
    const createPost = (postData) => {
        const newPost = {
            id: nanoid(),
            timestamp: new Date().toISOString(),
            ...postData
        };

        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        savePosts(updatedPosts);
        return newPost;
    };

    // Delete post
    const deletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        removePost(postId);
    };

    // Update post
    const updatePost = (postId, updates) => {
        const updatedPosts = posts.map(post =>
            post.id === postId ? { ...post, ...updates } : post
        );
        setPosts(updatedPosts);
        savePosts(updatedPosts);
    };

    return {
        posts,
        loading,
        createPost,
        deletePost,
        updatePost
    };
};
