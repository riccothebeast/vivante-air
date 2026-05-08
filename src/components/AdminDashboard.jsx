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
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
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

    const handleAction = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            console.error('Action Error:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking inquiry?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setBookings(bookings.filter(b => b._id !== id));
            } else {
                alert('Failed to delete booking');
            }
        } catch (err) {
            console.error('Delete Error:', err);
        }
    };

    const SkeletonRow = () => (
        <tr className="skeleton-row">
            <td><div className="skeleton-box client"></div></td>
            <td><div className="skeleton-box flight"></div></td>
            <td><div className="skeleton-box date"></div></td>
            <td><div className="skeleton-box pax"></div></td>
            <td><div className="skeleton-box message"></div></td>
            <td><div className="skeleton-box status"></div></td>
            <td><div className="skeleton-box actions"></div></td>
        </tr>
    );

    return (
        <div className="admin-container">
            <nav className="admin-nav">
                <div className="admin-brand">
                    <img src="/logo.1.png" alt="Admin Logo" style={{ transform: "scale(1.4)" }} />
                    <span>Admin Dashboard</span>
                </div>
                <div className="admin-profile">
                    <span>{user?.email}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <div className="admin-content">
                <header className="dashboard-header animated fadeIn">
                    <h1>Flight Bookings Overview</h1>
                    <div className="stats-cards">
                        <div className="stat-card">
                            <h3>Total Bookings</h3>
                            <p>{loading ? <span className="skeleton-text">--</span> : bookings.length}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Pending Requests</h3>
                            <p>{loading ? <span className="skeleton-text">--</span> : bookings.filter(b => b.status === 'Pending').length}</p>
                        </div>
                    </div>
                </header>

                {error && <div className="admin-error">{error}</div>}

                <div className="bookings-table-container animated slideUp">
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Client Details</th>
                                <th>Service & Aircraft</th>
                                <th>Dates</th>
                                <th>Pax</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <>
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                </>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="animated fadeIn">
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
                                                <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                {booking.status === 'Pending' && (
                                                    <>
                                                        <button
                                                            className="action-btn approve"
                                                            onClick={() => handleAction(booking._id, 'Confirmed')}
                                                            title="Approve"
                                                        >
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                        <button
                                                            className="action-btn reject"
                                                            onClick={() => handleAction(booking._id, 'Rejected')}
                                                            title="Reject"
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    className="action-btn delete"
                                                    onClick={() => handleDelete(booking._id)}
                                                    title="Delete"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            {!loading && bookings.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="no-data">No inquiries found</td>
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
