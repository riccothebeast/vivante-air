import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Reusing auth styles for form consistency

const BookingPage = () => {
  const [formData, setFormData] = useState({
    flightType: 'Charter',
    departure: '',
    destination: '',
    date: '',
    passengers: 1
  });
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Booking created successfully!');
        setBookings([data, ...bookings]); // Add new booking to list
        // Reset form
        setFormData({
          flightType: 'Charter',
          departure: '',
          destination: '',
          date: '',
          passengers: 1
        });
      } else {
        setError(data.message || 'Booking failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">Your Bookings</h2>
        <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
      </div>

      <div className="row">
        {/* Booking Form */}
        <div className="col-lg-5 mb-5">
          <div className="auth-card mx-0" style={{ maxWidth: '100%' }}>
            <h3 className="text-center mb-4 text-white">Book a Flight</h3>
            {error && <div className="auth-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Flight Type</label>
                <select
                  name="flightType"
                  value={formData.flightType}
                  onChange={handleChange}
                  className="form-control"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'inherit', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <option value="Charter">Charter</option>
                  <option value="Empty Leg">Empty Leg</option>
                  <option value="Air Ambulance">Air Ambulance</option>
                  <option value="Helicopter">Helicopter</option>
                </select>
              </div>

              <div className="form-group">
                <label>Departure</label>
                <input
                  type="text"
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Passengers</label>
                    <input
                      type="number"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="auth-btn mt-3">Book Now</button>
            </form>
          </div>
        </div>

        {/* Booking List */}
        <div className="col-lg-7">
          <div className="row g-3">
            {bookings.length === 0 ? (
              <div className="text-white text-center p-5 mx-0" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <p className="mb-0">No bookings found. Create your first booking!</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div className="col-12" key={booking._id}>
                  <div className="card text-white h-100 p-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '16px' }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <span className="badge bg-primary mb-2">{booking.flightType}</span>
                        <h4 className="card-title fw-bold">{booking.departure} ➝ {booking.destination}</h4>
                        <p className="mb-1 text-white-50"><i className="fas fa-calendar-alt me-2"></i>{new Date(booking.date).toLocaleDateString()}</p>
                        <p className="mb-0 text-white-50"><i className="fas fa-users me-2"></i>{booking.passengers} Passengers</p>
                      </div>
                      <span className={`badge ${booking.status === 'Confirmed' ? 'bg-success' : booking.status === 'Cancelled' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
