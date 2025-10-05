import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaCat,
    FaCheck,
    FaDog,
    FaEdit,
    FaEnvelope,
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
    listingType: 'adoption',
    price: '',
    isNegotiable: true,
    currency: 'USD',
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
        api.get('/adoptions/mypets')
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
    
    // Check total number of images limit
    const currentCount = imageFiles.length;
    const newCount = currentCount + files.length;
    
    if (newCount > 5) {
      alert(`Maximum 5 images allowed. You currently have ${currentCount} images and are trying to add ${files.length} more.`);
      return;
    }
    
    // Validate file sizes and types
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`File ${file.name} is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 10MB.`);
        return false;
      }
      
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image. Please select image files only.`);
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setImageFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeImage = (index) => {
    console.log('Removing image at index:', index);
    setImageFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      console.log('New files array:', newFiles);
      return newFiles;
    });
  };

  // Compress image function
  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];
    
    setUploading(true);
    try {
      // Compress and convert uploaded files to data URLs
      const uploadedUrls = await Promise.all(
        imageFiles.map(async (file) => {
          // Check file size first
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            console.warn(`File ${file.name} is too large (${(file.size / 1024 / 1024).toFixed(2)}MB), compressing...`);
          }
          
          // Compress the image
          const compressedDataUrl = await compressImage(file, 800, 0.7);
          console.log(`Compressed ${file.name}: ${(compressedDataUrl.length / 1024).toFixed(2)}KB`);
          return compressedDataUrl;
        })
      );
      
      console.log('Generated compressed image data URLs');
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
      
      // Log the first image URL to verify it's a data URL
      if (payload.images.length > 0) {
        console.log('First image URL type:', payload.images[0].substring(0, 50) + '...');
        console.log('Is data URL:', payload.images[0].startsWith('data:image/'));
        console.log('Total payload size:', JSON.stringify(payload).length / 1024, 'KB');
      }
      
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
        listingType: 'adoption',
        price: '',
        isNegotiable: true,
        currency: 'USD',
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
      listingType: pet.listingType || 'adoption',
      price: pet.price || '',
      isNegotiable: pet.isNegotiable !== undefined ? pet.isNegotiable : true,
      currency: pet.currency || 'USD',
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

  const setStatus = async (id, status, notes = '') => {
    try {
      await api.put(`/adoptions/${id}`, { status, notes });
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

  const getAgeText = (age) => {
    if (!age) return 'Age unknown';
    if (age < 1) return `${Math.round(age * 12)} months`;
    if (age === 1) return '1 year';
    return `${age} years`;
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
                        listingType: 'adoption',
                        price: '',
                        isNegotiable: true,
                        currency: 'USD',
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
                      <label>Listing Type *</label>
                      <select
                        value={form.listingType}
                        onChange={(e) => setForm({...form, listingType: e.target.value})}
                        required
                      >
                        <option value="adoption">🆓 Free Adoption</option>
                        <option value="sale">💰 For Sale</option>
                      </select>
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

                  {/* Pricing Section - Only for Sale Listings */}
                  {form.listingType === 'sale' && (
                    <>
                      <div className="form-section-header">
                        <h3>💰 Pricing Information</h3>
                      </div>
                      
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Price *</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.price}
                            onChange={(e) => setForm({...form, price: e.target.value})}
                            placeholder="Enter price"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Currency</label>
                          <select
                            value={form.currency}
                            onChange={(e) => setForm({...form, currency: e.target.value})}
                          >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="CAD">CAD (C$)</option>
                            <option value="AUD">AUD (A$)</option>
                          </select>
                        </div>

                        <div className="form-group full-width">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={form.isNegotiable}
                              onChange={(e) => setForm({...form, isNegotiable: e.target.checked})}
                            />
                            <span className="checkbox-custom"></span>
                            Price is negotiable
                          </label>
                        </div>
                      </div>
                    </>
                  )}

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
                        <p className="upload-hint">Max 5 images, 10MB per file, will be compressed automatically</p>
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
                          {uploading && (
                            <div className="uploading-indicator">
                              <span>Compressing images...</span>
                            </div>
                          )}
                          <div className="preview-grid">
                            {imageFiles.map((file, index) => (
                              <div key={index} className="image-preview">
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={`Preview ${index + 1}`}
                                  onError={(e) => {
                                    console.log('Preview image failed to load for file:', file.name);
                                    e.target.style.display = 'none';
                                  }}
                                  onLoad={() => {
                                    console.log('Preview image loaded successfully for file:', file.name);
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
                                    e.target.style.display = 'none';
                                  }}
                                  onLoad={() => {
                                    console.log('Form image loaded successfully:', url);
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
                          listingType: 'adoption',
                          price: '',
                          isNegotiable: true,
                          currency: 'USD',
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
                    className={`pet-card dashboard-card ${pet.isAdopted ? 'adopted' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Card Image Container */}
                    <div className="pet-image-container">
                      <img
                        src={pet.images?.[0] || pet.imageUrls?.[0] || getDefaultPetImage(pet.species, pet.name)}
                        alt={pet.name}
                        className="pet-image"
                        onError={(e) => {
                          console.log('Dashboard image failed to load for:', pet.name, 'URL:', e.target.src);
                          e.target.src = getDefaultPetImage(pet.species, pet.name);
                        }}
                        onLoad={() => {
                          console.log('Dashboard image loaded successfully for:', pet.name);
                        }}
                      />
                      
                      {/* Adopted Badge */}
                      {pet.isAdopted && <div className="adopted-badge">Adopted</div>}
                      
                      {/* Species Badge */}
                      <div className="species-badge">
                        {getSpeciesIcon(pet.species)}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="pet-content">
                      <div className="pet-header">
                        <h3 className="pet-name">{pet.name}</h3>
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
                      
                      <div className="pet-listing-info">
                        {pet.listingType === 'sale' ? (
                          <div className="price-display">
                            <span className="price-amount">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: pet.currency || 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(pet.price || 0)}
                            </span>
                            {pet.isNegotiable && (
                              <span className="negotiable-badge">💬 Negotiable</span>
                            )}
                          </div>
                        ) : (
                          <div className="adoption-badge">
                            <span className="adoption-text">🆓 Free Adoption</span>
                          </div>
                        )}
                      </div>
                      
                      {pet.description && (
                        <div className="pet-description">
                          <p>{pet.description.slice(0, 80)}...</p>
                        </div>
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
                        <option value="Pending">⏳ Pending</option>
                        <option value="Contacted">📞 Contacted</option>
                        <option value="Approved">✅ Approved</option>
                        <option value="Rejected">❌ Rejected</option>
                      </select>
                      {app.notes && (
                        <div className="application-notes">
                          <strong>Notes:</strong> {app.notes}
                        </div>
                      )}
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
