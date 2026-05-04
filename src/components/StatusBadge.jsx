function StatusBadge({ status }) {
  const tone = status?.toLowerCase() || 'available'

  return <span className={`status-badge ${tone}`}>{status}</span>
}

export default StatusBadge
