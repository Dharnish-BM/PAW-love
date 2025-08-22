import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="floating-paws">
            <span className="paw paw-1">🐾</span>
            <span className="paw paw-2">🐾</span>
            <span className="paw paw-3">🐾</span>
            <span className="paw paw-4">🐾</span>
            <span className="paw paw-5">🐾</span>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your Perfect
              <span className="gradient-text"> Furry Friend</span>
            </h1>
            <p className="hero-subtitle">
              Connect loving homes with adorable pets who need a family. 
              Every adoption creates a story of love, companionship, and joy.
            </p>
            <div className="hero-buttons">
              <Link to="/browse" className="btn btn-primary hero-btn">
                <span className="btn-icon">🐕</span>
                Browse Pets
              </Link>
              <Link to="/signup" className="btn btn-outline hero-btn">
                <span className="btn-icon">🏠</span>
                Join Our Community
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="pet-illustrations">
              <div className="pet pet-dog">🐕</div>
              <div className="pet pet-cat">🐱</div>
              <div className="pet pet-rabbit">🐰</div>
              <div className="pet pet-bird">🦜</div>
            </div>
            <div className="hero-decoration">
              <span className="heart-decoration">💖</span>
              <span className="star-decoration">⭐</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">
            Why Choose <span className="gradient-text">PAW-love</span>?
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Safe & Loving Homes</h3>
              <p>Every pet is carefully matched with families who provide the love and care they deserve.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Easy Search</h3>
              <p>Find your perfect companion with our advanced search and filtering options.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💝</div>
              <h3>Forever Families</h3>
              <p>We ensure every adoption leads to a lifetime of happiness and companionship.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Trusted Shelters</h3>
              <p>Partnering with verified shelters and rescue organizations across the country.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Adoptions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Shelters</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Pets Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Match?</h2>
            <p>Join thousands of families who have found their forever friends through PAW-love.</p>
            <div className="cta-buttons">
              <Link to="/browse" className="btn btn-primary">
                <span className="btn-icon">🐾</span>
                Start Searching
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                <span className="btn-icon">✨</span>
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="footer-decoration">
        <div className="paw-trail">
          <span className="paw">🐾</span>
          <span className="paw">🐾</span>
          <span className="paw">🐾</span>
          <span className="paw">🐾</span>
          <span className="paw">🐾</span>
        </div>
      </div>
    </div>
  );
}
