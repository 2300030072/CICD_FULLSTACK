import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile({ currentUser, onUpdateProfile }) {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetchingUser, setFetchingUser] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
    petPreference: 'any',
    experience: 'beginner'
  })

  const updateFormFromUser = (user) => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        bio: user.bio || '',
        petPreference: user.petPreference || 'any',
        experience: user.experience || 'beginner'
      })
    }
  }

  // Initial redirect check
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false)
      if (!currentUser) navigate('/login')
    }, 100)
    return () => clearTimeout(timer)
  }, [currentUser, navigate])

  // Update formData whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      updateFormFromUser(currentUser)
    }
  }, [currentUser])

  // Fetch latest user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser?.id) return
      setFetchingUser(true)
      try {
        const res = await fetch(`${apiUrl}/users/${currentUser.id}`)
        if (res.ok) {
          const freshUser = await res.json()
          updateFormFromUser(freshUser)
          onUpdateProfile(freshUser) // update global
        }
      } catch (err) {
        console.error('Error fetching updated user:', err)
      } finally {
        setFetchingUser(false)
      }
    }
    if (currentUser?.id && !initialLoad) {
      fetchUser()
    }
  }, [apiUrl, currentUser?.id, initialLoad, onUpdateProfile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const errData = await res.text()
        alert(`Update failed: ${errData}`)
        return
      }

      const updatedUser = await res.json()

      // ✅ update global + persist in localStorage
      onUpdateProfile(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // ✅ update local form state
      updateFormFromUser(updatedUser)

      setIsEditing(false)
      alert('Profile updated successfully!')
    } catch (err) {
      alert('Profile update failed! Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    updateFormFromUser(currentUser)
    setIsEditing(false)
  }

  if (initialLoad) return <p>Loading...</p>
  if (!currentUser) return null
  if (fetchingUser && !formData.email) return <p>Loading profile...</p>

  return (
    <div className="page-container">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {(formData.name || formData.email || 'U').charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-info">
            <h1>{formData.name || 'Pet Lover'}</h1>
            <p className="profile-email">{formData.email}</p>
            {currentUser.role === 'ADMIN' && (
              <p className="admin-badge">Admin</p>
            )}
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn btn-secondary" onClick={handleCancel} disabled={loading}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
            {currentUser.role === 'ADMIN' && !isEditing && (
              <button className="btn btn-warning" onClick={() => navigate('/admin-dashboard')}>
                Go to Admin Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="profile-content">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              {[
                { field: 'name', label: 'Name', type: 'text' },
                { field: 'email', label: 'Email', type: 'email' },
                { field: 'phone', label: 'Phone', type: 'tel' },
                { field: 'address', label: 'Address', type: 'text' },
                { field: 'city', label: 'City', type: 'text' },
                { field: 'state', label: 'State', type: 'text' },
                { field: 'zipCode', label: 'Zip Code', type: 'text' }
              ].map(({ field, label, type }) => (
                <div className="info-item" key={field}>
                  <label>{label}:</label>
                  {isEditing ? (
                    <input
                      type={type}
                      name={field}
                      value={formData[field] || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{formData[field] || 'Not provided'}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pet Preferences */}
          <div className="profile-section">
            <h3>Pet Preferences</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Preferred Pet:</label>
                {isEditing ? (
                  <select name="petPreference" value={formData.petPreference} onChange={handleChange}>
                    <option value="any">Any</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="small">Small Pets</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                  </select>
                ) : (
                  <span>{formData.petPreference || 'Any'}</span>
                )}
              </div>
              <div className="info-item">
                <label>Experience:</label>
                {isEditing ? (
                  <select name="experience" value={formData.experience} onChange={handleChange}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                ) : (
                  <span>{formData.experience || 'Beginner'}</span>
                )}
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="profile-section">
            <h3>About Me</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p>{formData.bio || 'No bio provided yet.'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
