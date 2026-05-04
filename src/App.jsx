import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { BookingsProvider } from './context/BookingsContext'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import Home from './pages/Home'
import MyBookings from './pages/MyBookings'
import NotFound from './pages/NotFound'
import RoomDetails from './pages/RoomDetails'
import Rooms from './pages/Rooms'

const THEME_STORAGE_KEY = 'focusnest_theme'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'light' ? 'dark' : 'light'))
  }

  return (
    <BookingsProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Header theme={theme} onToggleTheme={toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:roomId" element={<RoomDetails />} />
              <Route path="/book/:roomId" element={<Booking />} />
              <Route path="/confirmation/:bookingId" element={<Confirmation />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </BookingsProvider>
  )
}

export default App

