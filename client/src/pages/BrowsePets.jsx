import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCat, FaDog, FaFilter, FaMars, FaMinus, FaQuestion, FaSearch, FaVenus } from 'react-icons/fa';
import api from '../api/axios';
import PetCard from '../components/PetCard';
import './BrowsePets.css';

export default function BrowsePets({ globalQuery = '' }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ species: '', gender: '', size: '' });
  const [q, setQ] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const load = async () => {
    setLoading(true);
    const params = { q: globalQuery || q, ...filters };
    try {
      const { data } = await api.get('/pets', { params });
      setPets(data);
    } catch (error) {
      console.error('Error loading pets:', error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [globalQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ species: '', gender: '', size: '' });
    setQ('');
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

  return (
    <div className="browse-pets">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="browse-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Find Your Perfect Companion</h1>
          <p>Browse through our adorable pets looking for loving homes</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="search-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="search-section">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && load()}
                className="search-input"
              />
            </div>
            <button onClick={load} className="search-btn">
              <FaSearch />
              Search
            </button>
          </div>

          <div className="filters-section">
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
              {Object.values(filters).some(f => f) && (
                <span className="filter-badge">
                  {Object.values(filters).filter(f => f).length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="filters-panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="filter-group">
                    <label className="filter-label">
                      <FaDog />
                      Species
                    </label>
                    <select
                      value={filters.species}
                      onChange={(e) => handleFilterChange('species', e.target.value)}
                      className="filter-select"
                    >
                      <option value="">All Species</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">
                      <FaMars />
                      Gender
                    </label>
                    <select
                      value={filters.gender}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                      className="filter-select"
                    >
                      <option value="">Any Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">
                      <FaMinus />
                      Size
                    </label>
                    <select
                      value={filters.size}
                      onChange={(e) => handleFilterChange('size', e.target.value)}
                      className="filter-select"
                    >
                      <option value="">Any Size</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <button onClick={clearFilters} className="clear-filters-btn">
                    Clear All
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results Count */}
        {!loading && (
          <motion.div 
            className="results-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="count-number">{pets.length}</span> pets found
            {Object.values(filters).some(f => f) && (
              <span className="filter-info">
                with your filters
              </span>
            )}
          </motion.div>
        )}

        {/* Pets Grid */}
        <div className="pets-grid">
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingSkeleton />
            ) : pets.length > 0 ? (
              pets.map((pet, index) => (
                <motion.div
                  key={pet._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <PetCard pet={pet} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="no-results-icon">🐾</div>
                <h3>No pets found</h3>
                <p>Try adjusting your search criteria or check back later for new arrivals.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="skeleton-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-button"></div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
