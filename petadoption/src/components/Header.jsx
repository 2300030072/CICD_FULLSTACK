import { Link, useLocation } from 'react-router-dom'

function Header({ isLoggedIn, currentUser, onLogout }) {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🐾 PetAdopt</h1>
        </div>
        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
          <Link to="/pets" className={location.pathname === '/pets' ? 'nav-link active' : 'nav-link'}>Pets</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}>Dashboard</Link>
              <Link to="/profile" className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link'}>Profile</Link>
              <div className="user-menu">
                <span className="welcome-text">Welcome, {currentUser?.name || currentUser?.email}!</span>
                <button onClick={onLogout} className="logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}>Login</Link>
              <Link to="/register" className={location.pathname === '/register' ? 'nav-link active' : 'nav-link'}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
