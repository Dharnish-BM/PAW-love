import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCheck, FaClock, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './ApplicationTracker.css';

export default function ApplicationTracker() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    if (user) {
      loadApplications();
    }
  }, [user]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/adoptions/my-applications');
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FaClock className="status-icon pending" />;
      case 'Contacted':
        return <FaPhone className="status-icon contacted" />;
      case 'Approved':
        return <FaCheck className="status-icon approved" />;
      case 'Rejected':
        return <FaTimes className="status-icon rejected" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffc107';
      case 'Contacted':
        return '#17a2b8';
      case 'Approved':
        return '#28a745';
      case 'Rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'Pending':
        return 'Your application is being reviewed by the shelter.';
      case 'Contacted':
        return 'The shelter has contacted you. Please check your messages.';
      case 'Approved':
        return 'Congratulations! Your application has been approved.';
      case 'Rejected':
        return 'Unfortunately, your application was not approved this time.';
      default:
        return 'Application status unknown.';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeSinceUpdate = (date) => {
    const now = new Date();
    const updateDate = new Date(date);
    const diffInHours = Math.floor((now - updateDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(date);
  };

  if (!user) {
    return (
      <div className="application-tracker">
        <div className="tracker-header">
          <h2>Application Tracker</h2>
          <p>Please log in to view your adoption applications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="application-tracker">
      <div className="tracker-header">
        <h2>My Adoption Applications</h2>
        <p>Track the status of your pet adoption applications</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Applications Yet</h3>
          <p>You haven't submitted any adoption applications yet.</p>
          <p>Browse our available pets to find your perfect companion!</p>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <motion.div
              key={application._id}
              className="application-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedApplication(application)}
            >
              <div className="application-header">
                <div className="pet-info">
                  <div className="pet-image">
                    {application.pet?.images?.[0] ? (
                      <img 
                        src={application.pet.images[0]} 
                        alt={application.pet.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="no-image" style={{ display: application.pet?.images?.[0] ? 'none' : 'flex' }}>
                      🐾
                    </div>
                  </div>
                  <div className="pet-details">
                    <h3>{application.pet?.name || 'Unknown Pet'}</h3>
                    <p>{application.pet?.breed || application.pet?.species || 'Pet Details'}</p>
                    <span className="application-date">
                      Applied on {formatDate(application.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="status-section">
                  <div 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(application.status) }}
                  >
                    {getStatusIcon(application.status)}
                    {application.status}
                  </div>
                  <span className="last-updated">
                    Updated {getTimeSinceUpdate(application.updatedAt)}
                  </span>
                </div>
              </div>

              <div className="application-preview">
                <p className="status-message">
                  {getStatusMessage(application.status)}
                </p>
                {application.notes && (
                  <p className="shelter-notes">
                    <strong>Shelter Note:</strong> {application.notes}
                  </p>
                )}
              </div>

              <div className="application-actions">
                <button className="view-details-btn">
                  View Details
                </button>
                {application.status === 'Contacted' && (
                  <button className="contact-shelter-btn">
                    <FaEnvelope />
                    Contact Shelter
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            className="application-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              className="application-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Application Details</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedApplication(null)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="modal-content">
                <div className="pet-section">
                  <div className="pet-image-large">
                    {selectedApplication.pet?.images?.[0] ? (
                      <img 
                        src={selectedApplication.pet.images[0]} 
                        alt={selectedApplication.pet.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="no-image-large" style={{ display: selectedApplication.pet?.images?.[0] ? 'none' : 'flex' }}>
                      🐾
                    </div>
                  </div>
                  <div className="pet-info-large">
                    <h3>{selectedApplication.pet?.name || 'Unknown Pet'}</h3>
                    <p><strong>Species:</strong> {selectedApplication.pet?.species || 'Unknown'}</p>
                    <p><strong>Breed:</strong> {selectedApplication.pet?.breed || 'Mixed'}</p>
                    <p><strong>Age:</strong> {selectedApplication.pet?.age || 'Unknown'} years</p>
                    <p><strong>Gender:</strong> {selectedApplication.pet?.gender || 'Unknown'}</p>
                  </div>
                </div>

                <div className="status-section-large">
                  <div 
                    className="status-badge-large"
                    style={{ backgroundColor: getStatusColor(selectedApplication.status) }}
                  >
                    {getStatusIcon(selectedApplication.status)}
                    {selectedApplication.status}
                  </div>
                  <p className="status-message-large">
                    {getStatusMessage(selectedApplication.status)}
                  </p>
                  {selectedApplication.notes && (
                    <div className="shelter-notes-large">
                      <h4>Shelter Notes:</h4>
                      <p>{selectedApplication.notes}</p>
                    </div>
                  )}
                </div>

                <div className="timeline-section">
                  <h4>Application Timeline</h4>
                  <div className="timeline">
                    <div className="timeline-item completed">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <h5>Application Submitted</h5>
                        <p>{formatDate(selectedApplication.createdAt)}</p>
                      </div>
                    </div>
                    
                    {selectedApplication.status !== 'Pending' && (
                      <div className="timeline-item completed">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h5>Under Review</h5>
                          <p>Application is being reviewed by shelter staff</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedApplication.status === 'Contacted' && (
                      <div className="timeline-item completed">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h5>Contacted by Shelter</h5>
                          <p>{formatDate(selectedApplication.updatedAt)}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedApplication.status === 'Approved' && (
                      <div className="timeline-item completed">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h5>Application Approved</h5>
                          <p>{formatDate(selectedApplication.updatedAt)}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedApplication.status === 'Rejected' && (
                      <div className="timeline-item completed">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h5>Application Decision</h5>
                          <p>{formatDate(selectedApplication.updatedAt)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="contact-section">
                  <h4>Contact Information</h4>
                  <p><strong>Shelter:</strong> {selectedApplication.pet?.postedBy?.name || 'Unknown Shelter'}</p>
                  <p><strong>Your Contact:</strong> {selectedApplication.applicant?.email || user.email}</p>
                  <p><strong>Phone:</strong> {selectedApplication.applicant?.phone || user.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </button>
                {selectedApplication.status === 'Contacted' && (
                  <button className="btn btn-primary">
                    <FaEnvelope />
                    Contact Shelter
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
