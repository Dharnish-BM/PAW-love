import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './PetDictionary.css';

export default function PetDictionary() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [featuredPets, setFeaturedPets] = useState([]);
  const [filters, setFilters] = useState({
    species: 'all',
    search: '',
    origin: 'all',
    size: 'all',
    energy: 'all',
    intelligence: 'all',
    isIndianBreed: false,
    isPopular: false,
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
    loadFeaturedPets();
  }, []);

  useEffect(() => {
    loadPets();
  }, [filters, currentPage]);

  const loadStats = async () => {
    try {
      const response = await axios.get('/dictionary/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadFeaturedPets = async () => {
    try {
      const response = await axios.get('/dictionary/featured?type=popular&limit=6');
      setFeaturedPets(response.data);
    } catch (error) {
      console.error('Error loading featured pets:', error);
    }
  };

  const loadPets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...filters,
        page: currentPage,
        limit: 12
      });
      
      const response = await axios.get(`/dictionary/pets?${params}`);
      setPets(response.data.pets);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error loading pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    
    switch (tab) {
      case 'indian':
        setFilters(prev => ({ ...prev, isIndianBreed: true, species: 'all' }));
        break;
      case 'popular':
        setFilters(prev => ({ ...prev, isPopular: true, species: 'all' }));
        break;
      case 'rare':
        setFilters(prev => ({ ...prev, isRare: true, species: 'all' }));
        break;
      default:
        setFilters(prev => ({ ...prev, isIndianBreed: false, isPopular: false, isRare: false }));
    }
  };

  const handlePetClick = (petId) => {
    navigate(`/dictionary/pet/${petId}`);
  };

  const speciesOptions = [
    { value: 'all', label: 'All Species', icon: '🐾' },
    { value: 'dog', label: 'Dogs', icon: '🐕' },
    { value: 'cat', label: 'Cats', icon: '🐱' },
    { value: 'bird', label: 'Birds', icon: '🐦' },
    { value: 'fish', label: 'Fish', icon: '🐠' },
    { value: 'rabbit', label: 'Rabbits', icon: '🐰' },
    { value: 'hamster', label: 'Hamsters', icon: '🐹' },
    { value: 'guinea-pig', label: 'Guinea Pigs', icon: '🐹' },
    { value: 'turtle', label: 'Turtles', icon: '🐢' },
    { value: 'snake', label: 'Snakes', icon: '🐍' },
    { value: 'lizard', label: 'Lizards', icon: '🦎' }
  ];

  const sizeOptions = [
    { value: 'all', label: 'All Sizes' },
    { value: 'tiny', label: 'Tiny' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'giant', label: 'Giant' }
  ];

  const energyOptions = [
    { value: 'all', label: 'All Energy Levels' },
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'high', label: 'High' },
    { value: 'very-high', label: 'Very High' }
  ];

  const intelligenceOptions = [
    { value: 'all', label: 'All Intelligence Levels' },
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'high', label: 'High' },
    { value: 'very-high', label: 'Very High' }
  ];

  const getCharacteristicColor = (level) => {
    const colors = {
      'low': '#ff6b6b',
      'moderate': '#ffa726',
      'high': '#66bb6a',
      'very-high': '#42a5f5',
      'very-easy': '#66bb6a',
      'easy': '#66bb6a',
      'difficult': '#ff6b6b',
      'quiet': '#66bb6a',
      'vocal': '#ffa726',
      'very-vocal': '#ff6b6b',
      'minimal': '#66bb6a',
      'heavy': '#ff6b6b'
    };
    return colors[level] || '#9e9e9e';
  };

  const getCharacteristicIcon = (type, level) => {
    const icons = {
      energy: {
        'low': '😴',
        'moderate': '😊',
        'high': '🏃',
        'very-high': '⚡'
      },
      intelligence: {
        'low': '🤔',
        'moderate': '🧠',
        'high': '🎓',
        'very-high': '🧠'
      },
      trainability: {
        'difficult': '😅',
        'moderate': '😐',
        'easy': '😊',
        'very-easy': '🎉'
      },
      social: {
        'independent': '🏠',
        'moderate': '👥',
        'social': '🤝',
        'very-social': '🎉'
      }
    };
    return icons[type]?.[level] || '❓';
  };

  return (
    <div className="pet-dictionary-page">
      {/* Header */}
      <div className="dictionary-header">
        <div className="dictionary-hero">
          <h1 className="dictionary-title">Pet Dictionary</h1>
          <p className="dictionary-subtitle">
            Discover the perfect companion! Learn about different breeds, their characteristics, and care requirements.
          </p>
        </div>
        
        {/* Stats */}
        {stats.overview && (
          <div className="dictionary-stats">
            <div className="stat-card">
              <div className="stat-number">{stats.overview.totalPets}</div>
              <div className="stat-label">Total Breeds</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.overview.indianBreeds}</div>
              <div className="stat-label">Indian Breeds</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.overview.popularBreeds}</div>
              <div className="stat-label">Popular Breeds</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.overview.rareBreeds}</div>
              <div className="stat-label">Rare Breeds</div>
            </div>
          </div>
        )}
      </div>

      <div className="dictionary-content">
        {/* Tabs */}
        <div className="dictionary-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabChange('all')}
          >
            <span className="tab-icon">🐾</span>
            All Breeds
          </button>
          <button 
            className={`tab-btn ${activeTab === 'indian' ? 'active' : ''}`}
            onClick={() => handleTabChange('indian')}
          >
            <span className="tab-icon">🇮🇳</span>
            Indian Breeds
          </button>
          <button 
            className={`tab-btn ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => handleTabChange('popular')}
          >
            <span className="tab-icon">⭐</span>
            Popular
          </button>
          <button 
            className={`tab-btn ${activeTab === 'rare' ? 'active' : ''}`}
            onClick={() => handleTabChange('rare')}
          >
            <span className="tab-icon">💎</span>
            Rare Breeds
          </button>
        </div>

        {/* Filters */}
        <div className="dictionary-filters">
          <div className="filter-header">
            <h3>Filter & Search</h3>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="filter-content">
              <div className="filter-row">
                <div className="filter-group">
                  <label>Species</label>
                  <select
                    value={filters.species}
                    onChange={(e) => handleFilterChange('species', e.target.value)}
                    className="filter-select"
                  >
                    {speciesOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Size</label>
                  <select
                    value={filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="filter-select"
                  >
                    {sizeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Energy Level</label>
                  <select
                    value={filters.energy}
                    onChange={(e) => handleFilterChange('energy', e.target.value)}
                    className="filter-select"
                  >
                    {energyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Intelligence</label>
                  <select
                    value={filters.intelligence}
                    onChange={(e) => handleFilterChange('intelligence', e.target.value)}
                    className="filter-select"
                  >
                    {intelligenceOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="filter-row">
                <div className="search-group">
                  <input
                    type="text"
                    placeholder="Search by name, breed, or origin..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>

                <div className="sort-group">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="sort-select"
                  >
                    <option value="name">Name</option>
                    <option value="breed">Breed</option>
                    <option value="origin">Origin</option>
                    <option value="size">Size</option>
                  </select>
                  
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                    className="sort-select"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pets Grid */}
        <div className="pets-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading pet breeds...</p>
            </div>
          ) : pets.length > 0 ? (
            <>
              <div className="pets-grid">
                {pets.map(pet => (
                  <div key={pet._id} className="pet-card" onClick={() => handlePetClick(pet._id)}>
                    <div className="pet-image">
                      {pet.images && pet.images.length > 0 ? (
                        <img 
                          src={pet.images.find(img => img.isPrimary)?.url || pet.images[0].url} 
                          alt={pet.name}
                        />
                      ) : (
                        <div className="pet-placeholder">
                          <span className="placeholder-icon">🐾</span>
                        </div>
                      )}
                      
                      {pet.isIndianBreed && (
                        <div className="indian-badge">🇮🇳</div>
                      )}
                      {pet.isPopular && (
                        <div className="popular-badge">⭐</div>
                      )}
                      {pet.isRare && (
                        <div className="rare-badge">💎</div>
                      )}
                    </div>

                    <div className="pet-info">
                      <h3 className="pet-name">{pet.name}</h3>
                      <p className="pet-breed">{pet.breed}</p>
                      <p className="pet-origin">{pet.origin}</p>
                      
                      <div className="pet-characteristics">
                        <div className="characteristic">
                          <span className="char-icon">
                            {getCharacteristicIcon('energy', pet.characteristics.energy)}
                          </span>
                          <span className="char-label">Energy</span>
                          <span 
                            className="char-value"
                            style={{ color: getCharacteristicColor(pet.characteristics.energy) }}
                          >
                            {pet.characteristics.energy}
                          </span>
                        </div>
                        
                        <div className="characteristic">
                          <span className="char-icon">
                            {getCharacteristicIcon('intelligence', pet.characteristics.intelligence)}
                          </span>
                          <span className="char-label">Intelligence</span>
                          <span 
                            className="char-value"
                            style={{ color: getCharacteristicColor(pet.characteristics.intelligence) }}
                          >
                            {pet.characteristics.intelligence}
                          </span>
                        </div>
                      </div>

                      <div className="pet-size">
                        <span className="size-label">Size:</span>
                        <span className="size-value">{pet.size}</span>
                        <span className="size-range">
                          {pet.weight.min}-{pet.weight.max} {pet.weight.unit}
                        </span>
                      </div>

                      {pet.tags && pet.tags.length > 0 && (
                        <div className="pet-tags">
                          {pet.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="pet-tag">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={!pagination.hasPrev}
                  >
                    Previous
                  </button>
                  
                  <span className="pagination-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-pets">
              <div className="no-pets-icon">🐾</div>
              <h3>No pets found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
