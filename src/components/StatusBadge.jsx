const statusMeta = {
  Available: { label: 'Available', tone: 'available' },
  Booked: { label: 'Booked', tone: 'booked' },
  Maintenance: { label: 'Maintenance', tone: 'maintenance' },
  Confirmed: { label: 'Confirmed', tone: 'confirmed' },
  Cancelled: { label: 'Cancelled', tone: 'cancelled' },
}

function StatusBadge({ status }) {
  const meta = statusMeta[status] || { label: status || 'Unknown', tone: 'default' }

  return (
    <span className={`status-badge ${meta.tone}`}>
      <span className="status-dot" aria-hidden="true" />
      {meta.label}
    </span>
  )
}

export default StatusBadge

