import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsLoading(true);

    // Simulate sending email to backend API (or connecting to Express backend)
    setTimeout(() => {
      setIsLoading(false);
      setStatus({
        type: 'success',
        message: `Welcome email sent successfully to ${email}!`
      });
      setEmail('');
    }, 600);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="newsletter-label">
            SIGN UP FOR OUR DAILY INSIDER
          </label>
          
          <div className="newsletter-input-group">
            <input
              id="newsletter-email"
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status.message) setStatus({ type: '', message: '' });
              }}
              required
            />
            <button
              type="submit"
              className="newsletter-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Subscribe'}
            </button>
          </div>
        </form>

        {status.message && (
          <div className={`newsletter-feedback ${status.type}`}>
            {status.type === 'success' && <span>✓ </span>}
            {status.type === 'error' && <span>⚠️ </span>}
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
