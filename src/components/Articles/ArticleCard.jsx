import React from 'react';

const ArticleCard = ({ article }) => {
  const { title, description, author, rating, image, tags } = article;

  return (
    <article className="content-card article-card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} className="card-image" loading="lazy" />
        {tags && tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="card-tag">{tag}</span>
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
        <div className="card-meta-author">
          <span className="author-prefix">Author:</span>
          <span className="author-name">{author}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
