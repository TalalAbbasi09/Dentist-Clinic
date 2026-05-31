import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import '../styles/About.css';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Dr. Sarah Johnson</h2>
        <div className="about-content">
          <div className="about-image">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50aXN0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyNDE2NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Dr. Sarah Johnson"
            />
          </div>
          <div className="about-text">
            <h3>Leading Dental Professional</h3>
            <p>
              Dr. Sarah Johnson is a highly experienced dentist with over 15 years of practice 
              in comprehensive dental care. She graduated from Harvard School of Dental Medicine 
              and has been committed to providing exceptional dental services to the community.
            </p>
            
            <div className="credentials">
              <h4>Education & Credentials</h4>
              <ul>
                <li>DDS - Harvard School of Dental Medicine</li>
                <li>Board Certified by the American Board of General Dentistry</li>
                <li>Advanced Certification in Cosmetic Dentistry</li>
                <li>Member of the American Dental Association</li>
              </ul>
            </div>

            <div className="credentials">
              <h4>Experience</h4>
              <ul>
                <li>15+ years of clinical experience</li>
                <li>Over 10,000 successful procedures</li>
                <li>Specialized in cosmetic and restorative dentistry</li>
                <li>Regular speaker at dental conferences</li>
              </ul>
            </div>

            <p className="about-mission">
              "My mission is to provide compassionate, personalized dental care that helps 
              patients achieve and maintain optimal oral health. I believe in building lasting 
              relationships with my patients based on trust and excellent care."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
