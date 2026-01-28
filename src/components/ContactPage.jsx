import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "./ContactPage.css";

const ContactPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    returnDate: '',
    aircraft: '',
    passengers: 1,
    serviceType: 'Executive/VIP Transport',
    message: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: "ease-out",
      once: true,
      offset: 30,
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login first.");
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
        alert("Thank you for your inquiry! We will contact you shortly.");
        navigate('/');
      } else {
        alert(data.message || "Failed to submit inquiry.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending request.");
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        rel="stylesheet"
      />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src="/video3.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "var(--overlay)",
          zIndex: -1,
        }}
      />

      {/* THEME & PAGE CSS */}
      <style jsx>{`
        :root {
          --primary: #1a2a44;
          --bg: #2a4066;
          --overlay: linear-gradient(135deg, rgba(26,42,68,0.88), rgba(42,64,102,0.92));
          --card-bg: rgba(255,255,255,0.08);
          --text: #ffffff;
        }

        [data-theme='dark'] {
          --primary: #0d1626;
          --bg: #131a25;
          --overlay: linear-gradient(135deg, rgba(10,16,26,0.88), rgba(16,24,38,0.92));
          --card-bg: rgba(0,0,0,0.45);
          --text: #e6e6e6;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Segoe UI', sans-serif;
        }

        .contact-hero {
          min-height: 60vh;
          background: linear-gradient(135deg, var(--primary), var(--bg));
          display: flex;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }

        .contact-hero h1 {
          font-size: 3.8rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .contact-hero p {
          font-size: 1.3rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .form-container {
          padding: 100px 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .form-card {
          background: var(--card-bg);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 50px;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .form-control,
        .form-select {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          border-radius: 12px;
          padding: 12px 16px;
        }

        .form-select,
        .form-select option {
          color: black !important;
          background: white !important;
        }

        .form-control::placeholder {
          color: rgba(255,255,255,0.7);
        }

        label {
          font-weight: 600;
          margin-bottom: 8px;
        }

        .btn-submit {
          background: white;
          color: var(--primary);
          padding: 14px 40px;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          margin-top: 20px;
        }

        .btn-submit:hover {
          transform: translateY(-3px);
        }

        .home-btn {
          position: fixed;
          top: 25px;
          left: 25px;
          background: var(--primary);
          color: white;
          padding: 12px 25px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          z-index: 9999;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .theme-toggle {
          position: fixed;
          top: 25px;
          right: 25px;
          padding: 12px 18px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          background: white;
          color: var(--primary);
          font-weight: 700;
          z-index: 9999;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .social-links {
          position: fixed;
          bottom: 25px;
          right: 25px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 9999;
        }

        .social-links a {
          background: var(--primary);
          color: white;
          width: 48px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          font-size: 1.3rem;
          text-decoration: none;
          box-shadow: 0 8px 20px rgba(0,0,0,0.35);
          transition: 0.3s ease;
        }

        .social-links a:hover {
          transform: translateY(-5px);
          background: #0f1e33;
        }

        footer {
          padding: 40px;
          text-align: center;
          opacity: 0.8;
        }
      `}</style>

      {/* HOME BUTTON */}
      <Link to="/" className="home-btn">
        <i className="fa-solid fa-house"></i>
      </Link>

      {/* DARK MODE TOGGLE */}
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : <i className="fa-solid fa-moon"></i>}
      </button>

      {/* SOCIAL MEDIA LINKS */}
      <div className="social-links">
        <a href="https://www.instagram.com/vivante_air/" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="https://wa.me/0758007505" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-whatsapp"></i>
        </a>

      </div>

      {/* HERO */}
      <section className="contact-hero" data-aos="fade-up">
        <div className="container">
          <h1 data-aos="fade-up">Get in Touch</h1>
          <p data-aos="fade-up" data-aos-delay="300">
            Whether you're ready to book, need a quote, or just have a question — our team is available 24/7.
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <div className="form-container" data-aos="fade-up">
        <div className="container">
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label>First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" placeholder="First Name" required />
                </div>
                <div className="col-md-6 mb-4">
                  <label>Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" placeholder="Last Name" required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="" required />
                </div>
                <div className="col-md-6 mb-4">
                  <label>Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="" required />
                </div>
              </div>

              {/* DATE OF DEPARTURE */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label>Date of Departure *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
                </div>

                {/* DATE OF RETURN (OPTIONAL) */}
                <div className="col-md-6 mb-4">
                  <label>Date of Return (Optional)</label>
                  <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} className="form-control" />
                </div>
              </div>

              {/* AIRCRAFT SELECTION */}
              <div className="mb-4">
                <label>Select Aircraft </label>
                <select className="form-select" name="aircraft" value={formData.aircraft} onChange={handleChange}>
                  <option value="">Choose an aircraft</option>
                  <option>Gulfstream G650</option>
                  <option>Gulfstream G450</option>
                  <option>Embraer Phenom 300</option>
                  <option>Cessna Citation CJ2</option>
                  <option>Cessna Citation XLS+</option>
                  <option>Beechcraft King Air 350</option>
                  <option>Bell 407 Helicopter</option>
                  <option>Airbus H125 Helicopter</option>
                  <option>Airbus H130 Helicopter</option>
                  <option>Robinson R44 Helicopter</option>
                  <option>pilatus PC-12 NGX</option>
                  <option>Cessna C208B Grand Caravan</option>
                  <option>Cessna 206 Stationair</option>
                  <option>Cessna 172 Skyhawk</option>
                  <option>Challenger 605</option>
                </select>
              </div>

              {/* NUMBER OF PASSENGERS */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label>Number of Passengers *</label>
                  <input
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="form-control"
                    min="1"
                    max="50"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4 d-flex align-items-end">
                  <small style={{ color: "rgba(255,255,255,0.8)" }}>
                  </small>
                </div>
              </div>

              {/* SERVICE TYPE */}
              <div className="mb-4">
                <label>Service Interested In</label>
                <select className="form-select" name="serviceType" value={formData.serviceType} onChange={handleChange}>
                  <option>Executive/VIP Transport</option>
                  <option>Helicopter Tours</option>
                  <option>Air Ambulance</option>
                  <option>Packaged Safari</option>
                  <option>Group Travel</option>
                  <option>Cargo/Freight</option>
                  <option>Aerial Work</option>
                  <option>Flight Training</option>
                  <option>Empty Legs</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div className="mb-4">
                <label>Trip Description</label>
                <textarea
                  className="form-control"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your trip..."

                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer>© {new Date().getFullYear()} Vivante Air Charters. All rights reserved.</footer>
    </>
  );
};

export default ContactPage;
