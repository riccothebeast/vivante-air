import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// LandingPage is eager-loaded (above the fold / critical path)
import LandingPage from "./components/LandingPage.jsx";

// All other pages are lazy-loaded for route-level code splitting
const ServicePage      = lazy(() => import("./components/ServicePage.jsx"));
const ContactPage      = lazy(() => import("./components/ContactPage.jsx"));
const FleetPage        = lazy(() => import("./components/FleetPage.jsx"));
const SignupPage       = lazy(() => import("./components/SignupPage.jsx"));
const LoginPage        = lazy(() => import("./components/LoginPage.jsx"));
const BookingPage      = lazy(() => import("./components/BookingPage.jsx"));
const AdminDashboard   = lazy(() => import("./components/AdminDashboard.jsx"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0C172B' }} />}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<LandingPage />} />

          {/* Services */}
          <Route path="/services" element={<ServicePage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Fleet Page */}
          <Route path="/fleet" element={<FleetPage />} />

          {/* Auth & Booking */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/book" element={<BookingPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
