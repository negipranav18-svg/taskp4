import React from 'react';

const TutorialCard = ({ tutorial }) => {
  const { title, description, username, rating, image, tags } = tutorial;

  return (
    <article className="content-card tutorial-card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} className="card-image" loading="lazy" />
        {tags && tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="card-tag tutorial-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>

      <div className="card-footer">
        <div className="card-rating">
          <span className="star-icon" aria-label="Rating">⭐</span>
          <span className="rating-score">{rating}</span>
        </div>
        <div className="card-meta-username">
          <span className="username-prefix">Instructor:</span>
          <span className="username-tag">{username}</span>
        </div>
      </div>
    </article>
  );
};

export default TutorialCard;
