import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Screens
import Dashboard from './screens/Dashboard';
import Calendar from './screens/Calendar';
import PostComposer from './screens/PostComposer';
import AIAssistant from './screens/AIAssistant';
import MediaLibrary from './screens/MediaLibrary';
import Approvals from './screens/Approvals';
import Queue from './screens/Queue';
import Analytics from './screens/Analytics';
import Settings from './screens/Settings';
import Auth from './screens/Auth';

// Custom Hooks
import useWorkspace from './hooks/useWorkspace';
import usePosts from './hooks/usePosts';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Custom states
  const { 
    activeWorkspace, 
    workspaces, 
    teamMembers, 
    inviteMember, 
    changeWorkspace,
    loadWorkspaces
  } = useWorkspace(isAuthenticated);

  const { 
    posts, 
    addPost, 
    reschedulePost, 
    submitForReview, 
    approvePost, 
    rejectPost,
    loadPosts
  } = usePosts(activeWorkspace?.id);

  // Sync data on authentication success
  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    if (user.activeWorkspace) {
      localStorage.setItem('workspaceId', typeof user.activeWorkspace === 'object' ? user.activeWorkspace.id || user.activeWorkspace._id : user.activeWorkspace);
    }
    loadWorkspaces();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('workspaceId');
    setIsAuthenticated(false);
  };

  // Re-fetch posts when active workspace changes
  useEffect(() => {
    if (isAuthenticated && activeWorkspace?.id) {
      localStorage.setItem('workspaceId', activeWorkspace.id);
      loadPosts();
    }
  }, [activeWorkspace?.id, isAuthenticated]);

  if (!isAuthenticated) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} posts={posts} />;
      case 'calendar':
        return <Calendar setActiveTab={setActiveTab} posts={posts} reschedulePost={reschedulePost} />;
      case 'composer':
        return <PostComposer setActiveTab={setActiveTab} addPost={addPost} />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'media-library':
        return <MediaLibrary />;
      case 'approvals':
        return <Approvals posts={posts} approvePost={approvePost} rejectPost={rejectPost} />;
      case 'queue':
        return <Queue posts={posts} reschedulePost={reschedulePost} submitForReview={submitForReview} />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return (
          <Settings 
            activeWorkspace={activeWorkspace} 
            teamMembers={teamMembers} 
            inviteMember={inviteMember} 
            onLogout={handleLogout}
          />
        );
      default:
        return <Dashboard setActiveTab={setActiveTab} posts={posts} />;
    }
  };

  return (
    <div className="h-100 d-flex flex-column">
      {/* Navigation sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeWorkspace={activeWorkspace}
        workspaces={workspaces}
        changeWorkspace={changeWorkspace}
      />

      {/* Main panel container */}
      <div className="d-flex flex-column h-100" style={{ paddingLeft: '0px' }}>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        
        {/* Active view canvas */}
        <main className="flex-grow-1" style={{ marginLeft: '260px' }}>
          {renderActiveScreen()}
        </main>
      </div>
    </div>
  );
}
