import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Article from './pages/Article';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Spinner from './components/common/Spinner';

// Lazy load Dashboard page
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const App = () => {
  return (
    <AuthProvider>
      <div className="atmospheric-bg">
        <div className="atmospheric-circle-1"></div>
        <div className="atmospheric-circle-2"></div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:slug" element={<Article />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <React.Suspense fallback={<div className="d-flex align-items-center justify-content-center min-h-screen"><Spinner /></div>}>
                <Dashboard />
              </React.Suspense>
            } 
          />
          <Route path="/admin/create-post" element={<CreatePost />} />
          <Route path="/admin/edit-post/:slug" element={<EditPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

