import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePosts } from './hooks/usePosts';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import TreeTimeline from './components/TreeTimeline/TreeTimeline';
import BlogPostCard from './components/BlogPost/BlogPostCard';
import EmailCaptchaModal from './components/Sidebar/EmailCaptchaModal';
import { Container, HeaderArea, SidebarArea, MainContent, FooterArea } from './components/Layout/SiteContainer';
import './App.css';

function App() {
  const { posts } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEmailCaptcha, setShowEmailCaptcha] = useState(false);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <>
      <Container>
        <HeaderArea>
          <Header />
        </HeaderArea>

        <SidebarArea>
          <Sidebar onEmailClick={() => setShowEmailCaptcha(true)} />
        </SidebarArea>

        <MainContent>
          <TreeTimeline
            posts={posts}
            onPostClick={handlePostClick}
          />
        </MainContent>

        <FooterArea>
          <p>Best viewed with Internet Explorer 6.0 at 800x600 resolution.</p>
          <p>© 2026 Ben's Nest. All pixels reserved.</p>
        </FooterArea>
      </Container>

      <AnimatePresence>
        {selectedPost && (
          <BlogPostCard
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}

        {showEmailCaptcha && (
          <EmailCaptchaModal
            onClose={() => setShowEmailCaptcha(false)}
            email="ben.diestel@mail.mcgill.ca"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
