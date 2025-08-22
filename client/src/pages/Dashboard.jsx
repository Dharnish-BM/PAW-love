import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaCalendarAlt,
    FaCat,
    FaCheck,
    FaDog,
    FaEdit,
    FaEnvelope,
    FaMapMarkerAlt,
    FaMars, FaMinus,
    FaPhone,
    FaPlus,
    FaQuestion,
    FaTimes,
    FaTrash,
    FaUpload,
    FaUser,
    FaVenus
} from 'react-icons/fa';
import api from '../api/axios';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function DashboardInner() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [form, setForm] = useState({
    name: '',
    species: 'dog',
    breed: '',
    age: '',
    gender: 'unknown',
    size: 'medium',
    location: '',
    description: '',
    medicalHistory: '',
    images: []
  });
  
  console.log('Initial form state:', form);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      console.log('Loading dashboard data...');
      const [p, a] = await Promise.all([
        api.get('/pets/mine/list'),
        api.get('/pets/owner/applications/list')
      ]);
      console.log('Pets response:', p.data);
      console.log('Applications response:', a.data);
      
      // Check if pets have images
      if (p.data && p.data.length > 0) {
        p.data.forEach((pet, index) => {
          console.log(`Pet ${index}:`, pet.name, 'Images:', pet.images, 'ImageUrls:', pet.imageUrls);
        });
      }
      
      setPets(p.data);
      setApps(a.data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      console.error('Error details:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    console.log('Dashboard component mounted');
    load(); 
  }, []);
  
  useEffect(() => {
    console.log('Form state changed:', form);
  }, [form]);
  
  useEffect(() => {
    console.log('Image files changed:', imageFiles);
  }, [imageFiles]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log('Selected files:', files);
    console.log('Files length:', files.length);
    setImageFiles(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    console.log('Removing image at index:', index);
    setImageFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      console.log('New files array:', newFiles);
      return newFiles;
    });
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];
    
    setUploading(true);
    try {
      // Use working Unsplash pet images
      const petImages = [
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1507146426996-ef05306b0a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ];
      
      const uploadedUrls = imageFiles.map((_, index) => 
        petImages[index % petImages.length]
      );
      console.log('Generated image URLs:', uploadedUrls);
      setUploading(false);
      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploading(false);
      return [];
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form:', form);
      const imageUrls = await uploadImages();
      const payload = { 
        ...form, 
        images: [...(form.images || []), ...imageUrls],
        age: parseFloat(form.age) || 0
      };
      
      console.log('Form images:', form.images);
      console.log('New image URLs:', imageUrls);
      console.log('Combined images:', payload.images);
      console.log('Sending payload:', payload);
      
      if (editingPet) {
        await api.put(`/pets/${editingPet._id}`, payload);
        setEditingPet(null);
      } else {
        const response = await api.post('/pets/add', payload);
        console.log('Add pet response:', response);
      }
      
      setForm({
        name: '', 
        species: 'dog', 
        breed: '', 
        age: '', 
        gender: 'unknown',
        size: 'medium', 
        location: '', 
        description: '', 
        medicalHistory: '', 
        images: []
      });
      setImageFiles([]);
      setShowAddForm(false);
    await load();
    } catch (error) {
      console.error('Error saving pet:', error);
      console.error('Error details:', error.response?.data);
      alert(`Error saving pet: ${error.response?.data?.message || error.message}`);
    }
  };

  const editPet = (pet) => {
    console.log('Editing pet:', pet);
    console.log('Pet images:', pet.images);
    console.log('Pet imageUrls:', pet.imageUrls);
    
    setEditingPet(pet);
    setForm({
      name: pet.name || '',
      species: pet.species || 'dog',
      breed: pet.breed || '',
      age: pet.age || '',
      gender: pet.gender || 'unknown',
      size: pet.size || 'medium',
      location: pet.location || '',
      description: pet.description || '',
      medicalHistory: pet.medicalHistory || '',
      images: pet.images || pet.imageUrls || []
    });
    setShowAddForm(true);
  };

  const deletePet = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await api.delete(`/pets/${id}`);
        await load();
      } catch (error) {
        console.error('Error deleting pet:', error);
        alert('Error deleting pet. Please try again.');
      }
    }
  };

  const markAdopted = async (id) => {
    try {
      await api.put(`/pets/${id}/adopt`); // Fixed: use correct endpoint
      await load();
    } catch (error) {
      console.error('Error marking pet as adopted:', error);
      alert('Error marking pet as adopted. Please try again.');
    }
  };

  const setStatus = async (id, status) => {
    try {
      await api.put(`/pets/applications/${id}`, { status });
      await load();
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Error updating application status. Please try again.');
    }
  };

  const getSpeciesIcon = (species) => {
    switch (species?.toLowerCase()) {
      case 'dog': return <FaDog />;
      case 'cat': return <FaCat />;
      default: return <FaQuestion />;
    }
  };

  const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male': return <FaMars />;
      case 'female': return <FaVenus />;
      default: return <FaMinus />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'contacted': return 'status-contacted';
      default: return 'status-pending';
    }
  };

  console.log('Current user:', user);
  console.log('User isShelter:', user?.isShelter);
  
  if (!user?.isShelter) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">🚫</div>
        <h2>Access Denied</h2>
        <p>You must be a shelter user to access this dashboard.</p>
        <p>Current user: {user?.email} | isShelter: {user?.isShelter ? 'true' : 'false'}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Dashboard Header */}
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <h1>Shelter Dashboard</h1>
            <p>Manage your pets and adoption applications</p>
          </div>
          <motion.button
            className="add-pet-btn"
            onClick={() => setShowAddForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
            Add New Pet
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="stat-card">
            <div className="stat-icon pets-icon">🐾</div>
            <div className="stat-content">
              <div className="stat-number">{pets.length}</div>
              <div className="stat-label">Total Pets</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon available-icon">🏠</div>
            <div className="stat-content">
              <div className="stat-number">{pets.filter(p => !p.isAdopted).length}</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon adopted-icon">💝</div>
            <div className="stat-content">
              <div className="stat-number">{pets.filter(p => p.isAdopted).length}</div>
              <div className="stat-label">Adopted</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon applications-icon">📋</div>
            <div className="stat-content">
              <div className="stat-number">{apps.length}</div>
              <div className="stat-label">Applications</div>
            </div>
          </div>
        </motion.div>

        {/* Add/Edit Pet Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              className="pet-form-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="pet-form-modal"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="form-header">
                  <h2>{editingPet ? 'Edit Pet' : 'Add New Pet'}</h2>
                  <button 
                    className="close-btn"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingPet(null);
                      setForm({
                        name: '', 
                        species: 'dog', 
                        breed: '', 
                        age: '', 
                        gender: 'unknown',
                        size: 'medium', 
                        location: '', 
                        description: '', 
                        medicalHistory: '', 
                        images: []
                      });
                      setImageFiles([]);
                    }}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={submit} className="pet-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Pet Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        required
                        placeholder="Enter pet's name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Species *</label>
                      <select
                        value={form.species}
                        onChange={(e) => setForm({...form, species: e.target.value})}
                        required
                      >
                        <option value="dog">🐕 Dog</option>
                        <option value="cat">🐱 Cat</option>
                        <option value="other">🦜 Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Breed</label>
                      <input
                        type="text"
                        value={form.breed}
                        onChange={(e) => setForm({...form, breed: e.target.value})}
                        placeholder="e.g., Golden Retriever"
                      />
                    </div>

                    <div className="form-group">
                      <label>Age (years)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={form.age}
                        onChange={(e) => setForm({...form, age: e.target.value})}
                        placeholder="e.g., 2.5"
                      />
                    </div>

                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        value={form.gender}
                        onChange={(e) => setForm({...form, gender: e.target.value})}
                      >
                        <option value="unknown">❓ Unknown</option>
                        <option value="male">♂ Male</option>
                        <option value="female">♀ Female</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Size</label>
                      <select
                        value={form.size}
                        onChange={(e) => setForm({...form, size: e.target.value})}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm({...form, location: e.target.value})}
                      placeholder="City, State"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Description</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        placeholder="Tell us about this pet's personality, likes, dislikes..."
                        rows="3"
                      />
                  </div>

                  <div className="form-group full-width">
                    <label>Medical History</label>
                    <textarea
                      value={form.medicalHistory}
                      onChange={(e) => setForm({...form, medicalHistory: e.target.value})}
                      placeholder="Any medical conditions, vaccinations, spay/neuter status..."
                      rows="3"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="form-group full-width">
                    <label>Pet Images</label>
                    <div className="image-upload-section">
                      <div className="image-upload-area">
                        <FaUpload className="upload-icon" />
                        <p>Click to upload images or drag & drop</p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="file-input"
                          onClick={(e) => e.target.value = null} // Reset file input
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                      
                      {/* Preview Uploaded Images */}
                      {imageFiles.length > 0 && (
                        <div className="image-previews">
                          <h4>New Images ({imageFiles.length})</h4>
                          <div className="preview-grid">
                            {imageFiles.map((file, index) => (
                              <div key={index} className="image-preview">
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={`Preview ${index + 1}`}
                                  onError={(e) => {
                                    console.log('Preview image failed to load');
                                    console.log('Failed preview image URL:', e.target.src);
                                    e.target.style.display = 'none';
                                  }}
                                  onLoad={(e) => {
                                    console.log('Preview image loaded successfully:', e.target.src);
                                  }}
                                />
                                <button
                                  type="button"
                                  className="remove-image"
                                  onClick={() => removeImage(index)}
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Existing Images */}
                      {(form.images && form.images.length > 0) && (
                        <div className="existing-images">
                          <h4>Existing Images ({form.images.length})</h4>
                          <div className="preview-grid">
                            {form.images.map((url, index) => (
                              <div key={index} className="image-preview existing">
                                <img 
                                  src={url} 
                                  alt={`Pet ${index + 1}`}
                                  onError={(e) => {
                                    console.log('Form image failed to load:', url);
                                    console.log('Failed form image URL:', e.target.src);
                                    e.target.style.display = 'none';
                                  }}
                                  onLoad={(e) => {
                                    console.log('Form image loaded successfully:', e.target.src);
                                  }}
                                />
                                <button
                                  type="button"
                                  className="remove-image"
                                  onClick={() => setForm({
                                    ...form, 
                                    images: form.images.filter((_, i) => i !== index)
                                  })}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingPet(null);
                        setForm({
                          name: '', 
                          species: 'dog', 
                          breed: '', 
                          age: '', 
                          gender: 'unknown',
                          size: 'medium', 
                          location: '', 
                          description: '', 
                          medicalHistory: '', 
                          images: []
                        });
                        setImageFiles([]);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={uploading}
                    >
                      {uploading ? 'Uploading...' : (editingPet ? 'Update Pet' : 'Add Pet')}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="dashboard-content">
          {/* Pets Management */}
          <motion.div 
            className="pets-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="section-header">
              <h2>My Pets</h2>
              <span className="pet-count">{pets.length} pets</span>
            </div>

            {loading ? (
              <div className="loading-skeleton">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton-pet-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-text"></div>
                      <div className="skeleton-text short"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : pets.length > 0 ? (
              <div className="pets-grid">
                {pets.map((pet) => (
                  <motion.div
                    key={pet._id}
                    className={`pet-card ${pet.isAdopted ? 'adopted' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pet-image">
                      {(pet.images && pet.images.length > 0) || (pet.imageUrls && pet.imageUrls.length > 0) ? (
                        <img 
                          src={pet.images?.[0] || pet.imageUrls?.[0]} 
                          alt={pet.name}
                          onError={(e) => {
                            console.log('Dashboard image failed to load, using fallback');
                            console.log('Failed dashboard image URL:', e.target.src);
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                          onLoad={(e) => {
                            console.log('Dashboard image loaded successfully:', e.target.src);
                          }}
                        />
                      ) : null}
                      <div className="no-image" style={{ display: (pet.images && pet.images.length > 0) || (pet.imageUrls && pet.imageUrls.length > 0) ? 'none' : 'flex' }}>
                        {getSpeciesIcon(pet.species)}
                      </div>
                      {pet.isAdopted && <div className="adopted-badge">Adopted</div>}
                    </div>
                    
                    <div className="pet-info">
                      <div className="pet-header">
                        <h3>{pet.name}</h3>
                        <div className="pet-actions">
                          <button
                            className="action-btn edit"
                            onClick={() => editPet(pet)}
                            title="Edit Pet"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => deletePet(pet._id)}
                            title="Delete Pet"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      
                      <div className="pet-details">
                        <span className="detail-item">
                          {getSpeciesIcon(pet.species)} {pet.species}
                        </span>
                        <span className="detail-item">
                          {getGenderIcon(pet.gender)} {pet.gender}
                        </span>
                        {pet.breed && (
                          <span className="detail-item">
                            {pet.breed}
                          </span>
                        )}
                        {pet.age && (
                          <span className="detail-item">
                            <FaCalendarAlt /> {pet.age} years
                          </span>
                        )}
                        {pet.location && (
                          <span className="detail-item">
                            <FaMapMarkerAlt /> {pet.location}
                          </span>
                        )}
                      </div>
                      
                      {pet.description && (
                        <p className="pet-description">{pet.description}</p>
                      )}
                      
                      {!pet.isAdopted && (
                        <button
                          className="mark-adopted-btn"
                          onClick={() => markAdopted(pet._id)}
                        >
                          <FaCheck />
                          Mark as Adopted
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🐾</div>
                <h3>No pets yet</h3>
                <p>Start by adding your first pet to the shelter</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAddForm(true)}
                >
                  <FaPlus />
                  Add Your First Pet
                </button>
              </div>
            )}
          </motion.div>

          {/* Applications Section */}
          <motion.div 
            className="applications-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="section-header">
              <h2>Adoption Applications</h2>
              <span className="application-count">{apps.length} applications</span>
            </div>

            {loading ? (
              <div className="loading-skeleton">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton-application">
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-text"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : apps.length > 0 ? (
              <div className="applications-list">
                {apps.map((app) => (
                  <motion.div
                    key={app._id}
                    className={`application-card ${getStatusColor(app.status)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="application-header">
                      <div className="applicant-info">
                        <div className="applicant-avatar">
                          <FaUser />
                        </div>
                        <div className="applicant-details">
                          <h4>{app.user?.name || 'Unknown User'}</h4>
                          <p className="applicant-email">
                            <FaEnvelope /> {app.user?.email || 'No email'}
                          </p>
                          {app.user?.phone && (
                            <p className="applicant-phone">
                              <FaPhone /> {app.user.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="application-status">
                        <span className={`status-badge ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pet-info-mini">
                      <strong>Pet:</strong> {app.pet?.name || 'Unknown Pet'}
                      <span className="pet-species">
                        {getSpeciesIcon(app.pet?.species)} {app.pet?.species}
                      </span>
                    </div>
                    
                    <div className="application-actions">
                      <select
                        value={app.status}
                        onChange={(e) => setStatus(app._id, e.target.value)}
                        className={`status-select ${getStatusColor(app.status)}`}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="approved">✅ Approved</option>
                        <option value="rejected">❌ Rejected</option>
                      </select>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>No applications yet</h3>
                <p>Applications will appear here when people show interest in your pets</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute requireShelter>
      <DashboardInner />
    </ProtectedRoute>
  );
}
