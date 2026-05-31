import React from 'react';
import '../styles/Services.css';

export default function Services() {
  const services = [
    {
      id: 1,
      name: 'Cleaning',
      icon: '✨',
      description: 'Professional teeth cleaning to remove plaque and prevent cavities. Includes scaling and polishing for a brighter smile.'
    },
    {
      id: 2,
      name: 'Whitening',
      icon: '🦷',
      description: 'Advanced teeth whitening treatments to brighten your smile. Safe and effective professional-grade whitening.'
    },
    {
      id: 3,
      name: 'Braces',
      icon: '😁',
      description: 'Orthodontic solutions to straighten teeth and correct bite issues. Traditional and clear aligner options available.'
    },
    {
      id: 4,
      name: 'Root Canal',
      icon: '🔧',
      description: 'Expert root canal therapy to save infected teeth. Painless procedure with modern techniques and anesthesia.'
    },
    {
      id: 5,
      name: 'Implants',
      icon: '💎',
      description: 'Permanent dental implants to replace missing teeth. Natural-looking and durable tooth replacement solution.'
    },
    {
      id: 6,
      name: 'Checkup',
      icon: '🔍',
      description: 'Comprehensive oral examination and preventive care. Regular checkups to maintain optimal dental health.'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <h2 className="section-title">Our Services</h2>
        <p className="services-subtitle">
          Comprehensive dental care tailored to your needs
        </p>
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <button className="service-button">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
