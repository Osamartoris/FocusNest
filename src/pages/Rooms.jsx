import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import { allBuildings, allFacilities, rooms, roomStatusOptions } from '../data/rooms'

const capacityOptions = [0, 4, 6, 8, 10]

function Rooms() {
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('q') || ''

  const [search, setSearch] = useState(initialSearch)
  const [statusFilter, setStatusFilter] = useState('All')
  const [buildingFilter, setBuildingFilter] = useState('All')
  const [facilityFilter, setFacilityFilter] = useState('All')
  const [capacityFilter, setCapacityFilter] = useState(0)
  const [sortBy, setSortBy] = useState('default')

  const filteredRooms = useMemo(() => {
    const list = rooms.filter((room) => {
      const matchesSearch = `${room.name} ${room.building}`.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All' || room.status === statusFilter
      const matchesBuilding = buildingFilter === 'All' || room.building === buildingFilter
      const matchesFacility = facilityFilter === 'All' || room.facilities.includes(facilityFilter)
      const matchesCapacity = room.capacity >= capacityFilter

      return matchesSearch && matchesStatus && matchesBuilding && matchesFacility && matchesCapacity
    })

    if (sortBy === 'capacityAsc') {
      return [...list].sort((a, b) => a.capacity - b.capacity)
    }

    if (sortBy === 'capacityDesc') {
      return [...list].sort((a, b) => b.capacity - a.capacity)
    }

    if (sortBy === 'availability') {
      return [...list].sort((a, b) => a.status.localeCompare(b.status))
    }

    return list
  }, [search, statusFilter, buildingFilter, facilityFilter, capacityFilter, sortBy])

  const activeFilters = [
    search && `Search: ${search}`,
    statusFilter !== 'All' && `Status: ${statusFilter}`,
    buildingFilter !== 'All' && `Building: ${buildingFilter}`,
    facilityFilter !== 'All' && `Facility: ${facilityFilter}`,
    capacityFilter > 0 && `Min Capacity: ${capacityFilter}`,
  ].filter(Boolean)

  const resetFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setBuildingFilter('All')
    setFacilityFilter('All')
    setCapacityFilter(0)
    setSortBy('default')
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Rooms</h1>
        <p className="page-intro">Compare rooms quickly using status, building, capacity, and facilities.</p>

        <div className="filters-panel">
          <div className="filters-grid">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by room name or building"
              aria-label="Search rooms"
            />

            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {roomStatusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <select value={buildingFilter} onChange={(event) => setBuildingFilter(event.target.value)}>
              {allBuildings.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <select value={facilityFilter} onChange={(event) => setFacilityFilter(event.target.value)}>
              {allFacilities.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <select
              value={capacityFilter}
              onChange={(event) => setCapacityFilter(Number(event.target.value))}
            >
              {capacityOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 0 ? 'Any Capacity' : `${option}+ students`}
                </option>
              ))}
            </select>

            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="default">Sort: Default</option>
              <option value="capacityAsc">Sort: Capacity (Low to High)</option>
              <option value="capacityDesc">Sort: Capacity (High to Low)</option>
              <option value="availability">Sort: Availability</option>
            </select>
          </div>

          <div className="active-filters-row">
            <div className="active-filters">
              {activeFilters.length > 0 ? (
                activeFilters.map((filterItem) => <span key={filterItem} className="active-filter">{filterItem}</span>)
              ) : (
                <span className="muted">No active filters</span>
              )}
            </div>

            <button type="button" className="btn btn-outline" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="empty-state">
            <h3>No rooms match your filters</h3>
            <p>Try removing one or more filters to broaden results.</p>
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

