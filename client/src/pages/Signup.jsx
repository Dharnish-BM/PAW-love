import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    isShelter: false,
    shelterName: "",
    shelterDescription: "",
    shelterWebsite: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      await signup(form);
      navigate("/browse");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (result) => {
    navigate("/browse");
  };

  const handleGoogleError = (error) => {
    setError("Google Sign-In failed. Please try again.");
  };

  return (
    <div className="auth-page">
      {/* Background decorations */}
      <div className="auth-background">
        <div className="floating-paws">
          <span className="paw paw-1">🐾</span>
          <span className="paw paw-2">🐾</span>
          <span className="paw paw-3">🐾</span>
          <span className="paw paw-4">🐾</span>
        </div>
        <div className="auth-pattern"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-icon">✨</span>
              <h1>Join PAW-love!</h1>
            </div>
            <p className="auth-subtitle">Create your account and start your adoption journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="message error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <span className="label-icon">👤</span>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">📧</span>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <span className="label-icon">🔒</span>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <span className="label-icon">✅</span>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  <span className="label-icon">📱</span>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  <span className="label-icon">🏠</span>
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isShelter"
                  checked={form.isShelter}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">
                  <span className="checkbox-icon">🏠</span>
                  Register as a Shelter/Rescue Organization
                </span>
              </label>
            </div>

            {/* Shelter-specific fields */}
            {form.isShelter && (
              <div className="shelter-fields">
                <div className="shelter-section-header">
                  <h3>🏠 Shelter Information</h3>
                  <p>Please provide your shelter details</p>
                </div>

                <div className="form-group">
                  <label htmlFor="shelterName" className="form-label">
                    <span className="label-icon">🏢</span>
                    Shelter Name *
                  </label>
                  <input
                    id="shelterName"
                    name="shelterName"
                    type="text"
                    value={form.shelterName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your shelter name"
                    required={form.isShelter}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="shelterDescription" className="form-label">
                    <span className="label-icon">📝</span>
                    Shelter Description
                  </label>
                  <textarea
                    id="shelterDescription"
                    name="shelterDescription"
                    value={form.shelterDescription}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Tell us about your shelter..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="shelterWebsite" className="form-label">
                    <span className="label-icon">🌐</span>
                    Website URL
                  </label>
                  <input
                    id="shelterWebsite"
                    name="shelterWebsite"
                    type="url"
                    value={form.shelterWebsite}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://your-shelter-website.com"
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span className="btn-icon">✨</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span className="divider-text">or</span>
          </div>

          {/* Google Sign-In */}
          <GoogleSignIn
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="Sign up with Google"
          />

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
            <div className="auth-decoration">
              <span className="heart">💖</span>
              <span className="paw">🐾</span>
              <span className="star">⭐</span>
              <span className="sparkle">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
