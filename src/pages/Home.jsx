import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import RoomCard from '../components/RoomCard'
import { useBookingsContext } from '../context/BookingsContext'
import { rooms } from '../data/rooms'

function Home() {
  const navigate = useNavigate()
  const { bookings } = useBookingsContext()
  const [quickSearch, setQuickSearch] = useState('')

  const statusCounts = useMemo(() => {
    return rooms.reduce(
      (counts, room) => {
        counts[room.status] += 1
        return counts
      },
      { Available: 0, Booked: 0, Maintenance: 0 },
    )
  }, [])

  const availableNowRooms = useMemo(
    () => rooms.filter((room) => room.status === 'Available').slice(0, 4),
    [],
  )

  const upcomingBooking = useMemo(() => {
    const activeBookings = bookings
      .filter((booking) => booking.status !== 'Cancelled')
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    return activeBookings[0]
  }, [bookings])

  const handleQuickSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()

    if (quickSearch.trim()) {
      params.set('q', quickSearch.trim())
    }

    navigate(`/rooms${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <section className="page">
      <div className="container home-layout">
        <div className="hero-panel">
          <h1>Find and book your best study space in minutes.</h1>
          <p className="page-intro">
            FocusNest now highlights available rooms first so you can decide faster.
          </p>

          <form className="quick-search" onSubmit={handleQuickSearch}>
            <input
              type="search"
              placeholder="Search rooms or buildings"
              value={quickSearch}
              onChange={(event) => setQuickSearch(event.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search Rooms
            </button>
          </form>
        </div>

        <aside className="upcoming-card">
          <h3>Upcoming Booking</h3>
          {upcomingBooking ? (
            <>
              <p className="strong">{upcomingBooking.roomName}</p>
              <p>{upcomingBooking.date} at {upcomingBooking.time}</p>
              <p>{upcomingBooking.reminderLabel}</p>
              <Link to="/bookings" className="btn btn-outline">
                Manage Booking
              </Link>
            </>
          ) : (
            <>
              <p>No upcoming booking yet.</p>
              <Link to="/rooms" className="btn btn-outline">
                Browse Rooms
              </Link>
            </>
          )}
        </aside>

        <div className="stats-grid">
          <article className="stat-card">
            <p>Available Rooms</p>
            <h3>{statusCounts.Available}</h3>
          </article>
          <article className="stat-card">
            <p>Booked Rooms</p>
            <h3>{statusCounts.Booked}</h3>
          </article>
          <article className="stat-card">
            <p>Maintenance Rooms</p>
            <h3>{statusCounts.Maintenance}</h3>
          </article>
        </div>

        <div className="section-header">
          <h2>Available Now</h2>
        </div>

        <div className="rooms-grid">
          {availableNowRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home

