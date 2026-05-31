import React from 'react';
import home from './images/home.png';
import '../styles/Home.css';

export default function Home({ onAdminClick }) {
  const handleBookClick = () => {
    document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="home-section">
      <button className="admin-button" onClick={onAdminClick}>
        🔐 Admin
        </button>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Your Smile, Our Priority</h1>
          <p className="hero-subtitle">
            Experience world-class dental care with our experienced team of professionals.
            We're committed to making your smile brighter and healthier.
          </p>
          <button className="cta-button" onClick={handleBookClick}>
            Book Appointment
          </button>
        </div>
        <div className="hero-image">
          <img src={home} alt="Home" />
        </div>
      </div>
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🦷</div>
          <h3>Expert Care</h3>
          <p>Experienced dentists with years of expertise</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Modern Technology</h3>
          <p>State-of-the-art equipment and techniques</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💙</div>
          <h3>Patient Focused</h3>
          <p>Your comfort and satisfaction is our priority</p>
        </div>
      </div>
    </section>
  );
}
