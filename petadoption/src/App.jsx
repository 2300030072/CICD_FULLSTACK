import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Pets from './pages/Pets'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setCurrentUser(user)
      } catch (err) {
        console.error('Error parsing saved user:', err)
        localStorage.removeItem('currentUser')
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  const handleLogin = (user) => {
    setCurrentUser(user)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    navigate('/')
  }

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser) // updates user info globally and in localStorage
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px' }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      <Header 
        isLoggedIn={!!currentUser} 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
        <Route 
          path="/profile" 
          element={<Profile currentUser={currentUser} onUpdateProfile={handleUpdateProfile} />} 
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
