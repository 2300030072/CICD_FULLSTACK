import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }

    // Mock login - no database check, just accept any credentials
    const userData = {
      email: formData.email,
      name: formData.email.split('@')[0], // Use part before @ as name
      loginTime: new Date().toLocaleString()
    }
    
    // Call the login function passed from App
    onLogin(userData)
    
    // Redirect to dashboard
    navigate('/dashboard')
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
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            Login
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