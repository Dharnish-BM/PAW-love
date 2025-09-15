import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCat, FaDog, FaHeart, FaMapMarkerAlt, FaPaw, FaQuestion, FaShare } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import AdoptionForm from '../components/AdoptionForm';
import { useAuth } from '../context/AuthContext';
import './PetDetails.css';

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/pets/${id}`);
        setPet(data);
        
        // Check if user has already applied for this pet
        if (user) {
          try {
            const { data: applications } = await api.get('/adoptions/my-applications');
            const userApplication = applications.find(app => app.pet._id === id);
            setHasApplied(!!userApplication);
          } catch (error) {
            console.error('Error checking applications:', error);
          }
        }
      } finally { 
        setLoading(false); 
      }
    };
    load();
  }, [id, user]);

  const handleAdoptClick = () => {
    console.log('Adopt button clicked');
    console.log('User:', user);
    if (!user) {
      console.log('No user, navigating to login');
      navigate('/login');
      return;
    }
    console.log('Showing adoption form');
    setShowAdoptionForm(true);
  };

  const handleApplicationSuccess = () => {
    setHasApplied(true);
    setShowAdoptionForm(false);
    // Show success message
    alert('Application submitted successfully! You will be notified of any updates.');
  };

  const getSpeciesIcon = (species) => {
    switch (species?.toLowerCase()) {
      case 'dog': return <FaDog className="species-icon" />;
      case 'cat': return <FaCat className="species-icon" />;
      default: return <FaQuestion className="species-icon" />;
    }
  };

  const getGenderIcon = (gender) => {
    return gender === 'male' ? '♂️' : gender === 'female' ? '♀️' : '❓';
  };

  const getAgeText = (age) => {
    if (!age) return 'Age unknown';
    if (age < 1) return `${Math.round(age * 12)} months`;
    if (age === 1) return '1 year';
    return `${age} years`;
  };

  if (loading) {
    return (
      <div className="pet-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading pet details...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="pet-details-error">
        <div className="error-icon">🐾</div>
        <h2>Pet Not Found</h2>
        <p>The pet you're looking for doesn't exist or has been removed.</p>
        <button className="btn btn-primary" onClick={() => navigate('/browse')}>
          Browse Other Pets
        </button>
      </div>
    );
  }

  return (
    <div className="pet-details">
      <div className="container">
        {/* Back Button */}
        <motion.button
          className="back-button"
          onClick={() => navigate('/browse')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowLeft />
          Back to Browse
        </motion.button>

        <div className="pet-details-content">
          {/* Pet Images */}
          <motion.div 
            className="pet-images-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="pet-images">
              {pet.images && pet.images.length > 0 ? (
                pet.images.map((src, idx) => (
                  <div key={idx} className="pet-image">
                    <img 
                      src={src} 
                      alt={`${pet.name}-${idx}`}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="pet-image">
                  <img 
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt={pet.name}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Pet Information */}
          <motion.div 
            className="pet-info-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="pet-header">
              <div className="pet-title">
                <h1>{pet.name}</h1>
                <div className="pet-badges">
                  <span className="species-badge">
                    {getSpeciesIcon(pet.species)}
                    {pet.species}
                  </span>
                  <span className="gender-badge">
                    {getGenderIcon(pet.gender)}
                    {pet.gender}
                  </span>
                </div>
              </div>
              
              <div className="pet-actions">
                <button className="action-btn favorite-btn">
                  <FaHeart />
                </button>
                <button className="action-btn share-btn">
                  <FaShare />
                </button>
              </div>
            </div>

            <div className="pet-details-grid">
              <div className="detail-item">
                <span className="detail-label">Breed</span>
                <span className="detail-value">{pet.breed || 'Mixed Breed'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age</span>
                <span className="detail-value">{getAgeText(pet.age)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Size</span>
                <span className="detail-value">{pet.size || 'Medium'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">
                  <FaMapMarkerAlt />
                  {pet.location || 'Location TBD'}
                </span>
              </div>
            </div>

            {pet.description && (
              <div className="pet-description">
                <h3>About {pet.name}</h3>
                <p>{pet.description}</p>
              </div>
            )}

            {pet.medicalHistory && (
              <div className="pet-medical">
                <h3>Medical History</h3>
                <p>{pet.medicalHistory}</p>
              </div>
            )}

            {/* Adoption Section */}
            <div className="adoption-section">
              {pet.isAdopted ? (
                <div className="adopted-notice">
                  <div className="adopted-icon">🏠</div>
                  <h3>This pet has been adopted!</h3>
                  <p>Thank you for your interest. This pet has found their forever home.</p>
                  <button className="btn btn-outline" onClick={() => navigate('/browse')}>
                    Browse Other Pets
                  </button>
                </div>
              ) : hasApplied ? (
                <div className="applied-notice">
                  <div className="applied-icon">📋</div>
                  <h3>Application Submitted</h3>
                  <p>You have already submitted an adoption application for {pet.name}. The shelter will contact you soon.</p>
                  <button className="btn btn-primary" onClick={() => navigate('/my-applications')}>
                    Track Application
                  </button>
                </div>
              ) : (
                <div className="adoption-cta">
                  <h3>Ready to Adopt {pet.name}?</h3>
                  <p>Fill out our comprehensive adoption application to start the process.</p>
                  <button className="btn btn-primary adopt-btn" onClick={handleAdoptClick}>
                    <FaPaw />
                    Start Adoption Process
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Adoption Form Modal */}
      <AnimatePresence>
        {showAdoptionForm && (
          <AdoptionForm
            pet={pet}
            onClose={() => setShowAdoptionForm(false)}
            onSuccess={handleApplicationSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
