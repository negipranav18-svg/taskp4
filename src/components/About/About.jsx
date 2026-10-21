import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-card">
          <div className="about-header">
            <div className="profile-img-wrapper">
              <img
                src="/profile.jpg.png"
                alt="Pranav Profile"
                className="about-profile-img"
              />
              <span className="profile-badge">Student Developer</span>
            </div>
            <h2 className="about-title">About Me</h2>
            <p className="about-subtitle">Pranav • ID: 2510999081</p>
          </div>

          <div className="about-content">
            <p className="about-text">
              I am a second year university student studying <strong>Artificial Intelligence and Machine Learning</strong> at Chitkara University in collaboration with Deakin University.
            </p>
            <p className="about-text">
              I have worked with <strong>C++, C#, and Python</strong>. At the moment, I am advancing my web development skills with modern <strong>React, JavaScript, HTML5, and CSS3</strong>.
            </p>
            <p className="about-text">
              I have also done hands-on projects with <strong>Arduino</strong> and embedded hardware, which has helped me understand the synergy between low-level hardware and high-level software systems.
            </p>
          </div>

          <div className="about-skills">
            <span className="skill-pill">AI & Machine Learning</span>
            <span className="skill-pill">React & Vite</span>
            <span className="skill-pill">JavaScript (ES6+)</span>
            <span className="skill-pill">Python</span>
            <span className="skill-pill">C++ & C#</span>
            <span className="skill-pill">Arduino IoT</span>
            <span className="skill-pill">HTML & CSS</span>
          </div>

          <div className="about-contact-cta">
            <a href="mailto:pranav9081.ai25@chitkara.edu.in" className="btn-contact-author">
              ✉️ Contact Pranav: pranav9081.ai25@chitkara.edu.in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
