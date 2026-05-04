import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className="room-preview">
        <span className="room-chip">{room.roomType}</span>
        {room.isPopular && <span className="room-chip popular">Popular</span>}
      </div>

      <div className="room-card-content">
        <div className="room-card-top">
          <h3>{room.name}</h3>
          <StatusBadge status={room.status} />
        </div>

        <p className="room-meta">?? Capacity: {room.capacity} students</p>
        <p className="room-meta">?? {room.building} • {room.floor} • {room.roomNumber}</p>
        <p className="room-meta">?? {room.distanceLabel}</p>

        <div className="facilities-wrap">
          {room.facilities.slice(0, 3).map((facility) => (
            <span className="facility-badge" key={facility}>
              {facility}
            </span>
          ))}
        </div>

        <div className="slots-preview">
          {room.availableSlots.length > 0 ? (
            room.availableSlots.slice(0, 3).map((slot) => (
              <span className="slot-pill" key={slot}>
                {slot}
              </span>
            ))
          ) : (
            <span className="slot-pill muted-slot">No open slots</span>
          )}
        </div>

        <div className="card-actions">
          <Link to={`/rooms/${room.id}`} className="btn btn-outline">
            View Details
          </Link>
          <Link to={`/book/${room.id}`} className="btn btn-primary">
            Book
          </Link>
        </div>
      </div>
    </article>
  )
}

export default RoomCard

