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
          <h1>Booking Confirmed.</h1>
          <p className="page-intro">Your room request has been saved.</p>

          <p>
            <strong>Room:</strong> {booking.roomName}
          </p>
          <p>
            <strong>Date:</strong> {booking.date}
          </p>
          <p>
            <strong>Time:</strong> {booking.time}
          </p>
          <p>
            <strong>Duration:</strong> {booking.durationMinutes} minutes
          </p>
          <p>
            <strong>Booked By:</strong> {booking.groupName}
          </p>

          <div className="card-actions">
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
            <Link to="/bookings" className="btn btn-primary">
              View My Bookings
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Confirmation
