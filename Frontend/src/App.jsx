import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import BookAppointment from './components/BookAppointment';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

import './styles/App.css';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'admin-login', 'admin-dashboard'

     // Shared appointments state
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      service: 'Cleaning',
      date: '2025-11-15',
      time: '10:00 AM',
      phone: '(555) 123-4567',
      email: 'john@example.com'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      service: 'Whitening',
      date: '2025-11-16',
      time: '02:00 PM',
      phone: '(555) 987-6543',
      email: 'jane@example.com'
    }
  ]);

  const handleAdminClick = () => {
    setCurrentPage('admin-login');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('admin-dashboard');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentPage('home');
  };

 const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: appointments.length + 1,
      patientName: appointmentData.name,
      service: appointmentData.service,
      date: appointmentData.date,
      time: appointmentData.time,
      phone: appointmentData.phone,
      email: appointmentData.email
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  if (currentPage === 'admin-login') {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentPage === 'admin-dashboard') {
    return (
      <AdminDashboard 
        onLogout={handleLogout}
        appointments={appointments}
        onAddAppointment={addAppointment}
        onDeleteAppointment={deleteAppointment}
      />
    );
  }
  return (
    <div className="app">
      <Navbar />
      <main>
         <Home onAdminClick={handleAdminClick} />
        <About />
        <Services />
        <BookAppointment />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
