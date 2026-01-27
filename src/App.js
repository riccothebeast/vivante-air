import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import all your pages — make sure the file names match exactly!
import LandingPage from "./components/LandingPage.jsx";
import ServicePage from "./components/ServicePage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import FleetPage from "./components/FleetPage.jsx";   // ← NEW: Fleet page added
import SignupPage from "./components/SignupPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import BookingPage from "./components/BookingPage.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<LandingPage />} />

        {/* Services */}
        <Route path="/services" element={<ServicePage />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactPage />} />

        {/* NEW: Fleet Page */}
        <Route path="/fleet" element={<FleetPage />} />

        {/* Auth & Booking */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book" element={<BookingPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Optional: Catch-all redirect (nice to have) */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;