import { useMemo, useState } from 'react'
import RoomCard from '../components/RoomCard'
import { rooms, roomStatusOptions } from '../data/rooms'

function Rooms() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch = `${room.name} ${room.building} ${room.roomNumber}`
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesStatus = statusFilter === 'All' || room.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  return (
    <section className="page">
      <div className="container">
        <h1>Rooms</h1>
        <p className="page-intro">Search by room name and apply one simple status filter.</p>

        <div className="filters-row">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search rooms or buildings"
            aria-label="Search rooms"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            {roomStatusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="empty-state">
            <h3>No rooms found</h3>
            <p>Try changing your search or status filter.</p>
          </div>
        ) : (
          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Rooms
