import { useNavigate } from 'react-router'
import Navbar from './Navbar'
import { useInfo } from '../zustand/store'
export default function LandingPage() {
  const navigate = useNavigate()
  const name = useInfo((state) => state.name)


  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 from-green-50 via-white to-green-50 dark:from-black dark:via-black dark:to-black"></div>

        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-pretty leading-tight">
              Manage Events <span className="text-green-600">Effortlessly</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Plan, organize, and explore events with ease. Whether you're hosting a meetup or attending a concert, EventManager brings everything together in one seamless experience.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
            {!name && (<button onClick={() => navigate('/authorization')}className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg dark:bg-green-500 dark:hover:bg-green-600">
              Create an Account
            </button>)}
            <button onClick={() => navigate('/events/all')} className="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-200 text-lg dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/30">
              Explore Events
            </button>
          </div>
        </div>
      </div>

      <section className="py-24 px-6 bg-green-50 dark:bg-gray-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-pretty">
              Why Choose <span className="text-green-600">EventManager?</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides powerful tools that make event hosting and participation simple and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-xl text-green-600">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Create Events</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Host events with detailed descriptions, categories, and time management tools that make organization effortless.
              </p>
            </div>

            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-xl text-green-600">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Discover Events</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Explore events based on interest, location, and popularity with our intelligent discovery engine.
              </p>
            </div>

            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-xl text-green-600">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Smooth Registrations</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Users can register instantly and receive real-time updates about your events straight to their inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-600 dark:bg-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg font-semibold">MSC-EventManager &copy; 2025</p>
          <p className="text-green-100 dark:text-green-200 mt-2">Bringing people together through amazing events.</p>
        </div>
      </footer>
    </div>
  )
}