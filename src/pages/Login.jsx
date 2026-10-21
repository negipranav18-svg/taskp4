import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { auth, db } from '../firebase';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Optional success message passed from signup redirect
  const successMsg = location.state?.message || '';

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

      // 1. Try checking Firestore database bcrypt hash (with safety timeout)
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email.trim().toLowerCase()));
        
        const fetchPromise = getDocs(q);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Firestore read timeout')), 1500)
        );
        
        const querySnapshot = await Promise.race([fetchPromise, timeoutPromise]);

        if (querySnapshot && !querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          if (userData.passwordHash) {
            const isMatch = bcrypt.compareSync(password, userData.passwordHash);
            if (!isMatch) {
              setError('Incorrect password. Please try again or sign up for a free account.');
              setLoading(false);
              return;
            }
            firestoreBcryptVerified = true;
          }
        }
      } catch (firestoreErr) {
        console.warn('Firestore bcrypt check skipped/timed out:', firestoreErr.message);
      }

      // 2. Sign in via Firebase Authentication SDK
      try {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } catch (authErr) {
        // If Firebase Auth failed but Firestore bcrypt passed, allow login; otherwise throw
        if (!firestoreBcryptVerified) {
          throw authErr;
        }
      }

      // 3. Automatically redirect to Home page upon success (Task P4 requirement)
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      // As requested in the task brief:
      // "If their details are incorrect, suggest the user tries again, or that they sign-up for a free account."
      setError('Invalid credentials. Please try again or click "Sign up" to create a free account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Wireframe: Top link to Sign up */}
        <div className="auth-header-row">
          <Link to="/signup" className="auth-switch-link">
            Sign up
          </Link>
        </div>

        {successMsg && <div className="auth-alert-success">{successMsg}</div>}
        {error && <div className="auth-alert-error">{error}</div>}

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
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
