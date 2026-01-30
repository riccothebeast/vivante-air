import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";

const ServicePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: "ease-out",
      once: true,
      offset: 30,
    });
  }, []);

  const services = [
    { title: "Executive/VIP Transport", desc: "Discreet, luxurious, and time-efficient private jet travel for executives, celebrities, and high-profile individuals." },
    { title: "Helicopter Tours and Transfers", desc: "Scenic aerial tours or rapid point-to-point transfers — perfect for city hops, events, or breathtaking views." },
    { title: "Air Ambulance Services", desc: "24/7 medical evacuation and critical care transport with fully equipped aircraft and medical teams." },
    { title: "Packaged Tours and Safaris", desc: "Curated aerial safari experiences combining private flights with luxury ground arrangements in Africa’s finest destinations." },
    { title: "Group Travels", desc: "Seamless charter solutions for corporate groups, incentives, sports teams, weddings, or family reunions." },
    { title: "Cargo/Freight", desc: "Time-critical air cargo services including perishables, valuables, dangerous goods, and urgent logistics." },
    { title: "Sightseeing / Aerial Work / Aerial Photography", desc: "Specialized missions for film production, surveying, mapping, photography, and inspection flights." },
    { title: "Flight Training / Hour Building", desc: "Affordable aircraft rental for pilot training, license upgrades, and hour-building requirements." },
    { title: "Empty Legs", desc: "Enjoy up to 75% off regular charter rates on one-way repositioning flights — luxury at a fraction of the cost." },
  ];

  const getIcon = (title) => {
    const map = {
      "Executive": "fa-user-tie",
      "Helicopter": "fa-helicopter",
      "Air Ambulance": "fa-briefcase-medical",
      "Packaged": "fa-safari",
      "Group": "fa-users",
      "Cargo": "fa-truck-loading",
      "Sightseeing": "fa-camera",
      "Flight Training": "fa-graduation-cap",
      "Empty Legs": "fa-tag"
    };
    return Object.keys(map).find(key => title.includes(key)) ? map[Object.keys(map).find(key => title.includes(key))] : "fa-plane";
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />

      <style jsx>{`
        :root { --primary: #1A2A44; --bg: #2A4066; }
        html, body, #root { margin: 0; padding: 0; min-height: 100vh; background: var(--bg); color: white; font-family: 'Segoe UI', sans-serif; }

        .hero-section { min-height: 70vh; background: linear-gradient(135deg, var(--primary), var(--bg)); display: flex; align-items: center; text-align: center; padding: 2rem; }
        .hero-section h1 { font-size: 3.8rem; font-weight: 800; text-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        .hero-section p { font-size: 1.3rem; max-width: 700px; margin: 1.5rem auto; opacity: 0.95; }
        .btn-cta { padding: 1rem 2.8rem; font-weight: 600; border-radius: 50px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0.5rem; transition: all 0.3s ease; }
        .btn-primary { background: white; color: var(--primary); }
        .btn-outline-primary { border: 2px solid white; color: white; }
        .btn-primary:hover, .btn-outline-primary:hover { transform: translateY(-4px); box-shadow: 0 12px 25px rgba(0,0,0,0.3); }
        .btn-outline-primary:hover { background: white; color: var(--primary); }

        .service-card-modern {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 24px;
          padding: 40px 30px;
          text-align: center;
          height: 100%;
          transition: all 0.5s cubic-bezier(0.25,0.8,0.25,1);
          position: relative;
          overflow: hidden;
        }
        .service-card-modern::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(26,42,68,0.4), transparent);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .service-card-modern:hover::before { opacity: 1; }
        .service-card-modern:hover {
          transform: translateY(-20px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          border-color: rgba(255,255,255,0.3);
        }
        .service-icon {
          width: 90px; height: 90px; margin: 0 auto 25px;
          background: rgba(255,255,255,0.15); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.4s ease;
        }
        .service-card-modern:hover .service-icon {
          background: white; color: var(--primary); transform: scale(1.1);
        }
        .service-card-modern h3 { font-size: 1.6rem; font-weight: 700; margin-bottom: 16px; }
        .service-card-modern p { opacity: 0.9; line-height: 1.7; font-size: 1.05rem; }
        .btn-modern {
          background: white; color: var(--primary); padding: 12px 32px;
          border-radius: 50px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px; text-decoration: none; display: inline-block;
          transition: all 0.4s ease; box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        .btn-modern:hover { background: #f0f0f0; transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,0,0,0.3); }

        .cta-section { padding: 120px 20px; background: linear-gradient(135deg, var(--primary), var(--bg)); text-align: center; }

        /* Home button - top right */
        .home-btn {
          position: fixed;
          top: 30px;
          right: 30px;
          left: auto;
          transform: none;
          background: var(--primary);
          color: white;
          padding: 14px 40px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          z-index: 9999;
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
          transition: all 0.3s;
        }
        .home-btn:hover {
          background: #0f1e33;
          transform: translateY(-5px);
        }

        footer { padding: 40px 20px; text-align: center; opacity: 0.8; }
      `}</style>

      <section className="hero-section" data-aos="fade-up">
        <div className="container">
          <h1 data-aos="fade-up" data-aos-delay="100">Our Services</h1>
          <p data-aos="fade-up" data-aos-delay="300">
            From luxury VIP flights to life-saving air ambulances — we offer a complete range of private aviation solutions.
          </p>
          <div data-aos="fade-up" data-aos-delay="500">
            <Link to="/contact" className="btn btn-primary btn-cta">Book Now</Link>
            <Link to="/fleet" className="btn btn-outline-primary btn-cta">Explore Fleet</Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-5 justify-content-center">
            {services.map((service, i) => (
              <div key={i} className="col-lg-6 col-xl-4" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="service-card-modern">
                  <div className="service-icon">
                    <i className={`fas ${getIcon(service.title)}`}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" data-aos="fade-up">
        <div className="container">
          <h2>Ready for Your Next Flight?</h2>
          <p>Contact our team 24/7 for instant quotes and personalized flight planning.</p>
          <Link to="/contact" className="btn btn-light btn-cta btn-lg">Request a Quote Now</Link>
        </div>
      </section>

      {/* Home button */}
      <Link to="/" className="home-btn fas fa-home"></Link>

      <footer>
        <div className="container">
          © {new Date().getFullYear()} Vivante Air Charters. All rights reserved.
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" async></script>
    </>
  );
};

export default ServicePage;
