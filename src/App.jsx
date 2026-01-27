import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePosts } from './hooks/usePosts';
import Header from './components/Header/Header';
import TreeTimeline from './components/TreeTimeline/TreeTimeline';
import CreatePostForm from './components/CreatePost/CreatePostForm';
import BlogPostCard from './components/BlogPost/BlogPostCard';
import './App.css';

function App() {
  const { posts, createPost, deletePost } = usePosts();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleCreatePost = (postData) => {
    createPost(postData);
    setShowCreateForm(false);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="app">
      <Header onCreatePost={() => setShowCreateForm(true)} />

      <main className="main-content">
        <TreeTimeline
          posts={posts}
          onPostClick={handlePostClick}
        />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="gradient-text">✨ Built with love in the Y2K era ✨</p>
          <p className="footer-text">Ben's Nest © 2026</p>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showCreateForm && (
          <CreatePostForm
            onSubmit={handleCreatePost}
            onClose={() => setShowCreateForm(false)}
          />
        )}

        {selectedPost && (
          <BlogPostCard
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onDelete={deletePost}
          />
        )}
      </AnimatePresence>

      {/* Background Pattern */}
      <div className="background-pattern"></div>
    </div>
  );
}

export default App;
