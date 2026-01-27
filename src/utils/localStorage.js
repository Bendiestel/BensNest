// LocalStorage utilities for managing blog posts

const STORAGE_KEY = 'bensnest_posts';

export const savePosts = (posts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error('Error saving posts:', error);
    return false;
  }
};

export const loadPosts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

export const deletePost = (postId) => {
  try {
    const posts = loadPosts();
    const filtered = posts.filter(post => post.id !== postId);
    savePosts(filtered);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};

export const exportPosts = () => {
  const posts = loadPosts();
  const dataStr = JSON.stringify(posts, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bensnest_backup_${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importPosts = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const posts = JSON.parse(e.target.result);
        savePosts(posts);
        resolve(posts);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
