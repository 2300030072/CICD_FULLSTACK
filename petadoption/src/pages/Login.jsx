import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value.trim() // Remove whitespace that might cause issues
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      console.log('Attempting login with email:', formData.email)
      
      const res = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(), // Ensure email is lowercase
          password: formData.password
        })
      })

      console.log('Login response status:', res.status)

      if (res.status === 401) {
        alert('Invalid email or password. Please check your credentials.')
        return
      }

      if (!res.ok) {
        const errorData = await res.text()
        console.error('Login failed:', errorData)
        alert('Login failed. Please try again.')
        return
      }

      const user = await res.json()
      console.log('Login successful, user data:', user)
      
      // Store user data in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user))
      
      alert(`Welcome back, ${user.name || user.email}!`)
      
      // Update the global state with user data
      onLogin(user)
      
      // Navigate to dashboard
      navigate('/dashboard')
      
    } catch (err) {
      console.error('Login error:', err)
      alert('Error during login. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="form-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login