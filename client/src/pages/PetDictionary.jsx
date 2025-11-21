import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './PetDictionary.css';

export default function PetDictionary() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    loadPets();
  }, [search, currentPage]);

  const loadPets = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        search,
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

  const handlePetClick = (id) => navigate(`/dictionary/pet/${id}`);

  return (
    <div className="pet-dictionary-page">

      {/* Header */}
      <div className="dictionary-header">
        <h1>Pet Dictionary</h1>
        <p>Browse different breeds and learn essential characteristics.</p>
      </div>

      {/* Search */}
      <div className="dictionary-search">
        <input
          type="text"
          placeholder="Search by name, breed, species..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Pets Grid */}
      <div className="pets-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading breeds...</p>
          </div>
        ) : pets.length === 0 ? (
          <div className="no-pets">
            <div className="no-pets-icon">🐾</div>
            <h3>No results found</h3>
            <p>Try another search term.</p>
          </div>
        ) : (
          <div className="pets-grid">

            {pets.map(pet => {
              const primaryImage = pet.images?.find(img => img.isPrimary) || pet.images?.[0];

              return (
                <div 
                  key={pet._id} 
                  className="pet-dict-card" 
                  onClick={() => handlePetClick(pet._id)}
                >
                  <div className="pet-dict-image">
                    <img 
                      src={primaryImage?.url || "/placeholder.jpg"} 
                      alt={pet.name} 
                    />
                  </div>

                  <div className="pet-dict-info">
                    <h3>{pet.name}</h3>
                    <p className="pet-dict-breed">{pet.breed}</p>

                    <div className="pet-dict-meta">
                      <span>🐾 {pet.species}</span>
                      <span>🌍 {pet.origin}</span>
                      <span>📏 {pet.size}</span>
                    </div>

                    <div className="pet-dict-stats">
                      <div>
                        <strong>Energy:</strong> <span>{pet.characteristics.energy}</span>
                      </div>
                      <div>
                        <strong>Intelligence:</strong> <span>{pet.characteristics.intelligence}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* Pagination */}
        {pagination?.totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={!pagination.hasPrev}
            >
              ‹ Prev
            </button>

            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!pagination.hasNext}
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
