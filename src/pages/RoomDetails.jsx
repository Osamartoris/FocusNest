import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { rooms } from '../data/rooms'

function RoomDetails() {
  const { roomId } = useParams()
  const room = rooms.find((item) => String(item.id) === roomId)

  if (!room) {
    return (
      <section className="page">
        <div className="container empty-state">
          <h2>Room not found</h2>
          <p>The room may have been removed from this prototype data.</p>
          <Link to="/rooms" className="btn btn-primary">
            Back to Rooms
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="container">
        <h1>{room.name}</h1>
        <p className="page-intro">Basic room details for this early prototype version.</p>

        <div className="details-card">
          <p>
            <strong>Location:</strong> {room.building} - {room.floor} ({room.roomNumber})
          </p>
          <p>
            <strong>Capacity:</strong> {room.capacity} students
          </p>
          <p>
            <strong>Facilities:</strong> {room.facilities.join(', ')}
          </p>
          <p>
            <strong>Status:</strong> <StatusBadge status={room.status} />
          </p>
          <p>
            <strong>Description:</strong> {room.description}
          </p>

          <div>
            <strong>Available Time Slots:</strong>
            {room.availableSlots.length === 0 ? (
              <p className="muted">No slots listed right now.</p>
            ) : (
              <ul className="slots-list">
                {room.availableSlots.map((slot) => (
                  <li key={slot}>{slot}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-actions">
            <Link to={`/book/${room.id}`} className="btn btn-primary">
              Book Room
            </Link>
            <Link to="/rooms" className="btn btn-outline">
              Back to Rooms
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoomDetails
