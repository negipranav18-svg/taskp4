import React from 'react';
import { projectsData } from '../../data/projectsData';
import './MyWork.css';

const MyWork = () => {
  return (
    <section id="work" className="my-work-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">My Work</h2>
          <div className="section-divider"></div>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyWork;
