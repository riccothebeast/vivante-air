// src/components/FleetPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const fleet = [
  {
    id: 1,
    name: "Gulfstream G650",
    category: "Long-Range Jet",
    imageUrl: "/gulfstream.jpg",
    description: "Ultra-long-range flagship with 7,000+ nm range — the pinnacle of luxury and performance.",
    seats: 14,
    range: "7,000 nm",
    speed: "Mach 0.925",
    status: "Available",
  },
  {
    id: 2,
    name: "Cessna Citation XLS+",
    category: "Mid-Size Jet",
    imageUrl: "/citation.jpg",
    description: "Fast, efficient, and spacious — ideal for regional and continental business travel.",
    seats: 8,
    range: "2,100 nm",
    speed: "441 knots",
    status: "Available",
  },
  {
    id: 3,
    name: "Pilatus PC-12 NGX",
    category: "Turboprop",
    imageUrl: "/pilatus.jpg",
    description: "Go-anywhere capability with luxury cabin — perfect for safari strips and remote destinations.",
    seats: 9,
    range: "1,845 nm",
    speed: "280 knots",
    status: "Available",
  },
  {
    id: 4,
    name: "Cessna C208B Grand Caravan",
    category: "Turboprop",
    imageUrl: "/cessna 208.jpg",
    description: "Reliable and rugged — the most popular aircraft for bush, safari, and regional utility missions.",
    seats: 12,
    range: "964 nm",
    speed: "214 knots",
    status: "Available",
  },
  {
    id: 5,
    name: "Cessna 206 Stationair",
    category: "Turboprop",
    imageUrl: "/stationair206.jpg",
    description: "Versatile high-wing aircraft ideal for short-field operations and scenic flights.",
    seats: 6,
    range: "730 nm",
    speed: "150 knots",
    status: "Available",
  },
  {
    id: 6,
    name: "Cessna 172 Skyhawk",
    category: "Turboprop",
    imageUrl: "/172.jpg",
    description: "Iconic four-seat aircraft ideal for aerial surveys, scenic flights, and training.",
    seats: 4,
    range: "640 nm",
    speed: "122 knots",
    status: "Available",
  },
  {
    id: 7,
    name: "Beechcraft King Air 350",
    category: "Turboprop",
    imageUrl: "/kingair350.jpeg",
    description: "High-performance twin-engine turboprop with excellent range and cabin comfort.",
    seats: 11,
    range: "1,700 nm",
    speed: "312 knots",
    status: "Available",
  },
  {
    id: 8,
    name: "Airbus H125",
    category: "Helicopter",
    imageUrl: "/h125.jpg",
    description: "High-performance single-engine helicopter perfect for aerial work and passenger transport.",
    seats: 6,
    range: "340 nm",
    speed: "140 knots",
    status: "Available",
  },
  {
    id: 9,
    name: "Airbus H130",
    category: "Helicopter",
    imageUrl: "/h130.jpg",
    description: "Ultra-quiet, smooth, and spacious — ideal for VIP flights and scenic charters.",
    seats: 7,
    range: "347 nm",
    speed: "130 knots",
    status: "Available",
  },
  {
    id: 10,
    name: "Robinson R44",
    category: "Helicopter",
    imageUrl: "/robinson.jpg",
    description: "Light, efficient helicopter suited for short-distance charters and training.",
    seats: 4,
    range: "300 nm",
    speed: "110 knots",
    status: "Available",
  },
  {
    id: 11,
    name: "Bell 407",
    category: "Helicopter",
    imageUrl: "/bell.jpg",
    description: "Powerful and reliable helicopter widely used for VIP, utility, and medevac operations.",
    seats: 6,
    range: "337 nm",
    speed: "133 knots",
    status: "Available",
  },
  {
    id: 12,
    name: "Cessna Citation CJ2",
    category: "Light Jet",
    imageUrl: "/cessnaCJ2.jpg",
    description: "Efficient and fast light jet ideal for quick business trips across the region.",
    seats: 6,
    range: "1,613 nm",
    speed: "418 knots",
    status: "Available",
  },
  {
    id: 13,
    name: "Embraer Phenom 300",
    category: "Light Jet",
    imageUrl: "/embraer.png",
    description: "Top-selling light jet combining high speed, long range, and class-leading cabin comfort.",
    seats: 7,
    range: "2,010 nm",
    speed: "453 knots",
    status: "Available",
  },
  {
    id: 14,
    name: "Challenger 605",
    category: "Mid-Range Jet",
    imageUrl: "/challenger.jpg",
    description: "Spacious wide-cabin jet perfect for long-distance executive travel.",
    seats: 10,
    range: "4,000 nm",
    speed: "488 knots",
    status: "Available",
  },
  {
    id: 15,
    name: "Gulfstream G450",
    category: "Long-Range Jet",
    imageUrl: "/gulfstream.jpg",
    description: "Premium business jet offering long-range capability and high-performance cruising.",
    seats: 14,
    range: "4,350 nm",
    speed: "Mach 0.85",
    status: "Available",
  }
];


export default function FleetPage() {
  useEffect(() => {
    AOS.init({ duration: 300, easing: "ease-out-cubic", once: true, offset: 30 });
  }, []);

  return (
    <>
      {/* Background Video + Overlay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -2 }}
      >
        <source src="/video 3.mp4" type="video/mp4" />
      </video>
      <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "transparent",
    zIndex: -1,
  }}
/>


      <style jsx>{`
        :root {
          --primary: #1A2A44;
          --accent: #00d4ff;
        }

        .fleet-page {
          min-height: 100vh;
          color: white;
          font-family: 'Segoe UI', sans-serif;
        }

        .fleet-header {
          text-align: center;
          padding: 120px 20px 80px;
          background: linear-gradient(to bottom, rgba(26,42,68,0.95), transparent);
        }

        .fleet-header h1 {
          font-size: 3.8rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.6);
        }

        .fleet-header p {
          font-size: 1.3rem;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .fleet-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.5rem;
          padding: 40px 5%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .aircraft-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.4s ease;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }

        .aircraft-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }

        .aircraft-card__image-wrapper {
          height: 220px;
          overflow: hidden;
        }

        .aircraft-card__image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .aircraft-card:hover img {
          transform: scale(1.1);
        }

        .aircraft-card__content {
          padding: 1.8rem;
        }

        .aircraft-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }

        .aircraft-tag {
          display: inline-block;
          background: var(--accent);
          color: black;
          font-size: 0.8rem;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .aircraft-desc {
          font-size: 0.95rem;
          opacity: 0.9;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .aircraft-specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .aircraft-specs div span {
          display: block;
          opacity: 0.7;
          font-size: 0.8rem;
        }

        .aircraft-specs strong {
          font-size: 1.1rem;
          color: var(--accent);
        }

        .aircraft-cta {
          width: 100%;
          background: white;
          color: var(--primary);
          border: none;
          padding: 14px;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none; /* <-- remove underline */
        }

        .aircraft-cta:hover {
          background: var(--accent);
          color: black;
          transform: translateY(-3px);
          text-decoration: none; /* ensure no underline on hover */
        }

        .fleet-cta-section {
          text-align: center;
          padding: 100px 20px;
          background: rgba(0,0,0,0.3);
        }

        .fleet-cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .fleet-cta-btn {
          margin-top: 2rem;
          padding: 16px 50px;
          font-size: 1.1rem;
          background: white;
          color: var(--primary);
          border: none;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
        }

        .home-btn {
          position: fixed;
          top: 30px;
          left: 30px;
          transform: none;
          background: var(--primary);
          color: white;
          padding: 14px 40px;
          border-radius: 50px;
          z-index: 9999;
          box-shadow: 0 8px 25px rgba(0,0,0,0.5);
          text-decoration: none; /* already present — keep to be explicit */
        }

        /* remove default underline for all links in this component */
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .fleet-header h1 { font-size: 2.8rem; }
          .fleet-grid { grid-template-columns: 1fr; padding: 20px; }
          .aircraft-specs { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="fleet-page">
        {/* Header */}
        <header className="fleet-header" data-aos="fade-down">
          <h1>Our Fleet</h1>
          <p>
            Explore our handpicked selection of premium aircraft — each maintained to the highest standards 
            of safety, performance, and luxury for your journey across Africa and beyond.
          </p>
        </header>

  {/* Aircraft Grid */}
<section className="fleet-grid">
  {fleet.map((aircraft) => (
    <div
      key={aircraft.id}
      className="aircraft-card"
      data-aos="fade-up"
      data-aos-delay={(aircraft.id - 1) * 150}
    >
      <div className="aircraft-card__image-wrapper">
        <img src={aircraft.imageUrl} alt={aircraft.name} />
      </div>
      <div className="aircraft-card__content">
        <h3 className="aircraft-title">{aircraft.name}</h3>
        <span className="aircraft-tag">{aircraft.category}</span>
        <p className="aircraft-desc">{aircraft.description}</p>

        <div className="aircraft-specs">
          <div>
            <span>Passengers</span>
            <strong>{aircraft.seats}</strong>
          </div>
          <div>
            <span>Range</span>
            <strong>{aircraft.range}</strong>
          </div>
          <div>
            <span>Speed</span>
            <strong>{aircraft.speed}</strong>
          </div>
        </div>

        <Link to="/contact" className="aircraft-cta">
          Request Quote
        </Link>
      </div>
    </div>
  ))}
</section>


        {/* CTA Section */}
        <section className="fleet-cta-section" data-aos="fade-up">
          <h2>Need a Specific Aircraft?</h2>
          <p>
            Whether it's a helicopter, VIP airliner, or cargo aircraft — our team can source and deliver 
            exactly what you need, anywhere in the world.
          </p>
          <Link to="/contact" className="fleet-cta-btn">
            Contact Our Team
          </Link>
        </section>

        {/* Home Button */}
        <Link   to="/" className="home-btn"  data-aos="fade">
          Home
        </Link>
      </div>
    </>
  );
}