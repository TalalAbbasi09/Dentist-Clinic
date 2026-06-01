import React, { useState } from 'react';
import '../styles/BookAppointment.css';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time_slot: "",
    full_name: "",
    phone: "",
    email: ""
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [showSlots, setShowSlots] = useState(false);

  // SERVICES — map frontend names to Django codes
  const services = [
    { label: "Cleaning", value: "cleaning" },
    { label: "Whitening", value: "whitening" },
    { label: "Braces", value: "braces" },
    { label: "Root Canal", value: "root_canal" },
    { label: "Checkup", value: "checkup" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ------------------------------
  // CHECK AVAILABILITY (REAL API)
  // ------------------------------
const checkAvailability = async () => {
  if (!formData.date) {
    alert("Please select a date first");
    return;
  }

  try {
    const response = await fetch(
      `http://https://talal9303.pythonanywhere.com/api/appointments/check-availability/?date=${formData.date}`
    );

    if (!response.ok) {
      alert("Failed to load available slots.");
      return;
    }

    const data = await response.json();
    setAvailableSlots(data.available_slots);
    setShowSlots(true);

  } catch (error) {
    console.error("Error fetching availability:", error);
    alert("Error connecting to the server.");
  }
};



  // ------------------------------
  // SUBMIT FORM TO BACKEND
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.service || !formData.date || !formData.time_slot || !formData.full_name) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://https://talal9303.pythonanywhere.com/api/appointments/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + JSON.stringify(data));
        return;
      }

      alert("Appointment Booked Successfully!");

      // Reset
      setFormData({
        service: "",
        date: "",
        time_slot: "",
        full_name: "",
        phone: "",
        email: ""
      });
      setShowSlots(false);

    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <section id="book" className="book-section">
      <div className="book-container">
        <h2 className="section-title">Book an Appointment</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          
          {/* SERVICE */}
          <div className="form-group">
            <label>Select Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose a service...</option>
              {services.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* DATE + CHECK BUTTON */}
          <div className="form-row">
            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="form-group">
              <button type="button" className="check-availability-btn" onClick={checkAvailability}>
                Check Slot Availability
              </button>
            </div>
          </div>

          {/* TIME SLOTS FROM BACKEND */}
          {showSlots && (
            <div className="time-slots">
              <label>Available Time Slots</label>
              <div className="slots-grid">
                {availableSlots.length === 0 ? (
                  <p>No available slots for this date.</p>
                ) : (
                  availableSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      className={`slot-button ${formData.time_slot === slot ? "selected" : ""}`}
                      onClick={() => setFormData(prev => ({ ...prev, time_slot: slot }))}
                    >
                      {slot}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* USER INFO */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Book Appointment
          </button>

        </form>
      </div>
    </section>
  );
}
