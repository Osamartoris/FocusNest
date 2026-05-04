import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className="room-card-top">
        <h3>{room.name}</h3>
        <StatusBadge status={room.status} />
      </div>

      <p className="muted">{room.building} - {room.floor}</p>
      <p className="muted">Room {room.roomNumber}</p>

      <div className="card-actions">
        <Link to={`/rooms/${room.id}`} className="btn btn-outline">
          View Details
        </Link>
      </div>
    </article>
  )
}

export default RoomCard
