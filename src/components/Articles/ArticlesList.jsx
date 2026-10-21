import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import './Articles.css';

const ArticlesList = ({ articles, searchQuery = '' }) => {
  const [showAll, setShowAll] = useState(false);

  // Filter articles based on optional search query
  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query)
    );
  });

  // Display initial 3 articles or all when expanded
  const displayedArticles = showAll ? filteredArticles : filteredArticles.slice(0, 3);

  return (
    <section id="featured-articles" className="content-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Featured Articles</h2>
          <div className="section-divider"></div>
        </div>

        {displayedArticles.length === 0 ? (
          <div className="no-results">
            <p>No articles match your search criteria.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {/* Must store articles in an array and use map() */}
            {displayedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {filteredArticles.length > 3 && (
          <div className="see-all-container">
            <button
              className="btn-see-all"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show less articles' : 'See all articles'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesList;
