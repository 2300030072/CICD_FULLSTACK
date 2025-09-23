import { useState, useEffect } from 'react'

function Dashboard({ currentUser }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

  // Fetch pets from backend
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${apiUrl}/pets`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        setPets(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Error fetching pets:', err)
        setError('Failed to load pets. Make sure backend is running on http://localhost:8080')
        setPets([])
      } finally {
        setLoading(false)
      }
    }

    if (currentUser) fetchPets()
    else setLoading(false)
  }, [apiUrl, currentUser]) // dependency ensures reload if currentUser changes

  const filteredPets = selectedCategory === 'all'
    ? pets
    : pets.filter(pet => pet.type?.toLowerCase() === selectedCategory.toLowerCase())

  const toggleFavorite = (petId) => {
    setFavorites(prev =>
      prev.includes(petId) ? prev.filter(id => id !== petId) : [...prev, petId]
    )
  }

  const handleAdopt = (petName) => {
    alert(`Adoption application started for ${petName}!`)
  }

  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="dashboard-container">
          <h2>Please log in to access your dashboard</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard, {currentUser.name}!</h1>
        <p>Browse and adopt your perfect companion</p>

        {/* User Stats */}
        <div className="user-stats">
          <div className="stat">
            <span className="stat-number">{favorites.length}</span>
            <span className="stat-label">Favorites</span>
          </div>
          <div className="stat">
            <span className="stat-number">{pets.length}</span>
            <span className="stat-label">Available Pets</span>
          </div>
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">Applications</span>
          </div>
        </div>
      </div>

      {/* Pets grid */}
      {!loading && !error && (
        <div className="pets-grid">
          {filteredPets.map(pet => (
            <div key={pet.id} className="pet-card dashboard-card">
              <div className="pet-image">
                <img
                  src={pet.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                  alt={pet.name || 'Pet'}
                  onError={e => e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'}
                />
                <div className="pet-badges">
                  {pet.vaccinated && <span className="badge vaccinated">Vaccinated</span>}
                  {pet.trained && <span className="badge trained">Trained</span>}
                </div>
                <button
                  className={`favorite-btn ${favorites.includes(pet.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(pet.id)}
                >
                  {favorites.includes(pet.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="pet-info">
                <div className="pet-header">
                  <h3>{pet.name || 'Unnamed Pet'}</h3>
                  <span className="pet-type">
                    {pet.type === 'rabbit' ? '🐰' : pet.type === 'cat' ? '🐱' : '🐕'}
                  </span>
                </div>
                <div className="pet-details">
                  <p><strong>Breed:</strong> {pet.breed || 'Mixed'}</p>
                  <p><strong>Age:</strong> {pet.age || 0} year{pet.age !== 1 ? 's' : ''}</p>
                  <p><strong>Gender:</strong> {pet.gender || 'Unknown'}</p>
                  <p><strong>Size:</strong> {pet.size || 'Medium'}</p>
                  <p><strong>Location:</strong> {pet.location || 'Unknown'}</p>
                </div>
                <p className="pet-description">{pet.description || 'No description available.'}</p>
                <button className="btn btn-primary adopt-btn" onClick={() => handleAdopt(pet.name)}>Start Adoption Process</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No pets */}
      {!loading && !error && pets.length === 0 && (
        <div className="no-pets">
          <h3>No pets available</h3>
          {currentUser.role === 'ADMIN' && <p>Admin: You can add pets through the admin panel.</p>}
        </div>
      )}
    </div>
  )
}

export default Dashboard
