import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch, currentUser, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo - links back to Home as per Task P4 requirement */}
        <div className="navbar-brand">
          <Link to="/" className="brand-logo">
            <span className="brand-accent">DEV</span>@Deakin
          </Link>
        </div>

        {/* Primary Top Navigation Menu Links from Tasks 1, 2, 3 */}
        <nav className="navbar-nav-links">
          <a href="/#about" className="nav-link">About Me</a>
          <a href="/#work" className="nav-link">My Work</a>
          <a href="/#featured-articles" className="nav-link">Articles</a>
          <a href="/#featured-tutorials" className="nav-link">Tutorials</a>
          <a href="/#gallery" className="nav-link">Gallery</a>
        </nav>

        {/* Global Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search articles, tutorials, discussions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear"
                onClick={() => {
                  setSearchTerm('');
                  if (onSearch) onSearch('');
                }}
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Navigation Action Buttons */}
        <div className="navbar-actions">
          <button className="nav-btn btn-post" type="button" onClick={() => alert('Post feature will be expanded in a future task!')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14"/>
            </svg>
            <span>Post</span>
          </button>

          {currentUser ? (
            <div className="user-profile-menu">
              <div className="user-badge" title={currentUser.email}>
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.displayName || currentUser.name || 'User'} className="user-avatar-img" />
                ) : (
                  <span className="user-avatar">
                    {(currentUser.displayName || currentUser.name || currentUser.email || 'U')[0].toUpperCase()}
                  </span>
                )}
                <span className="user-name">{currentUser.displayName || currentUser.name || currentUser.email}</span>
              </div>
              <button className="nav-btn btn-logout" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-nav-buttons">
              <Link to="/login" className="nav-btn btn-login">
                Login
              </Link>
              <Link to="/signup" className="nav-btn btn-signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
