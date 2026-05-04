import { Link } from 'react-router-dom'
import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import { useBookingsContext } from '../context/BookingsContext'

const durationOptions = [30, 60, 90, 120]

function MyBookings() {
  const { bookings, updateBooking, cancelBooking } = useBookingsContext()
  const [editingId, setEditingId] = useState(null)
  const [confirmCancelId, setConfirmCancelId] = useState(null)
  const [editForm, setEditForm] = useState({ date: '', time: '', durationMinutes: 60 })

  const startEdit = (booking) => {
    setEditingId(booking.id)
    setEditForm({
      date: booking.date,
      time: booking.time,
      durationMinutes: booking.durationMinutes,
    })
  }

  const handleSaveEdit = (bookingId) => {
    updateBooking(bookingId, {
      date: editForm.date,
      time: editForm.time,
      durationMinutes: Number(editForm.durationMinutes),
    })
    setEditingId(null)
  }

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId)
    setConfirmCancelId(null)
  }

  const activeBookings = bookings.filter((booking) => booking.status !== 'Cancelled')
  const cancelledBookings = bookings.filter((booking) => booking.status === 'Cancelled')

  return (
    <section className="page">
      <div className="container">
        <h1>My Bookings</h1>
        <p className="page-intro">Edit schedules, cancel if needed, and track reminder status.</p>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <h3>No bookings yet</h3>
            <p>Start by choosing a room that matches your team needs.</p>
            <Link className="btn btn-primary" to="/rooms">
              Browse Rooms
            </Link>
          </div>
        ) : (
          <>
            <div className="bookings-list">
              {activeBookings.map((booking) => (
                <article key={booking.id} className="booking-item">
                  <div className="booking-top">
                    <h3>{booking.roomName}</h3>
                    <StatusBadge status={booking.status} />
                  </div>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <p><strong>Duration:</strong> {booking.durationMinutes} minutes</p>
                  <p><strong>Location:</strong> {booking.locationLabel}</p>
                  <p><strong>Reminder:</strong> {booking.reminderLabel}</p>

                  {editingId === booking.id ? (
                    <div className="inline-edit-panel">
                      <label>
                        New Date
                        <input
                          type="date"
                          value={editForm.date}
                          onChange={(event) => setEditForm((prev) => ({ ...prev, date: event.target.value }))}
                        />
                      </label>
                      <label>
                        New Time
                        <input
                          type="text"
                          value={editForm.time}
                          onChange={(event) => setEditForm((prev) => ({ ...prev, time: event.target.value }))}
                          placeholder="e.g., 03:00 PM"
                        />
                      </label>
                      <label>
                        Duration
                        <select
                          value={editForm.durationMinutes}
                          onChange={(event) =>
                            setEditForm((prev) => ({ ...prev, durationMinutes: Number(event.target.value) }))
                          }
                        >
                          {durationOptions.map((minutes) => (
                            <option key={minutes} value={minutes}>{minutes} minutes</option>
                          ))}
                        </select>
                      </label>

                      <div className="card-actions">
                        <button type="button" className="btn btn-primary" onClick={() => handleSaveEdit(booking.id)}>
                          Save
                        </button>
                        <button type="button" className="btn btn-outline" onClick={() => setEditingId(null)}>
                          Close
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {confirmCancelId === booking.id ? (
                    <div className="cancel-confirm-box">
                      <p>Are you sure you want to cancel this booking?</p>
                      <div className="card-actions">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Confirm Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => setConfirmCancelId(null)}
                        >
                          Keep Booking
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="card-actions">
                    <button type="button" className="btn btn-outline" onClick={() => startEdit(booking)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-text"
                      onClick={() => setConfirmCancelId(booking.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {cancelledBookings.length > 0 ? (
              <div className="cancelled-section">
                <h3>Cancelled Bookings</h3>
                <div className="bookings-list">
                  {cancelledBookings.map((booking) => (
                    <article key={booking.id} className="booking-item subdued">
                      <div className="booking-top">
                        <h3>{booking.roomName}</h3>
                        <StatusBadge status={booking.status} />
                      </div>
                      <p><strong>Date:</strong> {booking.date}</p>
                      <p><strong>Time:</strong> {booking.time}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}

export default MyBookings

