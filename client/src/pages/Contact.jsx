import { useEffect, useState } from 'react';
import axios from '../api/axios';
import './Contact.css';

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [shelters, setShelters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    loadShelters();
  }, []);

  const loadShelters = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/auth/shelters');
      setShelters(response.data);
    } catch (error) {
      console.error('Error loading shelters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // In a real application, you would send this to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have questions about our pet shopping platform? We're here to help!
          </p>
        </div>
        <div className="contact-hero-decoration">
          <span className="decoration-paw">🐾</span>
          <span className="decoration-heart">💖</span>
          <span className="decoration-star">⭐</span>
        </div>
      </div>

      <div className="contact-content">
        {/* Contact Form Section */}
        <div className="contact-form-section">
          <div className="section-header">
            <h2>Send us a Message</h2>
            <p>We'd love to hear from you! Fill out the form below and we'll get back to you.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <span className="label-icon">👤</span>
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">📧</span>
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  <span className="label-icon">📝</span>
                  Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  className="form-control"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type" className="form-label">
                  <span className="label-icon">🏷️</span>
                  Inquiry Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={contactForm.type}
                  onChange={handleContactChange}
                  className="form-control"
                >
                  <option value="general">General Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="shelter">Shelter Registration</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                <span className="label-icon">💬</span>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                className="form-control"
                placeholder="Tell us how we can help you..."
                rows="5"
                required
              />
            </div>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                <span className="message-icon">
                  {submitMessage.includes('error') ? '⚠️' : '✅'}
                </span>
                {submitMessage}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary contact-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending Message...
                </>
              ) : (
                <>
                  <span className="btn-icon">📤</span>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Shelter Directory Section */}
        <div className="shelter-directory-section">
          <div className="section-header">
            <h2>Our Partner Shelters</h2>
            <p>Connect with registered shelters and rescue organizations</p>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading shelters...</p>
            </div>
          ) : shelters.length > 0 ? (
            <div className="shelter-grid">
              {shelters.map((shelter) => (
                <div key={shelter._id} className="shelter-card">
                  <div className="shelter-header">
                    <div className="shelter-avatar">
                      {shelter.picture ? (
                        <img src={shelter.picture} alt={shelter.shelterName} />
                      ) : (
                        <span className="shelter-icon">🏠</span>
                      )}
                    </div>
                    <div className="shelter-info">
                      <h3 className="shelter-name">{shelter.shelterName}</h3>
                      <p className="shelter-contact">{shelter.name}</p>
                    </div>
                  </div>

                  {shelter.shelterDescription && (
                    <p className="shelter-description">{shelter.shelterDescription}</p>
                  )}

                  <div className="shelter-contact-info">
                    <div className="contact-item">
                      <span className="contact-icon">📧</span>
                      <a href={`mailto:${shelter.email}`} className="contact-link">
                        {shelter.email}
                      </a>
                    </div>
                    
                    {shelter.phone && (
                      <div className="contact-item">
                        <span className="contact-icon">📱</span>
                        <a href={`tel:${shelter.phone}`} className="contact-link">
                          {shelter.phone}
                        </a>
                      </div>
                    )}

                    {shelter.address && (
                      <div className="contact-item">
                        <span className="contact-icon">📍</span>
                        <span className="contact-text">{shelter.address}</span>
                      </div>
                    )}

                    {shelter.shelterWebsite && (
                      <div className="contact-item">
                        <span className="contact-icon">🌐</span>
                        <a 
                          href={shelter.shelterWebsite} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="contact-link"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-shelters">
              <div className="no-shelters-icon">🏠</div>
              <h3>No Shelters Registered Yet</h3>
              <p>Be the first shelter to join our platform!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


