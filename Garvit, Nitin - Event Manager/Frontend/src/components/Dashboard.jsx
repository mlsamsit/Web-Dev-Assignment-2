import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useInfo } from '../zustand/store'
import Navbar from './Navbar'

export default function Dashboard() {
  const navigate = useNavigate()
  const setName = useInfo((state) => state.setName)
  const setUsername = useInfo((state) => state.setUsername)

  const [userData, setUserData] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user info
        const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`, { credentials: 'include' })
        if (userRes.status === 401) {
          navigate('/authorization')
          return
        }
        if (!userRes.ok) throw new Error('Failed to fetch user data')
        const user = await userRes.json()
        setUserData(user.data || null)

        // Fetch user registrations
        const regRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/registrations/my`, { credentials: 'include' })
        if (!regRes.ok) throw new Error('Failed to fetch registrations')
        const regs = await regRes.json()
        setRegistrations(regs.data || []) // ensure it's an array
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, { method: 'POST', credentials: 'include' })
    } catch (err) {
      console.error('Logout failed', err)
    } finally {
      setName('')
      setUsername('')
      navigate('/authorization')
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-2">
          <p><strong>Name:</strong> {userData?.name}</p>
          <p><strong>Username:</strong> {userData?.username}</p>
          <p><strong>Role:</strong> {userData?.role}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">My Registrations</h2>
          {registrations.length === 0 ? (
            <p>No registrations yet.</p>
          ) : (
            <div className="space-y-4">
              {registrations.map((reg) => (
                <div
                  key={reg._id}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md flex justify-between items-center"
                >
                  <div>
                    <p><strong>Event:</strong> {reg.event_id?.title}</p>
                    <p><strong>Date:</strong> 
                    {reg.event_id?.date ? new Date(reg.event_id.date).toLocaleDateString() : "No date"}
                    </p>
                    <p><strong>Status:</strong> {reg.status || 'Registered'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
