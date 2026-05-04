import { useEffect, useState } from 'react'

const STORAGE_KEY = 'focusnest_bookings'

function readBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []

    // Keep backward compatibility with Design Before entries.
    return parsed.map((booking) => ({
      reminderMinutes: booking.reminderMinutes ?? 10,
      reminderLabel: booking.reminderLabel ?? 'Reminder set 10 minutes before booking ends',
      locationLabel: booking.locationLabel ?? 'Campus room location',
      capacity: booking.capacity ?? 'Not specified',
      ...booking,
    }))
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
      reminderMinutes: 10,
      reminderLabel: 'Reminder set 10 minutes before booking ends',
      createdAt: new Date().toISOString(),
      ...bookingPayload,
    }

    setBookings((previous) => [newBooking, ...previous])
    return newBooking
  }

  const updateBooking = (bookingId, updates) => {
    let updatedBooking = null

    setBookings((previous) =>
      previous.map((booking) => {
        if (String(booking.id) !== String(bookingId)) {
          return booking
        }

        updatedBooking = {
          ...booking,
          ...updates,
          updatedAt: new Date().toISOString(),
        }

        return updatedBooking
      }),
    )

    return updatedBooking
  }

  const cancelBooking = (bookingId) => {
    return updateBooking(bookingId, {
      status: 'Cancelled',
      cancelledAt: new Date().toISOString(),
    })
  }

  const getBookingById = (bookingId) =>
    bookings.find((booking) => String(booking.id) === String(bookingId))

  return {
    bookings,
    addBooking,
    updateBooking,
    cancelBooking,
    getBookingById,
  }
}

