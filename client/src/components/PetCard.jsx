import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaCat, FaDog, FaEye, FaHeart, FaPaw, FaQuestion } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PetCard.css';

export default function PetCard({ pet }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Debug: Log the pet data to see what fields are available
  console.log('PetCard received pet:', pet);
  console.log('Pet images field:', pet.images);
  console.log('Pet imageUrls field:', pet.imageUrls);
  console.log('Pet imageUrls type:', typeof pet.imageUrls);
  console.log('Pet images type:', typeof pet.images);
  console.log('Pet imageUrls length:', pet.imageUrls?.length);
  console.log('Pet images length:', pet.images?.length);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // Here you would typically make an API call to save to favorites
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleAdopt = () => {
    setShowModal(false);
    navigate(`/pets/${pet._id}`);
  };

  const getSpeciesIcon = (species) => {
    switch (species?.toLowerCase()) {
      case 'dog': return <FaDog className="species-icon" />;
      case 'cat': return <FaCat className="species-icon" />;
      default: return <FaQuestion className="species-icon" />;
    }
  };

  const getAgeText = (age) => {
    if (!age) return 'Age unknown';
    if (age < 1) return `${Math.round(age * 12)} months`;
    if (age === 1) return '1 year';
    return `${age} years`;
  };

  const getGenderIcon = (gender) => {
    return gender === 'male' ? '♂️' : gender === 'female' ? '♀️' : '❓';
  };

  return (
    <>
      <motion.div
        className="pet-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        layout
      >
        {/* Card Image Container */}
        <div className="pet-image-container">
          <img
            src={pet.images?.[0] || pet.imageUrls?.[0] || "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
            alt={pet.name}
            className="pet-image"
            onError={(e) => {
              console.log('Image failed to load, using fallback');
              console.log('Failed image URL:', e.target.src);
              e.target.src = "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
            }}
            onLoad={(e) => {
              console.log('Image loaded successfully:', e.target.src);
            }}
          />
          
          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="pet-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overlay-content">
                  <motion.div
                    className="overlay-text"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3>Hi, I'm {pet.name}! 🐾</h3>
                    <p>{pet.description?.slice(0, 80) || "I'm looking for a loving home!"}...</p>
                  </motion.div>
                  
                  <motion.div
                    className="overlay-actions"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      className="action-btn quick-view-btn"
                      onClick={handleQuickView}
                    >
                      <FaEye />
                      Quick View
                    </button>
                    <button
                      className="action-btn adopt-btn"
                      onClick={() => navigate(`/pets/${pet._id}`)}
                    >
                      <FaPaw />
                      Adopt Me
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Favorite Button */}
          <motion.button
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={handleFavorite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={false}
            animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <FaHeart />
          </motion.button>

          {/* Species Badge */}
          <div className="species-badge">
            {getSpeciesIcon(pet.species)}
          </div>
        </div>

        {/* Card Content */}
        <div className="pet-content">
          <div className="pet-header">
            <h3 className="pet-name">{pet.name}</h3>
            <span className="pet-gender">{getGenderIcon(pet.gender)}</span>
          </div>
          
          <div className="pet-details">
            <div className="pet-breed">{pet.breed || 'Mixed Breed'}</div>
            <div className="pet-age">{getAgeText(pet.age)}</div>
            <div className="pet-size">{pet.size || 'Medium'}</div>
          </div>
          
          <div className="pet-location">
            📍 {pet.location || 'Location TBD'}
          </div>
        </div>

        {/* Card Footer */}
        <div className="pet-footer">
          <motion.button
            className="view-details-btn"
            onClick={() => navigate(`/pets/${pet._id}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaw />
            View Details
          </motion.button>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{pet.name}</h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-image">
                  <img
                    src={pet.images?.[0] || pet.imageUrls?.[0] || "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                    alt={pet.name}
                    onError={(e) => {
                      console.log('Modal image failed to load, using fallback');
                      console.log('Failed modal image URL:', e.target.src);
                      e.target.src = "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                    }}
                    onLoad={(e) => {
                      console.log('Modal image loaded successfully:', e.target.src);
                    }}
                  />
                </div>
                
                <div className="modal-info">
                  <div className="info-row">
                    <span className="info-label">Species:</span>
                    <span className="info-value">{getSpeciesIcon(pet.species)} {pet.species || 'Unknown'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Breed:</span>
                    <span className="info-value">{pet.breed || 'Mixed Breed'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Age:</span>
                    <span className="info-value">{getAgeText(pet.age)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gender:</span>
                    <span className="info-value">{getGenderIcon(pet.gender)} {pet.gender || 'Unknown'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Size:</span>
                    <span className="info-value">{pet.size || 'Medium'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Location:</span>
                    <span className="info-value">📍 {pet.location || 'Location TBD'}</span>
                  </div>
                </div>
                
                <div className="modal-description">
                  <h4>About {pet.name}</h4>
                  <p>{pet.description || "This adorable pet is looking for a loving home. They have a wonderful personality and would make a great companion!"}</p>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleAdopt}
                >
                  <FaPaw />
                  Adopt {pet.name}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
