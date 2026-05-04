import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="brand">FocusNest</p>
          <p className="subtitle">A Smart Study Room Booking System</p>
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
      </div>
    </header>
  )
}

export default Header
