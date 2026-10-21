import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dev-footer">
      <div className="footer-container">
        <div className="footer-columns">
          {/* Column 1: Explore */}
          <div className="footer-col">
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="#about">About Pranav</a></li>
              <li><a href="#featured-articles">Articles</a></li>
              <li><a href="#featured-tutorials">Tutorials</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#faqs">FAQs</a></li>
              <li><a href="#help">Help</a></li>
              <li><a href="mailto:pranav9081.ai25@chitkara.edu.in">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Stay connected */}
          <div className="footer-col">
            <h4 className="footer-col-title">Stay connected</h4>
            <div className="social-icons">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.598 0 9 1.582 9 4.615V8z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Twitter / X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Banner & Policies */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            DEV@Deakin {currentYear}
          </div>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="legal-separator">•</span>
            <a href="#terms">Terms</a>
            <span className="legal-separator">•</span>
            <a href="#code-of-conduct">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
