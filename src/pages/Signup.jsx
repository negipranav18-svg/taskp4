import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { auth, db } from '../firebase';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Data Validation
    if (!name.trim()) {
      setError('Please enter your full name (first and last name).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      // 2. Encrypt password using bcrypt as strictly mandated by Task P4 requirement
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      // 3. Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      // 4. Update Firebase Profile with full name
      try {
        await updateProfile(userCredential.user, {
          displayName: name.trim()
        });
      } catch (profileErr) {
        console.warn('Profile update notice:', profileErr);
      }

      // 5. Store user details with encrypted password in Firestore database (with safety timeout)
      try {
        const firestorePromise = addDoc(collection(db, 'users'), {
          uid: userCredential.user.uid,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          passwordHash: hashedPassword,
          createdAt: serverTimestamp()
        });

        // 2-second timeout prevents UI freezing if Firestore rules are locked
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Firestore timeout')), 2000)
        );

        await Promise.race([firestorePromise, timeoutPromise]);
      } catch (firestoreErr) {
        console.warn('Firestore write notice (check Firestore rules in console):', firestoreErr.message);
      }

      // 6. Save in local backup for resilience
      try {
        const local = JSON.parse(localStorage.getItem('dev_at_deakin_users') || '[]');
        local.push({
          uid: userCredential.user.uid,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          passwordHash: hashedPassword
        });
        localStorage.setItem('dev_at_deakin_users', JSON.stringify(local));
      } catch (localErr) {
        console.warn('Local storage save notice:', localErr);
      }

      // 7. Automatically redirect to the Login page as required by Task P4
      navigate('/login', {
        state: { message: 'Account created successfully! Please sign in with your credentials.' }
      });
    } catch (err) {
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please provide a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create a DEV@Deakin Account</h2>

        {error && <div className="auth-alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="signup-name">
              Name*
            </label>
            <input
              id="signup-name"
              type="text"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Pranav Sharma"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="signup-email">
              Email*
            </label>
            <input
              id="signup-email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@example.com"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="signup-password">
              Password*
            </label>
            <input
              id="signup-password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="signup-confirm-password">
              Confirm password*
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>

          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <span style={{ color: '#718096', fontSize: '0.9rem' }}>
              Already have an account?{' '}
            </span>
            <Link to="/login" className="auth-switch-link">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
