import { useState } from 'react'

function Dashboard({ currentUser }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState([])

  // Same pet data as Pets page
  const pets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'dog',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'Male',
      size: 'Large',
      description: 'Friendly and energetic dog who loves playing fetch and swimming.',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
      location: 'New York, NY',
      vaccinated: true,
      trained: true
    },
    {
      id: 2,
      name: 'Luna',
      type: 'cat',
      breed: 'Siamese',
      age: 2,
      gender: 'Female',
      size: 'Medium',
      description: 'Calm and affectionate cat who loves sunbathing and gentle pets.',
      image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop',
      location: 'Los Angeles, CA',
      vaccinated: true,
      trained: false
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'dog',
      breed: 'Labrador Mix',
      age: 1,
      gender: 'Male',
      size: 'Medium',
      description: 'Playful puppy who loves meeting new people and learning tricks.',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
      location: 'Chicago, IL',
      vaccinated: true,
      trained: false
    },
    {
      id: 4,
      name: 'Whiskers',
      type: 'cat',
      breed: 'Maine Coon',
      age: 4,
      gender: 'Male',
      size: 'Large',
      description: 'Gentle giant who enjoys quiet environments and cozy naps.',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop',
      location: 'Seattle, WA',
      vaccinated: true,
      trained: true
    },
    {
      id: 5,
      name: 'Bella',
      type: 'dog',
      breed: 'Border Collie',
      age: 5,
      gender: 'Female',
      size: 'Medium',
      description: 'Intelligent and active dog perfect for families who love outdoor activities.',
      image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=300&fit=crop',
      location: 'Denver, CO',
      vaccinated: true,
      trained: true
    },
    {
      id: 6,
      name: 'Milo',
      type: 'rabbit',
      breed: 'Holland Lop',
      age: 1,
      gender: 'Male',
      size: 'Small',
      description: 'Adorable bunny who loves hay treats and hopping around in safe spaces.',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=300&fit=crop',
      location: 'Austin, TX',
      vaccinated: true,
      trained: false
    }
  ]

  const filteredPets = selectedCategory === 'all' 
    ? pets 
    : pets.filter(pet => pet.type === selectedCategory)

  const toggleFavorite = (petId) => {
    setFavorites(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    )
  }

  const handleAdopt = (petName) => {
    alert(`Adoption application started for ${petName}! In a real app, this would open a detailed adoption form with your information pre-filled.`)
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

      {/* Filter buttons */}
      <div className="pet-filters">
        <button 
          className={selectedCategory === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCategory('all')}
        >
          All Pets ({pets.length})
        </button>
        <button 
          className={selectedCategory === 'dog' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCategory('dog')}
        >
          Dogs ({pets.filter(p => p.type === 'dog').length})
        </button>
        <button 
          className={selectedCategory === 'cat' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCategory('cat')}
        >
          Cats ({pets.filter(p => p.type === 'cat').length})
        </button>
        <button 
          className={selectedCategory === 'rabbit' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCategory('rabbit')}
        >
          Small Pets ({pets.filter(p => p.type === 'rabbit').length})
        </button>
      </div>

      {/* Pets grid */}
      <div className="pets-grid">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-card dashboard-card">
            <div className="pet-image">
              <img src={pet.image} alt={pet.name} />
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
                <h3>{pet.name}</h3>
                <span className="pet-type">{pet.type === 'rabbit' ? '🐰' : pet.type === 'cat' ? '🐱' : '🐕'}</span>
              </div>
              
              <div className="pet-details">
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age} year{pet.age !== 1 ? 's' : ''}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Size:</strong> {pet.size}</p>
                <p><strong>Location:</strong> {pet.location}</p>
              </div>
              
              <p className="pet-description">{pet.description}</p>
              
              <button 
                className="btn btn-primary adopt-btn"
                onClick={() => handleAdopt(pet.name)}
              >
                Start Adoption Process
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="no-pets">
          <h3>No pets found</h3>
          <p>Try selecting a different category.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard