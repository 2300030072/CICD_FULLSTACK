import { useState, useEffect } from 'react'

function Pets() {
  const [pets, setPets] = useState([]) // <-- fetched from backend
  const [selectedCategory, setSelectedCategory] = useState('all')
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${apiUrl}/pets`)
      .then(res => res.json())
      .then(data => setPets(data))
      .catch(err => console.error('Error fetching pets:', err))
  }, [apiUrl])

  const filteredPets = selectedCategory === 'all' 
    ? pets 
    : pets.filter(pet => pet.type === selectedCategory)

  const handleAdopt = (petName) => {
    alert(`Thank you for your interest in adopting ${petName}! In a real app, this would redirect to an adoption application form.`)
  }

  return (
    <div className="page-container">
      <div className="pets-header">
        <h1>Find Your Perfect Companion</h1>
        <p>Browse our available pets and find your new best friend</p>
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
          <div key={pet.id} className="pet-card">
            <div className="pet-image">
              <img src={pet.image} alt={pet.name} />
              <div className="pet-badges">
                {pet.vaccinated && <span className="badge vaccinated">Vaccinated</span>}
                {pet.trained && <span className="badge trained">Trained</span>}
              </div>
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
                Adopt {pet.name}
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

export default Pets
