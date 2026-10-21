import React from 'react';
import './Gallery.css';

const galleryImages = [
  {
    id: 1,
    src: '/profile2.jpg.jpeg',
    alt: 'Student Exploration',
    caption: 'Outdoor Exploration'
  },
  {
    id: 2,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtr4UoLL3UYbJKVQ5pRNsxLQ6_X0HHlaZTxL261cL0ug&s=10',
    alt: 'Campus Event',
    caption: 'University Activities'
  },
  {
    id: 3,
    src: '/profile5.jpg.jpeg',
    alt: 'Classroom Project',
    caption: 'Campus Life'
  },
  {
    id: 4,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIlFg1lG95qjVet0A_u7dHYXUOoeAhD8pnfLfN2jAnw&s=10',
    alt: 'Tech Collaboration',
    caption: 'Group Collaboration'
  }
];

const Gallery = () => {
  return (
    <section id="gallery" className="gallery-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Gallery</h2>
          <div className="section-divider"></div>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((item) => (
            <div key={item.id} className="gallery-item">
              <img src={item.src} alt={item.alt} className="gallery-img" loading="lazy" />
              <div className="gallery-item-overlay">
                <span className="gallery-caption">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
