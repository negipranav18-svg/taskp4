
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { auth, db, googleProvider } from '../firebase';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const successMsg = location.state?.message || '';

  // Existing email and password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both your email and password.');
      return;
    }

    setLoading(true);

    try {
      let firestoreBcryptVerified = false;

      try {
        const usersRef = collection(db, 'users');
        const q = query(
          usersRef,
          where('email', '==', email.trim().toLowerCase())
        );

        const fetchPromise = getDocs(q);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Firestore read timeout')),
            1500
          )
        );

        const querySnapshot = await Promise.race([
          fetchPromise,
          timeoutPromise,
        ]);

        if (querySnapshot && !querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();

          if (userData.passwordHash) {
            const isMatch = bcrypt.compareSync(
              password,
              userData.passwordHash
            );

            if (!isMatch) {
              setError(
                'Incorrect password. Please try again or sign up for a free account.'
              );
              return;
            }

            firestoreBcryptVerified = true;
          }
        }
      } catch (firestoreErr) {
        console.warn(
          'Firestore bcrypt check skipped/timed out:',
          firestoreErr.message
        );
      }

      try {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      } catch (authErr) {
        if (!firestoreBcryptVerified) {
          throw authErr;
        }
      }

      // Keep the existing email login redirect
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        'Invalid credentials. Please try again or click "Sign up" to create a free account.'
      );
    } finally {
      setLoading(false);
    }
  };

  // New Google login
  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);

      // Open the Dashboard after successful Google login
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);

      if (err.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in was cancelled. Please try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError(
          'This website domain is not authorized in Firebase Authentication settings.'
        );
      } else {
        setError(
          'Google login failed. Please check your Firebase settings and try again.'
        );
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header-row">
          <Link to="/signup" className="auth-switch-link">
            Sign up
          </Link>
        </div>

        {successMsg && (
          <div className="auth-alert-success">{successMsg}</div>
        )}

        {error && (
          <div className="auth-alert-error">{error}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="login-email">
              Your email
            </label>

            <input
              id="login-email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="login-password">
              Your password
            </label>

            <input
              id="login-password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading || googleLoading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="google-login-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="google-login-btn"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
        >
          {googleLoading ? 'Connecting to Google...' : '🌐 Continue with Google'}
        </button>
      </div>
    </div>
  );
};

export default Login;
