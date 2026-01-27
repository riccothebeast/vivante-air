import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import "./LandingPage.css";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true, // Animation triggers only once
      offset: 100, // Offset (in pixels) from the top
    });

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      {/* Font Awesome */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        rel="stylesheet"
      />

      {/* Inline CSS */}
      <style jsx>{`
        :root {
          --primary-color: #1A2A44; /* Navy blue */
          --secondary-color: #6c757d;
          --bg-color: ${darkMode ? "#0a0f1c" : "#ffffff"};
          --text-color: ${darkMode ? "#ffffff" : "#000000"};
          --card-bg: ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
          --section-bg-light: ${darkMode ? "#1a2436" : "#BCCEDA"};
          --section-bg-dark: ${darkMode ? "#0C172B" : "#0C172B"};
          --contact-bg: ${darkMode ? "#1a2436" : "#BCCEDA"};
          --footer-bg: ${darkMode ? "#0a0f1c" : "#0C172B"};
        }

        body {
          background-color: var(--bg-color);
          color: var(--text-color);
          transition: all 0.3s ease;
        }

        .navbar {
          background-color: transparent !important;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          z-index: 1000; /* Ensure navbar stays above other content */
        }

        .navbar.scrolled {
          background-color: ${darkMode ? "rgba(10, 15, 28, 0.9)" : "rgba(26, 42, 68, 0.9)"} !important;
        }

        .navbar-brand span {
          color: ${darkMode ? "#ffffff" : "var(--primary-color)"};
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            ${darkMode ? "rgba(10, 15, 28, 0.6)" : "rgba(26, 42, 68, 0.4)"}, 
            ${darkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.4)"});
          z-index: 1;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 10; /* Ensure content is above overlay and video */
        }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          border-radius: 16px;
          overflow: hidden;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px ${darkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(26, 42, 68, 0.3)"} !important;
        }

        .contact-section {
          background: transparent;
          padding: 80px 0;
        }

        .contact-item {
          background: ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.15)"};
          border-radius: 16px;
          padding: 2rem;
          transition: transform 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .contact-item i {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .contact-item:hover {
          transform: translateY(-8px);
          background: ${darkMode ? "rgba(26, 42, 68, 0.3)" : "rgba(26, 42, 68, 0.2)"};
        }

        footer {
          background: transparent;
          padding: 2rem 0;
          font-size: 0.9rem;
          border-top: 1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }

        .dark-mode-toggle {
          background: ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(26, 42, 68, 0.1)"};
          border: 2px solid ${darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(26, 42, 68, 0.2)"};
          color: ${darkMode ? "#ffffff" : "var(--primary-color)"};
          border-radius: 50px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .dark-mode-toggle:hover {
          background: ${darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(26, 42, 68, 0.2)"};
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }
          .hero-section .lead {
            font-size: 1.1rem;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/logo1.2.png"
              alt="Vivante Logo"
              style={{ height: "50px", width: "50px", marginRight: "12px" }}
            />
            <span className="fw-bold text-white fs-4">Vivante Air Charters</span>
          </Link>

          <div className="d-flex align-items-center">
            {/* Dark Mode Toggle */}
            <button
              className="dark-mode-toggle me-3"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
              <span className="ms-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-center text-md-start">
              <li className="nav-item">
                <a href="#about" className="nav-link text-white px-3">About</a>
              </li>
              <li className="nav-item">
                <a href="#Features" className="nav-link text-white px-3">Features</a>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link text-white px-3">Services</Link>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link text-white px-3">Contact</a>
              </li>
              <li className="nav-item">
                <Link to="/fleet" className="nav-link text-white px-3">Fleet</Link>
              </li>
              <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                <Link to="/login" className="btn btn-outline-light rounded-pill px-4">Login</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section className="hero-section">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg" // Fallback image if video fails
          src="/video 2.mp4" // Replace with your video file in public/
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div className="hero-overlay"></div>

        <div className="container position-relative text-center text-md-start">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="hero-content-wrapper">
                <h1
                  className="display-3 fw-bold text-white mb-4"
                  data-aos="fade-up"
                  style={{ textShadow: "0 4px 10px rgba(0, 0, 0, 0.5)" }} // Enhance readability
                >
                  Welcome to Vivante Air Charters
                </h1>
                <p
                  className="lead text-white mb-5 opacity-90"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.5)" }} // Enhance readability
                >
                  Every Journey,Refined With Precision.
                </p>
                <div
                  className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <Link
                    to="/services"
                    className="btn btn-light btn-lg px-5 py-3 fw-semibold"
                    style={{ backgroundColor: "var(--primary-color)", borderColor: "var(--primary-color)" }}
                  >
                    Get Started
                  </Link>
                  <a
                    href="#Features"
                    className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold"
                    style={{ borderColor: "var(--primary-color)", color: "var(--primary-color)" }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5" style={{ background: "var(--section-bg-light)" }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <h2
                className="display-5 fw-bold mb-4 text-center text-md-start"
                data-aos="fade-right"
                style={{ color: "var(--primary-color)" }}
              >
                About Vivante
              </h2>
              <p
                className="lead mb-4"
                data-aos="fade-right"
                data-aos-delay="200"
                style={{ color: "var(--text-color)" }}
              >
                At Air Vivante, we make private air travel simple, personal, and accessible.
                Our mission is to bridge exclusivity and practicality, offering premium charters
                for both seasoned and first-time flyers who value comfort, safety, and time.
                We offer exclusive charter services ranging from helicopter transfers to regional
                jet flights, light aircrafts for those short bush hops, group air charters and
                air ambulance services when that minute matters. Every trip is tailored to your
                needs, built on transparency, reliability, and thoughtful service.
                Air Vivante is redefining what it means to fly private where luxury feels
                effortless, and every journey begins with trust and is refined with precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="Features" className="py-5" style={{ background: "var(--section-bg-dark)" }}>
        <div className="container">
          <h2
            className="text-center display-5 fw-bold mb-5 text-white"
            data-aos="fade-up"
          >
            Our Features
          </h2>
          <div className="row g-4">
            {/* Empty Legs */}
            <div className="col-md-4">
              <div
                className="card feature-card text-white h-100 p-4"
                data-aos="zoom-in"
                data-aos-delay="0"
              >
                <div className="text-center mb-4">
                  <i className="fas fa-plane-departure fa-3x text-info"></i>
                </div>
                <h5 className="fw-bold text-center">Empty Legs</h5>
                <p className="text-white">
                  Save up to 50% on one-way flights with our exclusive empty leg deals.
                </p>
              </div>
            </div>

            {/* Aircraft Charters */}
            <div className="col-md-4">
              <div
                className="card feature-card text-success h-100 p-4"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="text-center mb-4">
                  <i className="fas fa-jet-fighter  fa-3x text-cyan"></i>
                </div>
                <h5 className="fw-bold text-center text-white ">Aircraft Charters</h5>
                <p className=" text-white">
                  Experience the thrill of private aviation with our light turbo props, luxury
                  jets, air ambulance services, and helicopter charters.
                </p>
              </div>
            </div>

            {/* Concierge Tools */}
            <div className="col-md-4">
              <div
                className="card feature-card text-navy h-100 p-4"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="text-center mb-4">
                  <i className="fas fa-cogs fa-3x text-warning"></i>
                </div>
                <h5 className="fw-bold text-center text-white">Concierge Tools</h5>
                <p className="text-white">
                  Real-time tracking, in-flight catering, ground transport, and VIP handling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section text-black" style={{ background: "var(--contact-bg)" }}>
        <div className="container">
          <div className="row g-5 text-center">
            {[
              {
                icon: "fa-map-marker-alt",
                title: "Address",
                content: "123 Sky Tower,<br />Aviation District,<br />Global City",
              },
              {
                icon: "fa-envelope",
                title: "Email",
                content: "charter@vivante.com<br />support@vivante.com",
              },
              {
                icon: "fa-phone",
                title: "Phone",
                content: "+254 758-007-505",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="col-md-4 contact-item"
                data-aos="fade-up"
                data-aos-delay={i * 200}
              >
                <i className={`fas ${item.icon}`}></i>
                <h5 className="mt-3 fw-bold" style={{ color: "var(--primary-color)" }}>{item.title}</h5>
                <p style={{ color: "var(--text-color)" }} dangerouslySetInnerHTML={{ __html: item.content }}></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4" style={{ background: "var(--footer-bg)" }}>
        <div className="container">
          <p
            className="mb-0"
            data-aos="fade-up"
            style={{ color: "white" }}
          >
            © {new Date().getFullYear()} Vivante Air Charters. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Bootstrap JS */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        async
      ></script>
    </>
  );
};

export default LandingPage;