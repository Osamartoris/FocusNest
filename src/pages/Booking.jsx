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
  const [errors, setErrors] = useState({})

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

  const validateForm = () => {
    const nextErrors = {}

    if (!date) nextErrors.date = 'Please select a booking date.'
    if (!time) nextErrors.time = 'Please select a time slot.'
    if (!groupName.trim()) nextErrors.groupName = 'Please enter your student or group name.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const createdBooking = addBooking({
      roomId: room.id,
      roomName: room.name,
      date,
      time,
      durationMinutes,
      groupName,
      locationLabel: `${room.building} • ${room.floor} • ${room.roomNumber}`,
      capacity: room.capacity,
      reminderMinutes: 10,
      reminderLabel: 'Reminder set 10 minutes before booking ends',
    })

    navigate(`/confirmation/${createdBooking.id}`)
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Book Room</h1>
        <p className="page-intro">Finish the booking with a short and clear form.</p>

        <div className="booking-layout">
          <article className="details-card">
            <h3>Selected Room Summary</h3>
            <p><strong>Room:</strong> {room.name}</p>
            <p><strong>Location:</strong> {room.building} • {room.floor} • {room.roomNumber}</p>
            <p><strong>Capacity:</strong> {room.capacity} students</p>
            <p><strong>Status:</strong> {room.status}</p>
            <p><strong>Reminder:</strong> Reminder set 10 minutes before booking ends</p>
          </article>

          <article className="details-card">
            <form onSubmit={handleSubmit} className="booking-form">
              <label>
                Date
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                {errors.date ? <span className="field-error">{errors.date}</span> : null}
              </label>

              <label>
                Time
                <select value={time} onChange={(event) => setTime(event.target.value)}>
                  <option value="">Select a time</option>
                  {room.availableSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.time ? <span className="field-error">{errors.time}</span> : null}
              </label>

              <label>
                Duration
                <select
                  value={durationMinutes}
                  onChange={(event) => setDurationMinutes(Number(event.target.value))}
                >
                  {durationOptions.map((minutes) => (
                    <option key={minutes} value={minutes}>{minutes} minutes</option>
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
                />
                {errors.groupName ? <span className="field-error">{errors.groupName}</span> : null}
              </label>

              <div className="booking-preview">
                <h3>Booking Preview</h3>
                <p><strong>Date:</strong> {date || 'Not selected'}</p>
                <p><strong>Time:</strong> {time || 'Not selected'}</p>
                <p><strong>Duration:</strong> {durationMinutes} minutes</p>
                <p><strong>Group:</strong> {groupName || 'Not entered'}</p>
              </div>

              <div className="card-actions">
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
                <Link to={`/rooms/${room.id}`} className="btn btn-outline">Back</Link>
              </div>
            </form>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Booking

