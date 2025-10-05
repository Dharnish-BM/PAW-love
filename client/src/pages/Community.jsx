import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import './Community.css';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, [filters, currentPage]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...filters,
        page: currentPage,
        limit: 10
      });
      
      const response = await axios.get(`/community/posts?${params}`);
      setPosts(response.data.posts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleCreatePost = async (postData) => {
    try {
      const response = await axios.post('/community/posts', postData);
      setPosts(prev => [response.data, ...prev]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId, isLiked) => {
    try {
      const response = await axios.post(`/community/posts/${postId}/like`);
      setPosts(prev => prev.map(post => 
        post._id === postId 
          ? { ...post, likes: response.data.isLiked ? [...post.likes, user._id] : post.likes.filter(id => id !== user._id) }
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const categories = [
    { value: 'all', label: 'All Posts', icon: '📝' },
    { value: 'general', label: 'General', icon: '💬' },
    { value: 'adoption-stories', label: 'Adoption Stories', icon: '❤️' },
    { value: 'pet-care', label: 'Pet Care', icon: '🐾' },
    { value: 'questions', label: 'Questions', icon: '❓' },
    { value: 'reviews', label: 'Reviews', icon: '⭐' },
    { value: 'events', label: 'Events', icon: '📅' },
    { value: 'lost-found', label: 'Lost & Found', icon: '🔍' }
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatContent = (content) => {
    if (content.length > 200) {
      return content.substring(0, 200) + '...';
    }
    return content;
  };

  return (
    <div className="community-page">
      {/* Header */}
      <div className="community-header">
        <div className="community-hero">
          <h1 className="community-title">Community Hub</h1>
          <p className="community-subtitle">
            Connect with fellow pet lovers, share stories, and get advice from our amazing community!
          </p>
        </div>
        
        {user && (
          <button 
            className="btn btn-primary create-post-btn"
            onClick={() => setShowCreateForm(true)}
          >
            <span className="btn-icon">✍️</span>
            Create New Post
          </button>
        )}
      </div>

      <div className="community-content">
        {/* Filters */}
        <div className="community-filters">
          <div className="filter-section">
            <h3>Filter by Category</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`category-filter ${filters.category === category.value ? 'active' : ''}`}
                  onClick={() => handleFilterChange('category', category.value)}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Search & Sort</h3>
            <div className="search-sort-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
              
              <div className="sort-controls">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="sort-select"
                >
                  <option value="createdAt">Newest First</option>
                  <option value="viewCount">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                </select>
                
                <select
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                  className="sort-select"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="posts-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading community posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="posts-grid">
                {posts.map(post => (
                  <div key={post._id} className="post-card">
                    <div className="post-header">
                      <div className="post-author">
                        <div className="author-avatar">
                          {post.author.picture ? (
                            <img src={post.author.picture} alt={post.author.name} />
                          ) : (
                            <span className="author-icon">👤</span>
                          )}
                        </div>
                        <div className="author-info">
                          <h4 className="author-name">
                            {post.author.isShelter ? post.author.shelterName : post.author.name}
                          </h4>
                          <p className="author-type">
                            {post.author.isShelter ? '🏠 Shelter' : '👤 User'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="post-meta">
                        <span className="post-category">
                          {categories.find(cat => cat.value === post.category)?.icon} 
                          {categories.find(cat => cat.value === post.category)?.label}
                        </span>
                        <span className="post-date">{formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                    <div className="post-content">
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-text">{formatContent(post.content)}</p>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="post-tags">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="post-tag">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="post-actions">
                      <div className="post-stats">
                        <span className="stat-item">
                          <span className="stat-icon">👁️</span>
                          {post.viewCount} views
                        </span>
                        <span className="stat-item">
                          <span className="stat-icon">💬</span>
                          {post.comments?.length || 0} comments
                        </span>
                      </div>
                      
                      <div className="action-buttons">
                        <button 
                          className={`like-btn ${post.likes?.includes(user?._id) ? 'liked' : ''}`}
                          onClick={() => handleLikePost(post._id, post.likes?.includes(user?._id))}
                          disabled={!user}
                        >
                          <span className="like-icon">❤️</span>
                          {post.likes?.length || 0}
                        </button>
                        
                        <button 
                          className="view-btn"
                          onClick={() => navigate(`/community/post/${post._id}`)}
                        >
                          <span className="view-icon">👁️</span>
                          View Post
                        </button>
                      </div>
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
            <div className="no-posts">
              <div className="no-posts-icon">📝</div>
              <h3>No posts found</h3>
              <p>Be the first to start a conversation in our community!</p>
              {user && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create First Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateForm && (
        <CreatePostModal
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
}

// Create Post Modal Component
function CreatePostModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      await onSubmit({
        ...formData,
        tags
      });
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content create-post-modal">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="What's your post about?"
              required
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="general">💬 General</option>
              <option value="adoption-stories">❤️ Adoption Stories</option>
              <option value="pet-care">🐾 Pet Care</option>
              <option value="questions">❓ Questions</option>
              <option value="reviews">⭐ Reviews</option>
              <option value="events">📅 Events</option>
              <option value="lost-found">🔍 Lost & Found</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Share your thoughts, ask questions, or tell your story..."
              required
              rows={6}
              maxLength={5000}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (optional)</label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas (e.g., dog, training, advice)"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
