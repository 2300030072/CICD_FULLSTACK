import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Pets from './pages/Pets'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (user) => setCurrentUser(user)
  const handleLogout = () => setCurrentUser(null)
  const handleUpdateProfile = (updatedUser) => setCurrentUser(updatedUser)

  return (
    <>
      <Header isLoggedIn={!!currentUser} currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} onUpdateProfile={handleUpdateProfile} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
