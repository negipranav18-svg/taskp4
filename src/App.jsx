
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'User',
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          avatar: user.photoURL || '/profile.jpg.png'
        });
      } else {
        setCurrentUser(null);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="app-layout">
        <p style={{ textAlign: 'center', padding: '40px' }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar
        onSearch={(query) => setSearchQuery(query)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Home searchQuery={searchQuery} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/signup"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <Signup />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <Home searchQuery={searchQuery} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
