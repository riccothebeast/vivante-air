import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            if (user?.role !== 'admin') {
                navigate('/');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    setError('Failed to fetch bookings');
                }
            } catch (err) {
                setError('Server error');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate, user?.role]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

    return (
        <div className="admin-container">
            <nav className="admin-nav">
                <div className="admin-brand">
                    <img src="/logo1.2.png" alt="Admin Logo" />
                    <span>Admin Dashboard</span>
                </div>
                <div className="admin-profile">
                    <span>{user?.email}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <div className="admin-content">
                <header className="dashboard-header">
                    <h1>Flight Bookings Overview</h1>
                    <div className="stats-cards">
                        <div className="stat-card">
                            <h3>Total Bookings</h3>
                            <p>{bookings.length}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Pending Requests</h3>
                            <p>{bookings.length}</p> {/* Placeholder logic */}
                        </div>
                    </div>
                </header>

                {error && <div className="admin-error">{error}</div>}

                <div className="bookings-table-container">
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Client Details</th>
                                <th>Service & Aircraft</th>
                                <th>Dates</th>
                                <th>Pax</th>
                                <th>Message</th>
                                <th>Booking Ref</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>
                                        <div className="client-info">
                                            <span className="client-name">{booking.firstName} {booking.lastName}</span>
                                            <span className="client-email">{booking.email}</span>
                                            <span className="client-phone">{booking.phone}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flight-info">
                                            <span className="service-type">{booking.serviceType}</span>
                                            <span className="aircraft-type">{booking.aircraft || 'Not Specified'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            <div>Dep: {new Date(booking.date).toLocaleDateString()}</div>
                                            {booking.returnDate && <div>Ret: {new Date(booking.returnDate).toLocaleDateString()}</div>}
                                        </div>
                                    </td>
                                    <td>{booking.passengers}</td>
                                    <td className="message-cell" title={booking.message}>{booking.message ? (booking.message.length > 50 ? booking.message.substring(0, 50) + '...' : booking.message) : '-'}</td>
                                    <td>
                                        <div className="status-container">
                                            <span className="booking-id">#{booking._id.slice(-6).toUpperCase()}</span>
                                            <span className="status-badge pending">{booking.status}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="no-data">No inquiries found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
