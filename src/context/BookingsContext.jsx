import { createContext, useContext } from 'react'
import { useBookings } from '../hooks/useBookings'

const BookingsContext = createContext(null)

export function BookingsProvider({ children }) {
  const bookingState = useBookings()

  return <BookingsContext.Provider value={bookingState}>{children}</BookingsContext.Provider>
}

export function useBookingsContext() {
  const context = useContext(BookingsContext)

  if (!context) {
    throw new Error('useBookingsContext must be used inside BookingsProvider')
  }

  return context
}
