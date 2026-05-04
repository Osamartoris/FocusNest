import { useBookingsContext } from '../context/BookingsContext'

function MyBookings() {
  const { bookings, removeBooking } = useBookingsContext()

  return (
    <section className="page">
      <div className="container">
        <h1>My Bookings</h1>
        <p className="page-intro">A simple list of your saved room bookings.</p>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <h3>No bookings yet</h3>
            <p>Book a room from the Rooms page to see it here.</p>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <article key={booking.id} className="booking-item">
                <h3>{booking.roomName}</h3>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Time:</strong> {booking.time}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <button
                  type="button"
                  className="btn btn-text"
                  onClick={() => removeBooking(booking.id)}
                >
                  Cancel
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MyBookings
