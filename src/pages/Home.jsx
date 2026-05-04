import RoomCard from '../components/RoomCard'
import { rooms } from '../data/rooms'

function Home() {
  const highlightedRooms = rooms.slice(0, 6)

  return (
    <section className="page">
      <div className="container">
        <h1>Welcome to FocusNest</h1>
        <p className="page-intro">
          Browse general study rooms across campus and make quick bookings for your next session.
        </p>

        <div className="section-header">
          <h2>Study Rooms</h2>
        </div>

        <div className="rooms-grid">
          {highlightedRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
