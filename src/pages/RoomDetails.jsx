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
        <div className="details-header">
          <div>
            <h1>{room.name}</h1>
            <p className="page-intro">Review complete details before booking this room.</p>
          </div>
          <StatusBadge status={room.status} />
        </div>

        <div className="details-layout">
          <article className="details-card">
            <h3>Room Information</h3>
            <p><strong>Building:</strong> {room.building}</p>
            <p><strong>Floor:</strong> {room.floor}</p>
            <p><strong>Room Number:</strong> {room.roomNumber}</p>
            <p><strong>Distance:</strong> {room.distanceLabel}</p>
            <p><strong>Capacity:</strong> {room.capacity} students</p>
            <p><strong>Type:</strong> {room.roomType}</p>
            <p><strong>Noise Level:</strong> {room.noiseLevel}</p>
            <p><strong>Description:</strong> {room.description}</p>
          </article>

          <article className="details-card">
            <h3>Facilities</h3>
            <div className="facilities-wrap">
              {room.facilities.map((facility) => (
                <span className="facility-badge" key={facility}>{facility}</span>
              ))}
            </div>

            <h3 className="section-top-space">Available Time Slots</h3>
            <div className="slots-preview">
              {room.availableSlots.length > 0 ? (
                room.availableSlots.map((slot) => (
                  <span className="slot-pill" key={slot}>{slot}</span>
                ))
              ) : (
                <span className="slot-pill muted-slot">No available slots right now</span>
              )}
            </div>

            <h3 className="section-top-space">Why this room?</h3>
            <ul className="why-list">
              {room.whyBestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="card-actions">
              <Link to={`/book/${room.id}`} className="btn btn-primary">
                Book This Room
              </Link>
              <Link to="/rooms" className="btn btn-outline">
                Back to Rooms
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default RoomDetails

