import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { UserDashboard } from './components/UserDashboard/UserDashboard';
import { WorkerDashboard } from './components/WorkerDashboard/WorkerDashboard';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { Notices } from './components/Notices/Notices';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Profile } from './components/Profile/Profile';
import { NotFound } from './components/NotFound/NotFound';
import AnnouncementPage from './components/AnnouncePage/AnnouncementPage';
import { ChitChatPage } from './components/ChitChat/ChitChatPage';
import WelcomePage from './components/Welcome/WelcomePage';
import { ChatPage } from './components/Chat/ChatPage';
import { Services } from './components/Services/Services';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on app load
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? <Navigate to="/" /> : <Register />
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <UserDashboard onLogout={handleLogout} userData={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/worker/*" 
              element={
                <ProtectedRoute>
                  <WorkerDashboard onLogout={handleLogout} userData={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboard onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile userData={user} />
                </ProtectedRoute>
              } 
            />

            {/* New ChitChat Page Route */}
            <Route 
              path="/chit-chat" 
              element={
                <ProtectedRoute>
                  <ChitChatPage user={user} />
                </ProtectedRoute>
              }
            />

            {/* Welcome Page Route */}
            <Route path="/welcome" element={<WelcomePage />} />

            {/* Chat Page Route */}
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <ChatPage user={user} />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
};

export default App;