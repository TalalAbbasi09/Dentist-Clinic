import React, { useState, useEffect } from 'react';

import '../styles/BookAppointment.css';


export default function BookAppointment({onBack}) {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time_slot: "",
    full_name: "",
    phone: "",
    email: ""
  });



  const [appointments, setAppointments] = useState([]); // <-- NEW
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showSlots, setShowSlots] = useState(false);

  // SERVICES
  const services = [
    { label: "Cleaning", value: "cleaning" },
    { label: "Whitening", value: "whitening" },
    { label: "Braces", value: "braces" },
    { label: "Root Canal", value: "root_canal" },
    { label: "Checkup", value: "checkup" },
  ];

  // ----------- FETCH ALL APPOINTMENTS (FROM DATABASE) -----------
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://https://talal9303.pythonanywhere.com/api/appointments/viewset/");
      const data = await res.json();
      setAppointments(data); // set array from DB
    } catch (error) {
      console.error("Failed to load appointments", error);
    }
  };

  useEffect(() => {
    fetchAppointments(); // load when page opens
  }, []);

  // ------------- DELETE APPOINTMENT ----------------
  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await fetch(`http://https://talal9303.pythonanywhere.com/api/appointments/${id}/`, {
    method: "DELETE", // This method tells the backend to perform the deletion
});
      // Remove from frontend list
      setAppointments(prev => prev.filter(appt => appt.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Unable to delete appointment");
    }
  };

  // ------------------------------ HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ------------------------------ CHECK AVAILABILITY
  const checkAvailability = async () => {
    if (!formData.date) {
      alert("Please select a date first");
      return;
    }

    try {
      const response = await fetch(
        `http://https://talal9303.pythonanywhere.com/api/appointments/check-availability/?date=${formData.date}`
      );

      const data = await response.json();
      setAvailableSlots(data.available_slots);
      setShowSlots(true);

    } catch (error) {
      console.error("Error fetching availability:", error);
      alert("Error connecting to the server.");
    }
  };

  // ------------------------------ SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

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

      if (res.ok) {
        alert("Appointment Booked Successfully!");

        // reload appointments
        fetchAppointments();

        // reset form
        setFormData({
          service: "",
          date: "",
          time_slot: "",
          full_name: "",
          phone: "",
          email: ""
        });

        setShowSlots(false);
      }

    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <section id="book" className="book-section">
      <div className="book-container">
        <h2 className="section-title">Book an Appointment</h2>
        <button
  className="back-button"
  onClick={() => (window.location.href = "/")}
>
  ← Back to Home
</button>

        {/* ---------------- FORM ---------------- */}
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

          {/* DATE */}
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

          {/* TIME SLOTS */}
          {showSlots && (
            <div className="time-slots">
              <label>Available Time Slots</label>
              <div className="slots-grid">
                {availableSlots.length === 0 ? (
                  <p>No available slots.</p>
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

          {/* NAME */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* PHONE + EMAIL */}
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
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

        {/* ---------------- SHOW ALL APPOINTMENTS ---------------- */}
        <div className="appointments-list-section">
          <h2>All Appointments ({appointments.length})</h2>
          <div className="appointments-table-container">
            {appointments.length > 0 ? (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map(appt => (
                    <tr key={appt.id}>
                      <td>{appt.full_name}</td>
                      <td>{appt.service}</td>
                      <td>{appt.date}</td>
                      <td>{appt.time_slot}</td>
                      <td>{appt.phone}</td>
                      <td>{appt.email}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteAppointment(appt.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            ) : (
              <p className="no-appointments">No appointments found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

