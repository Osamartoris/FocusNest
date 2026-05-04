import { NavLink } from 'react-router-dom'

function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="brand">FocusNest</p>
          <p className="subtitle">Smart Study Room Booking for University Students</p>
        </div>

        <nav className="nav-links" aria-label="Main Navigation">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/rooms" className="nav-link">
            Rooms
          </NavLink>
          <NavLink to="/bookings" className="nav-link">
            My Bookings
          </NavLink>
        </nav>

        <button type="button" className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  )
}

export default Header

