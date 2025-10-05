import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import NotificationSystem from './NotificationSystem';

export default function Header({ onSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <>
      {/* Floating decorative elements */}
      <div className="floating-hearts">
        <div className="heart" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>💕</div>
        <div className="heart" style={{ top: '20%', right: '10%', animationDelay: '1s' }}>💖</div>
        <div className="heart" style={{ top: '60%', left: '15%', animationDelay: '2s' }}>💝</div>
        <div className="heart" style={{ top: '80%', right: '20%', animationDelay: '3s' }}>💗</div>
      </div>

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo Section */}
          <div className="logo-section">
            <Link to="/" className="logo">
              <span className="logo-icon">🐾</span>
              <span className="logo-text">
                <span className="logo-main">PAW</span>
                <span className="logo-sub">-love</span>
              </span>
            </Link>
            <div className="logo-tagline">Find your perfect companion</div>
          </div>

          {/* Navigation */}
          <nav className="nav-menu">
            <Link to="/browse" className="nav-link">
              <span className="nav-icon">🐕</span>
              Browse Pets
            </Link>
            <Link to="/community" className="nav-link">
              <span className="nav-icon">💬</span>
              Community
            </Link>
            <Link to="/contact" className="nav-link">
              <span className="nav-icon">✉️</span>
              Contact
            </Link>
            {user && !user.isShelter && (
              <Link to="/my-applications" className="nav-link">
                <span className="nav-icon">📋</span>
                My Applications
              </Link>
            )}
            {user?.isShelter && (
              <Link to="/dashboard" className="nav-link">
                <span className="nav-icon">🏠</span>
                Dashboard
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search for pets by name or breed..."
                value={searchValue}
                onChange={handleSearch}
                className="search-input"
              />
              <div className="search-decoration">
                <span className="paw-print">🐾</span>
              </div>
            </div>
          </div>

          {/* Auth Section */}
          <div className="auth-section">
            {!user ? (
              <>
                <Link to="/login" className="auth-btn auth-btn-login">
                  <span className="btn-icon">🔑</span>
                  Login
                </Link>
                <Link to="/signup" className="auth-btn auth-btn-signup">
                  <span className="btn-icon">✨</span>
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="user-menu">
                <NotificationSystem />
                <div className="user-info">
                  <span className="user-avatar">👤</span>
                  <span className="user-name">{user.name}</span>
                  {user.isShelter && <span className="user-badge">🏠</span>}
                </div>
                <button onClick={handleLogout} className="auth-btn auth-btn-logout">
                  <span className="btn-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Decorative paw prints */}
        <div className="header-paws">
          <span className="paw paw-1">🐾</span>
          <span className="paw paw-2">🐾</span>
          <span className="paw paw-3">🐾</span>
        </div>
      </header>
    </>
  );
}
