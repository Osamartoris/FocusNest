import { useEffect, useState } from 'react'

const STORAGE_KEY = 'focusnest_bookings'

function readBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useBookings() {
  const [bookings, setBookings] = useState(() => readBookings())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  const addBooking = (bookingPayload) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      ...bookingPayload,
    }

    setBookings((previous) => [newBooking, ...previous])
    return newBooking
  }

  const removeBooking = (bookingId) => {
    setBookings((previous) => previous.filter((booking) => booking.id !== bookingId))
  }

  const getBookingById = (bookingId) =>
    bookings.find((booking) => String(booking.id) === String(bookingId))

  return {
    bookings,
    addBooking,
    removeBooking,
    getBookingById,
  }
}
