import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Welcome to Chhattisgarh Municipal Corporation</h1>
        <p>Serving citizens with efficient and transparent governance</p>
        <Link to="/contact" className="primary-button">Contact Us</Link>
      </div>
    </div>
  );
}

export default Hero;