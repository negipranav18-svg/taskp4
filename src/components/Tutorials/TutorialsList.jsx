import React, { useState } from 'react';
import TutorialCard from './TutorialCard';
import './Tutorials.css';

const TutorialsList = ({ tutorials, searchQuery = '' }) => {
  const [showAll, setShowAll] = useState(false);

  // Filter tutorials based on optional search query
  const filteredTutorials = tutorials.filter((tutorial) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      tutorial.title.toLowerCase().includes(query) ||
      tutorial.description.toLowerCase().includes(query) ||
      tutorial.username.toLowerCase().includes(query)
    );
  });

  // Display initial 3 tutorials or all when expanded
  const displayedTutorials = showAll ? filteredTutorials : filteredTutorials.slice(0, 3);

  return (
    <section id="featured-tutorials" className="content-section tutorials-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Featured Tutorials</h2>
          <div className="section-divider"></div>
        </div>

        {displayedTutorials.length === 0 ? (
          <div className="no-results">
            <p>No tutorials match your search criteria.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {/* Must store tutorials in an array and use map() */}
            {displayedTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        )}

        {filteredTutorials.length > 3 && (
          <div className="see-all-container">
            <button
              className="btn-see-all"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show less tutorials' : 'See all tutorials'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TutorialsList;
