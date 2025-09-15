import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(form.email, form.password);
      navigate("/browse");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
        </div>
        <div className="auth-pattern"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-icon">🐾</span>
              <h1>Welcome Back!</h1>
            </div>
            <p className="auth-subtitle">Sign in to your PAW-love account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="message error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <span className="btn-icon">🔑</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Google Sign-In */}
          <GoogleSignIn
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="Sign in with Google"
          />

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Sign up here
              </Link>
            </p>
            <div className="auth-decoration">
              <span className="heart">💖</span>
              <span className="paw">🐾</span>
              <span className="star">⭐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
