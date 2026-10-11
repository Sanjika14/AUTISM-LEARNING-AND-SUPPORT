import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartoonBackground from './components/CartoonBackground';

import Home from './pages/Home';
import Learning from './pages/Learning';
import Emotions from './pages/Emotions';
import Communication from './pages/Communication';
import Sensory from './pages/Sensory';
import Games from './pages/Games';
import ComicBooks from './pages/ComicBooks';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Helper component to auto-scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartoonBackground />
      <div className="app-container">
        <Navbar />
        <main className="main-content" id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/emotions" element={<Emotions />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/sensory" element={<Sensory />} />
            <Route path="/games" element={<Games />} />
            <Route path="/comics" element={<ComicBooks />} />

            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
