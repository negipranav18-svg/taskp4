import React, { useState } from 'react';
import './Banner.css';

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      className="hero-banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://sustainable.chitkara.edu.in/wp-content/themes/sustain/images/main-slider/sustain-banner03.jpg"
        alt="Chitkara University Campus Banner"
        className="banner-bg-img"
      />
      <div className="banner-overlay">
        <div className="banner-content">
          <span className="banner-badge">SIT313 Knowledge Hub</span>
          <h1 className="banner-title">Welcome to DEV@Deakin</h1>
          <p className="banner-subtitle">
            Explore industry-standard tutorials, insightful articles, and connect with
            passionate developers worldwide.
          </p>
          <div className="banner-cta">
            <a href="#about" className="btn-banner-primary">About Pranav</a>
            <a href="#featured-articles" className="btn-banner-secondary">Explore Articles</a>
            <a href="#featured-tutorials" className="btn-banner-secondary">Browse Tutorials</a>
          </div>
        </div>
      </div>

      {/* Task 1 Hover Message */}
      <div className={`hover-message ${isHovered ? 'visible' : ''}`}>
        👋 Hey, I'm Pranav
      </div>
    </section>
  );
};

export default Banner;

