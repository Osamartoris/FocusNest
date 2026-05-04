import { Link, useParams } from 'react-router-dom'
import { useBookingsContext } from '../context/BookingsContext'

function Confirmation() {
  const { bookingId } = useParams()
  const { getBookingById } = useBookingsContext()

  const booking = getBookingById(bookingId)

  if (!booking) {
    return (
      <section className="page">
        <div className="container empty-state">
          <h2>Booking not found</h2>
          <Link to="/bookings" className="btn btn-primary">
            Go to My Bookings
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="container">
        <div className="details-card confirmation-card">
          <p className="success-mark">?</p>
          <h1>Booking Confirmed</h1>
          <p className="page-intro">Your study room reservation is now saved and ready.</p>

          <div className="confirmation-grid">
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>Room Name:</strong> {booking.roomName}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Duration:</strong> {booking.durationMinutes} minutes</p>
            <p><strong>Location:</strong> {booking.locationLabel}</p>
            <p><strong>Capacity:</strong> {booking.capacity} students</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Reminder:</strong> {booking.reminderLabel}</p>
          </div>

          <div className="card-actions center-actions">
            <Link to="/bookings" className="btn btn-primary">
              View My Bookings
            </Link>
            <Link to="/rooms" className="btn btn-outline">
              Book Another Room
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Confirmation

