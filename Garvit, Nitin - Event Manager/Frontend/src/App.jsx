import { useEffect } from "react"
import LandingPage from "./components/LandingPage"
import { useDarkMode } from "./zustand/store"
import {BrowserRouter, Routes, Route} from 'react-router'
import AuthPage from "./components/AuthPage"
import AllEvents from "./components/AllEvents"
import EventPage from "./components/EventPage"
import Dashboard from "./components/Dashboard"
import EventInfoAdmin from "./components/EventInfoAdmin"
import CreateEvent from "./components/CreateEvent"

function App() {

  const isDarkMode = useDarkMode((state) => state.isDarkMode)
  document.documentElement.classList.toggle('dark', isDarkMode)

  useEffect(() => {

  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    document.documentElement.classList.toggle('light', !isDarkMode)
    localStorage.setItem('user-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/authorization" element={<AuthPage />} />
        <Route path="/events/all" element={<AllEvents />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/view/event/:id" element={<EventInfoAdmin />} />
        <Route path="/admin/create/event" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter>
)
}

export default App
