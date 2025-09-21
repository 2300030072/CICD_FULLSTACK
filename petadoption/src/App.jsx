import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Pets from './pages/Pets'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setCurrentUser(userData)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  const handleUpdateProfile = (updatedData) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedData
    }))
  }

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} onUpdateProfile={handleUpdateProfile} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App