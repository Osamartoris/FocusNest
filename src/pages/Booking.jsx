import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBookingsContext } from '../context/BookingsContext'
import { rooms } from '../data/rooms'

const durationOptions = [30, 60, 90, 120]

function Booking() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { addBooking } = useBookingsContext()

  const room = useMemo(() => rooms.find((item) => String(item.id) === roomId), [roomId])

  const [date, setDate] = useState('')
  const [time, setTime] = useState(room?.availableSlots[0] || '')
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [groupName, setGroupName] = useState('')

  if (!room) {
    return (
      <section className="page">
        <div className="container empty-state">
          <h2>Room not found</h2>
          <Link to="/rooms" className="btn btn-primary">
            Back to Rooms
          </Link>
        </div>
      </section>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const createdBooking = addBooking({
      roomId: room.id,
      roomName: room.name,
      date,
      time,
      durationMinutes,
      groupName,
    })

    navigate(`/confirmation/${createdBooking.id}`)
  }

  const isDisabled = !date || !time || !groupName.trim()

  return (
    <section className="page">
      <div className="container">
        <h1>Book Room</h1>
        <p className="page-intro">Complete the basic form to reserve this room.</p>

        <div className="details-card">
          <p>
            <strong>Selected Room:</strong> {room.name}
          </p>
          <p>
            <strong>Location:</strong> {room.building} - {room.floor}
          </p>

          <form onSubmit={handleSubmit} className="booking-form">
            <label>
              Date
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
            </label>

            <label>
              Time
              <select value={time} onChange={(event) => setTime(event.target.value)} required>
                <option value="">Select a time</option>
                {room.availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Duration
              <select
                value={durationMinutes}
                onChange={(event) => setDurationMinutes(Number(event.target.value))}
              >
                {durationOptions.map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes} minutes
                  </option>
                ))}
              </select>
            </label>

            <label>
              Student / Group Name
              <input
                type="text"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder="e.g., Software Engineering Team"
                required
              />
            </label>

            <div className="card-actions">
              <button type="submit" className="btn btn-primary" disabled={isDisabled}>
                Confirm Booking
              </button>
              <Link to={`/rooms/${room.id}`} className="btn btn-outline">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Booking
