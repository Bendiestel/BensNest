import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePosts } from './hooks/usePosts';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import TreeTimeline from './components/TreeTimeline/TreeTimeline';
import Guestbook from './components/Guestbook/Guestbook';
import AboutMe from './components/AboutMe/AboutMe';
import BlogPostCard from './components/BlogPost/BlogPostCard';
import EmailCaptchaModal from './components/Sidebar/EmailCaptchaModal';
import QuipModal from './components/Sidebar/QuipModal';
import { Container, HeaderArea, SidebarArea, MainContent, FooterArea } from './components/Layout/SiteContainer';
import './App.css';

function App() {
  const { posts } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEmailCaptcha, setShowEmailCaptcha] = useState(false);
  const [selectedQuip, setSelectedQuip] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

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
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onEmailClick={() => setShowEmailCaptcha(true)}
            onQuipClick={(quip) => setSelectedQuip(quip)}
          />
        </SidebarArea>

        <MainContent>
          {activeTab === 'home' ? (
            <TreeTimeline
              posts={posts}
              onPostClick={handlePostClick}
            />
          ) : activeTab === 'guestbook' ? (
            <Guestbook onClose={() => setActiveTab('home')} />
          ) : activeTab === 'about' ? (
            <AboutMe />
          ) : (
            <div className="empty-timeline center-align">
              <h2>Coming Soon!</h2>
              <p>This section is currently under construction.</p>
            </div>
          )}
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

        {selectedQuip && (
          <QuipModal
            quip={selectedQuip}
            onClose={() => setSelectedQuip(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
