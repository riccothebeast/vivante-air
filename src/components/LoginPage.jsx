import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/contact');
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-hero">
                <div className="auth-hero-content">
                    <h1>Experience the Peak of Aviation.</h1>
                    <p>Unlock exclusive access to premium charters and seamless travel across the world.</p>
                </div>
            </div>
            <div className="auth-form-side">
                <Link to="/" className="home-auth-btn">
                    <i className="fas fa-home"></i>
                </Link>
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Welcome Back!</h2>
                        <p>Enter your email and password</p>
                    </div>
                    {error && <div className="auth-error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <div className="input-wrapper">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder=""
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <i className="fas fa-lock"></i>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                        </div>
                        <Link to="/forgot-password" weight="semibold" className="forgot-password">Forgot Password?</Link>
                        <button type="submit" className="auth-btn">Sign in</button>
                    </form>
                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup">Start your journey</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
