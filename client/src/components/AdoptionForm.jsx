import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheck, FaHome, FaMapMarkerAlt, FaPhone, FaTimes, FaUser } from 'react-icons/fa';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './AdoptionForm.css';

export default function AdoptionForm({ pet, onClose, onSuccess }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    // Personal Information
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    state: '',
    zipCode: '',
    
    // Living Situation
    livingSituation: '',
    homeType: '',
    hasYard: '',
    yardFenced: '',
    hasOtherPets: '',
    otherPetsDetails: '',
    hasChildren: '',
    childrenAges: '',
    
    // Experience & Care
    petExperience: '',
    dailyTimeAvailable: '',
    exercisePlan: '',
    veterinaryCare: '',
    emergencyPlan: '',
    
    // Adoption Specific
    adoptionReason: '',
    petNamePreference: '',
    specialNeeds: '',
    additionalInfo: '',
    
    // References
    reference1Name: '',
    reference1Phone: '',
    reference1Relationship: '',
    reference2Name: '',
    reference2Phone: '',
    reference2Relationship: '',
    
    // Agreement
    agreeToTerms: false,
    agreeToHomeVisit: false,
    agreeToFollowUp: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Personal Information
        if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!form.address.trim()) newErrors.address = 'Address is required';
        if (!form.city.trim()) newErrors.city = 'City is required';
        if (!form.state.trim()) newErrors.state = 'State is required';
        if (!form.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        break;
        
      case 2: // Living Situation
        if (!form.livingSituation) newErrors.livingSituation = 'Please select your living situation';
        if (!form.homeType) newErrors.homeType = 'Please select your home type';
        if (!form.hasYard) newErrors.hasYard = 'Please specify if you have a yard';
        if (!form.hasOtherPets) newErrors.hasOtherPets = 'Please specify if you have other pets';
        if (!form.hasChildren) newErrors.hasChildren = 'Please specify if you have children';
        break;
        
      case 3: // Experience & Care
        if (!form.petExperience) newErrors.petExperience = 'Please describe your pet experience';
        if (!form.dailyTimeAvailable) newErrors.dailyTimeAvailable = 'Please specify daily time available';
        if (!form.exercisePlan) newErrors.exercisePlan = 'Please describe your exercise plan';
        if (!form.veterinaryCare) newErrors.veterinaryCare = 'Please describe your veterinary care plan';
        break;
        
      case 4: // Adoption Specific
        if (!form.adoptionReason) newErrors.adoptionReason = 'Please explain your reason for adoption';
        break;
        
      case 5: // References
        if (!form.reference1Name.trim()) newErrors.reference1Name = 'First reference name is required';
        if (!form.reference1Phone.trim()) newErrors.reference1Phone = 'First reference phone is required';
        if (!form.reference1Relationship.trim()) newErrors.reference1Relationship = 'First reference relationship is required';
        break;
        
      case 6: // Agreement
        if (!form.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        if (!form.agreeToHomeVisit) newErrors.agreeToHomeVisit = 'You must agree to a home visit';
        if (!form.agreeToFollowUp) newErrors.agreeToFollowUp = 'You must agree to follow-up contact';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Current step:', currentStep);
    console.log('Form data:', form);
    
    if (!validateStep(currentStep)) {
      console.log('Validation failed');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const applicationData = {
        pet: pet._id,
        applicant: {
          ...form,
          applicationDate: new Date().toISOString()
        }
      };
      
      console.log('Submitting application data:', applicationData);
      const response = await api.post('/adoptions/apply', applicationData);
      console.log('Application submitted successfully:', response.data);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      console.error('Error response:', error.response);
      setErrors({ submit: error.response?.data?.message || 'Failed to submit application' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <FaUser className="label-icon" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaUser className="label-icon" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaPhone className="label-icon" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group full-width">
                <label>
                  <FaHome className="label-icon" />
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="Enter your street address"
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaMapMarkerAlt className="label-icon" />
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                  placeholder="Enter your city"
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaMapMarkerAlt className="label-icon" />
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={errors.state ? 'error' : ''}
                  placeholder="Enter your state"
                />
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaMapMarkerAlt className="label-icon" />
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleChange}
                  className={errors.zipCode ? 'error' : ''}
                  placeholder="Enter your ZIP code"
                />
                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h3>Living Situation</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Living Situation *</label>
                <select
                  name="livingSituation"
                  value={form.livingSituation}
                  onChange={handleChange}
                  className={errors.livingSituation ? 'error' : ''}
                >
                  <option value="">Select your living situation</option>
                  <option value="own">I own my home</option>
                  <option value="rent">I rent my home</option>
                  <option value="live_with_family">I live with family</option>
                  <option value="other">Other</option>
                </select>
                {errors.livingSituation && <span className="error-text">{errors.livingSituation}</span>}
              </div>

              <div className="form-group">
                <label>Home Type *</label>
                <select
                  name="homeType"
                  value={form.homeType}
                  onChange={handleChange}
                  className={errors.homeType ? 'error' : ''}
                >
                  <option value="">Select your home type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="mobile_home">Mobile Home</option>
                </select>
                {errors.homeType && <span className="error-text">{errors.homeType}</span>}
              </div>

              <div className="form-group">
                <label>Do you have a yard? *</label>
                <select
                  name="hasYard"
                  value={form.hasYard}
                  onChange={handleChange}
                  className={errors.hasYard ? 'error' : ''}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.hasYard && <span className="error-text">{errors.hasYard}</span>}
              </div>

              {form.hasYard === 'yes' && (
                <div className="form-group">
                  <label>Is the yard fenced?</label>
                  <select
                    name="yardFenced"
                    value={form.yardFenced}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes, fully fenced</option>
                    <option value="partially">Partially fenced</option>
                    <option value="no">No, not fenced</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Do you have other pets? *</label>
                <select
                  name="hasOtherPets"
                  value={form.hasOtherPets}
                  onChange={handleChange}
                  className={errors.hasOtherPets ? 'error' : ''}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.hasOtherPets && <span className="error-text">{errors.hasOtherPets}</span>}
              </div>

              {form.hasOtherPets === 'yes' && (
                <div className="form-group full-width">
                  <label>Please describe your other pets</label>
                  <textarea
                    name="otherPetsDetails"
                    value={form.otherPetsDetails}
                    onChange={handleChange}
                    placeholder="Include species, breeds, ages, and temperaments"
                    rows="3"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Do you have children? *</label>
                <select
                  name="hasChildren"
                  value={form.hasChildren}
                  onChange={handleChange}
                  className={errors.hasChildren ? 'error' : ''}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.hasChildren && <span className="error-text">{errors.hasChildren}</span>}
              </div>

              {form.hasChildren === 'yes' && (
                <div className="form-group">
                  <label>Children's ages</label>
                  <input
                    type="text"
                    name="childrenAges"
                    value={form.childrenAges}
                    onChange={handleChange}
                    placeholder="e.g., 5, 8, 12"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h3>Experience & Care</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Pet Experience *</label>
                <textarea
                  name="petExperience"
                  value={form.petExperience}
                  onChange={handleChange}
                  className={errors.petExperience ? 'error' : ''}
                  placeholder="Describe your experience with pets, including types of pets you've owned and for how long"
                  rows="4"
                />
                {errors.petExperience && <span className="error-text">{errors.petExperience}</span>}
              </div>

              <div className="form-group">
                <label>Daily Time Available *</label>
                <select
                  name="dailyTimeAvailable"
                  value={form.dailyTimeAvailable}
                  onChange={handleChange}
                  className={errors.dailyTimeAvailable ? 'error' : ''}
                >
                  <option value="">Select an option</option>
                  <option value="1-2_hours">1-2 hours</option>
                  <option value="3-4_hours">3-4 hours</option>
                  <option value="5-6_hours">5-6 hours</option>
                  <option value="7+_hours">7+ hours</option>
                  <option value="work_from_home">I work from home</option>
                </select>
                {errors.dailyTimeAvailable && <span className="error-text">{errors.dailyTimeAvailable}</span>}
              </div>

              <div className="form-group full-width">
                <label>Exercise Plan *</label>
                <textarea
                  name="exercisePlan"
                  value={form.exercisePlan}
                  onChange={handleChange}
                  className={errors.exercisePlan ? 'error' : ''}
                  placeholder="How will you ensure this pet gets adequate exercise? Include walking schedule, playtime, etc."
                  rows="3"
                />
                {errors.exercisePlan && <span className="error-text">{errors.exercisePlan}</span>}
              </div>

              <div className="form-group full-width">
                <label>Veterinary Care Plan *</label>
                <textarea
                  name="veterinaryCare"
                  value={form.veterinaryCare}
                  onChange={handleChange}
                  className={errors.veterinaryCare ? 'error' : ''}
                  placeholder="How will you provide veterinary care? Do you have a preferred veterinarian?"
                  rows="3"
                />
                {errors.veterinaryCare && <span className="error-text">{errors.veterinaryCare}</span>}
              </div>

              <div className="form-group full-width">
                <label>Emergency Plan</label>
                <textarea
                  name="emergencyPlan"
                  value={form.emergencyPlan}
                  onChange={handleChange}
                  placeholder="What would you do if you could no longer care for this pet?"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h3>Adoption Specific</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Reason for Adoption *</label>
                <textarea
                  name="adoptionReason"
                  value={form.adoptionReason}
                  onChange={handleChange}
                  className={errors.adoptionReason ? 'error' : ''}
                  placeholder="Why do you want to adopt this specific pet? What draws you to them?"
                  rows="4"
                />
                {errors.adoptionReason && <span className="error-text">{errors.adoptionReason}</span>}
              </div>

              <div className="form-group">
                <label>Preferred Pet Name</label>
                <input
                  type="text"
                  name="petNamePreference"
                  value={form.petNamePreference}
                  onChange={handleChange}
                  placeholder="What would you like to name this pet?"
                />
              </div>

              <div className="form-group full-width">
                <label>Special Needs</label>
                <textarea
                  name="specialNeeds"
                  value={form.specialNeeds}
                  onChange={handleChange}
                  placeholder="Are you prepared to handle any special needs this pet might have?"
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label>Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={form.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any additional information you'd like to share with the shelter"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step">
            <h3>References</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Reference 1 - Name *</label>
                <input
                  type="text"
                  name="reference1Name"
                  value={form.reference1Name}
                  onChange={handleChange}
                  className={errors.reference1Name ? 'error' : ''}
                  placeholder="Full name"
                />
                {errors.reference1Name && <span className="error-text">{errors.reference1Name}</span>}
              </div>

              <div className="form-group">
                <label>Reference 1 - Phone *</label>
                <input
                  type="tel"
                  name="reference1Phone"
                  value={form.reference1Phone}
                  onChange={handleChange}
                  className={errors.reference1Phone ? 'error' : ''}
                  placeholder="Phone number"
                />
                {errors.reference1Phone && <span className="error-text">{errors.reference1Phone}</span>}
              </div>

              <div className="form-group">
                <label>Reference 1 - Relationship *</label>
                <input
                  type="text"
                  name="reference1Relationship"
                  value={form.reference1Relationship}
                  onChange={handleChange}
                  className={errors.reference1Relationship ? 'error' : ''}
                  placeholder="e.g., Friend, Family, Colleague"
                />
                {errors.reference1Relationship && <span className="error-text">{errors.reference1Relationship}</span>}
              </div>

              <div className="form-group">
                <label>Reference 2 - Name</label>
                <input
                  type="text"
                  name="reference2Name"
                  value={form.reference2Name}
                  onChange={handleChange}
                  placeholder="Full name"
                />
              </div>

              <div className="form-group">
                <label>Reference 2 - Phone</label>
                <input
                  type="tel"
                  name="reference2Phone"
                  value={form.reference2Phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </div>

              <div className="form-group">
                <label>Reference 2 - Relationship</label>
                <input
                  type="text"
                  name="reference2Relationship"
                  value={form.reference2Relationship}
                  onChange={handleChange}
                  placeholder="e.g., Friend, Family, Colleague"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="form-step">
            <h3>Agreement & Terms</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={form.agreeToTerms}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">
                      I agree to the <a href="#" target="_blank">Terms and Conditions</a> and <a href="#" target="_blank">Adoption Agreement</a> *
                    </span>
                  </label>
                  {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToHomeVisit"
                      checked={form.agreeToHomeVisit}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">
                      I agree to allow a home visit by shelter staff before adoption approval *
                    </span>
                  </label>
                  {errors.agreeToHomeVisit && <span className="error-text">{errors.agreeToHomeVisit}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToFollowUp"
                      checked={form.agreeToFollowUp}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">
                      I agree to follow-up contact from the shelter to ensure the pet's well-being *
                    </span>
                  </label>
                  {errors.agreeToFollowUp && <span className="error-text">{errors.agreeToFollowUp}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <div className="agreement-summary">
                  <h4>Adoption Summary</h4>
                  <p><strong>Pet:</strong> {pet.name}</p>
                  <p><strong>Applicant:</strong> {form.fullName}</p>
                  <p><strong>Application Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Status:</strong> Pending Review</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="adoption-form-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="adoption-form-modal"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="form-header">
            <div className="form-title">
              <h2>Adoption Application</h2>
              <p>Adopting {pet.name}</p>
            </div>
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="form-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Step {currentStep} of {totalSteps}
            </div>
          </div>

          <div className="adoption-form-content">
            {/* Pet Details Section */}
            <div className="pet-details-section">
              <div className="pet-details-header">
                <h3>Pet Details</h3>
              </div>
              
              <div className="pet-image-container">
                <img 
                  src={pet.images?.[0] || "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                  alt={pet.name}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>
              
              <div className="pet-info-summary">
                <h4>{pet.name}</h4>
                <div className="pet-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Species</span>
                    <span className="detail-value">{pet.species}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Breed</span>
                    <span className="detail-value">{pet.breed || 'Mixed'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Age</span>
                    <span className="detail-value">{pet.age ? `${pet.age} years` : 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Gender</span>
                    <span className="detail-value">{pet.gender || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Size</span>
                    <span className="detail-value">{pet.size || 'Medium'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{pet.location || 'TBD'}</span>
                  </div>
                </div>
                
                {pet.description && (
                  <div className="pet-description">
                    <h5>About {pet.name}</h5>
                    <p>{pet.description}</p>
                  </div>
                )}
                
                {pet.medicalHistory && (
                  <div className="pet-medical">
                    <h5>Medical History</h5>
                    <p>{pet.medicalHistory}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
              <form onSubmit={handleSubmit} className="adoption-form">
                <div className="form-content">
                  {renderStep()}
                </div>

                {errors.submit && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {errors.submit}
                  </div>
                )}

                <div className="form-actions">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading-spinner"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FaCheck />
                          Submit Application
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
