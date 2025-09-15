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
  
  // Debug: Log pet data
  console.log('PetCard received pet data:', pet);
  console.log('Pet images:', pet.images);
  console.log('First image URL:', pet.images?.[0]);

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

  const getDefaultPetImage = (species, petName) => {
    // Create unique images based on species and name hash
    const nameHash = petName ? petName.charCodeAt(0) % 3 : 0;
    
    const defaultImages = {
      dog: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1547407139-3c921a71905c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      cat: [
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      bird: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      rabbit: [
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      hamster: [
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ],
      fish: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ]
    };
    
    const speciesImages = defaultImages[species?.toLowerCase()] || defaultImages.dog;
    return speciesImages[nameHash] || speciesImages[0];
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
              src={pet.images?.[0] || pet.imageUrls?.[0] || getDefaultPetImage(pet.species, pet.name)}
              alt={pet.name}
              className="pet-image"
              onError={(e) => {
                console.log('Image failed to load for:', pet.name, 'URL:', e.target.src);
                // Only use fallback if it's not already a fallback image
                if (!e.target.src.includes('unsplash.com') || !e.target.src.includes('getDefaultPetImage')) {
                  e.target.src = getDefaultPetImage(pet.species, pet.name);
                }
              }}
              onLoad={() => {
                console.log('Image loaded successfully for:', pet.name, 'URL:', pet.images?.[0] || pet.imageUrls?.[0]);
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
            <div className="pet-gender-badge">
              {getGenderIcon(pet.gender)}
            </div>
          </div>
          
          <div className="pet-details-row">
            <div className="detail-chip breed-chip">
              <span className="chip-icon">🐕</span>
              <span className="chip-text">{pet.breed || 'Mixed Breed'}</span>
            </div>
            <div className="detail-chip age-chip">
              <span className="chip-icon">📅</span>
              <span className="chip-text">{getAgeText(pet.age)}</span>
            </div>
          </div>
          
          <div className="pet-details-row">
            <div className="detail-chip size-chip">
              <span className="chip-icon">📏</span>
              <span className="chip-text">{pet.size || 'Medium'}</span>
            </div>
            <div className="detail-chip location-chip">
              <span className="chip-icon">📍</span>
              <span className="chip-text">{pet.location || 'TBD'}</span>
            </div>
          </div>
          
          {pet.description && (
            <div className="pet-description">
              <p>{pet.description.slice(0, 80)}...</p>
            </div>
          )}
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
                    src={pet.images?.[0] || pet.imageUrls?.[0] || getDefaultPetImage(pet.species, pet.name)}
                    alt={pet.name}
                    onError={(e) => {
                      console.log('Modal image failed to load for:', pet.name, 'URL:', e.target.src);
                      if (!e.target.src.includes('unsplash.com') || !e.target.src.includes('getDefaultPetImage')) {
                        e.target.src = getDefaultPetImage(pet.species, pet.name);
                      }
                    }}
                    onLoad={() => {
                      console.log('Modal image loaded successfully for:', pet.name);
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
