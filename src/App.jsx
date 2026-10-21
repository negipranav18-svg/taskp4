import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Pranav',
    displayName: 'Pranav',
    email: 'pranav9081.ai25@chitkara.edu.in',
    avatar: '/profile.jpg.png'
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          name: user.displayName || user.email.split('@')[0],
          displayName: user.displayName || user.email.split('@')[0],
          email: user.email,
          avatar: '/profile.jpg.png'
        });
      } else {
        setCurrentUser({
          name: 'Pranav',
          displayName: 'Pranav',
          email: 'pranav9081.ai25@chitkara.edu.in',
          avatar: '/profile.jpg.png'
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="app-layout">
      {/* Navigation bar appearing identically across all pages (Task P4 Section 5) */}
      <Navbar
        onSearch={(query) => setSearchQuery(query)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Multi-page routing with React Router */}
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* Footer appearing identically across all pages (Task P4 Section 5) */}
      <Footer />
    </div>
  );
}

export default App;
