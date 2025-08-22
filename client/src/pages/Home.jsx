import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Revolutionary Video Hero Section */}
      <section className="hero-video">
        <div className="video-container">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video-bg"
            poster="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <img 
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Happy pets background" 
            />
          </video>
          
          {/* Video overlay for text readability */}
          <div className="video-overlay"></div>
          
          {/* Floating decorative elements */}
          <div className="floating-elements">
            <motion.div 
              className="floating-paw paw-1"
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🐾
            </motion.div>
            <motion.div 
              className="floating-heart heart-1"
              animate={{ 
                y: [-15, 15, -15],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            >
              💖
            </motion.div>
            <motion.div 
              className="floating-star star-1"
              animate={{ 
                y: [-8, 8, -8],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
            >
              ⭐
            </motion.div>
          </div>
        </div>
        
        {/* Hero Content with Smooth Animations */}
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Find Your Perfect
              <span className="gradient-text"> Furry Friend</span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Connect loving homes with adorable pets who need a family. 
              Every adoption creates a story of love, companionship, and joy.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/browse" className="btn btn-primary hero-btn">
                  <span className="btn-icon">🐕</span>
                  Browse Pets
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" className="btn btn-outline hero-btn">
                  <span className="btn-icon">🏠</span>
                  Join Our Community
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Interactive Pet Illustrations */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <div className="pet-illustrations">
              <motion.div 
                className="pet pet-dog"
                whileHover={{ scale: 1.2, rotate: 5 }}
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🐕
              </motion.div>
              <motion.div 
                className="pet pet-cat"
                whileHover={{ scale: 1.2, rotate: -5 }}
                animate={{ 
                  y: [-8, 8, -8],
                  rotate: [0, -2, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                🐱
              </motion.div>
              <motion.div 
                className="pet pet-rabbit"
                whileHover={{ scale: 1.2, rotate: 3 }}
                animate={{ 
                  y: [-12, 12, -12],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🐰
              </motion.div>
              <motion.div 
                className="pet pet-bird"
                whileHover={{ scale: 1.2, rotate: -3 }}
                animate={{ 
                  y: [-6, 6, -6],
                  rotate: [0, -1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                🦜
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="gradient-text">PAW-love</span>?
          </motion.h2>
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="feature-icon">🏠</div>
              <h3>Safe & Loving Homes</h3>
              <p>Every pet is carefully matched with families who provide the love and care they deserve.</p>
            </motion.div>
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="feature-icon">🔍</div>
              <h3>Easy Search</h3>
              <p>Find your perfect companion with our advanced search and filtering options.</p>
            </motion.div>
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="feature-icon">💝</div>
              <h3>Forever Families</h3>
              <p>We ensure every adoption leads to a lifetime of happiness and companionship.</p>
            </motion.div>
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="feature-icon">🌟</div>
              <h3>Trusted Shelters</h3>
              <p>Partnering with verified shelters and rescue organizations across the country.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Adoptions</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Shelters</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="stat-number">1000+</div>
              <div className="stat-label">Pets Available</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="stat-number">99%</div>
              <div className="stat-label">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Find Your Perfect Match?</h2>
            <p>Join thousands of families who have found their forever friends through PAW-love.</p>
            <div className="cta-buttons">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/browse" className="btn btn-primary">
                  <span className="btn-icon">🐾</span>
                  Start Searching
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" className="btn btn-secondary">
                  <span className="btn-icon">✨</span>
                  Create Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
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
