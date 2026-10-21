import React from 'react';
import Banner from '../components/Banner/Banner';
import About from '../components/About/About';
import MyWork from '../components/MyWork/MyWork';
import ArticlesList from '../components/Articles/ArticlesList';
import TutorialsList from '../components/Tutorials/TutorialsList';
import Gallery from '../components/Gallery/Gallery';
import Newsletter from '../components/Newsletter/Newsletter';
import { articlesData } from '../data/articlesData';
import { tutorialsData } from '../data/tutorialsData';

const Home = ({ searchQuery = '' }) => {
  return (
    <main className="home-container">
      {/* 1. Hero Banner with Campus Image & Hover Message (Task 1) */}
      <Banner />

      {/* 2. About Me Component with Profile Photo & Bio (Task 1) */}
      <About />

      {/* 3. My Work Section with Project Cards (Task 1) */}
      <MyWork />

      {/* 4. Featured Articles Section mapped with Array.map() (Task 3) */}
      <ArticlesList articles={articlesData} searchQuery={searchQuery} />

      {/* 5. Featured Tutorials Section mapped with Array.map() (Task 3) */}
      <TutorialsList tutorials={tutorialsData} searchQuery={searchQuery} />

      {/* 6. Photo Gallery Section with Responsive CSS Grid (Task 1) */}
      <Gallery />

      {/* 7. Daily Insider Newsletter Subscription Bar (Task 2) */}
      <Newsletter />
    </main>
  );
};

export default Home;
