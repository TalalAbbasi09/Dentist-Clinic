import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DentistConnect AI</h3>
            <p>Your trusted partner for comprehensive dental care. We're committed to helping you achieve your best smile.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#book">Book Appointment</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>📍 123 Dental Avenue, NY 10001</li>
              <li>📞 (555) 123-4567</li>
              <li>✉️ info@dentistconnect.ai</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Office Hours</h4>
            <ul>
              <li>Monday - Friday</li>
              <li>8:00 AM - 6:00 PM</li>
              <li>Saturday: By Appointment</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 DentistConnect AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
