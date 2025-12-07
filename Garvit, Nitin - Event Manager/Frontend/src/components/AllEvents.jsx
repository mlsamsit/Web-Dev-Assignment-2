import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useInfo } from "../zustand/store";

export default function AllEvents() {
  const [events, setEvents] = useState(null);
  const navigate = useNavigate();
  const role = useInfo((state) => state.role)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/events`);
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data.data || []);
      } catch (err) {
        console.error(err.message);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 text-center sm:text-left">
            Available Events
          </h1>

          
          {role === "admin" && (
            <button
              onClick={() => navigate("/admin/create/event")}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Add New Event
            </button>
          )}
        </div>

        {events === null && (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            Fetching available events...
          </p>
        )}

        {events !== null && events.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            No ongoing events for now
          </p>
        )}

        {events !== null && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() =>
                  role === 'admin'
                    ? navigate(`/admin/view/event/${event._id}`)
                    : navigate(`/event/${event._id}`)
                }
                className="cursor-pointer bg-white dark:bg-gray-950/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-200"
              >
                <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 h-16 overflow-hidden">
                  {event.description}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Time: {event.time}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Venue: {event.venue}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
