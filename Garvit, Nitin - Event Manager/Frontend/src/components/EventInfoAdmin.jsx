import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Navbar from "./Navbar";
import { useInfo } from "../zustand/store";

export default function EventInfoAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
  });

  const role = useInfo((state) => state.role);

  useEffect(() => {
    if (role !== "admin") {
      alert("This page is only accessible to admins");
      navigate("/");
      return;
    }

    const fetchEventAndRegistrations = async () => {
      try {
        // Fetch event info
        const eventRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`,
          { credentials: "include" }
        );
        if (!eventRes.ok) throw new Error("Failed to fetch event");
        const eventData = await eventRes.json();
        setEvent(eventData.data);
        setFormData({
          title: eventData.data.title,
          description: eventData.data.description,
          date: eventData.data.date.split("T")[0],
          time: eventData.data.time,
          venue: eventData.data.venue,
        });

        // Fetch registrations
        const regRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/registrations/admin/${id}`,
          { credentials: "include" }
        );
        if (!regRes.ok) throw new Error("Failed to fetch registrations");
        const regData = await regRes.json();
        setRegistrations(regData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndRegistrations();
  }, [id, role, navigate]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Event deleted successfully!");
      navigate("/events/all");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Update local event state instead of reloading
      setEvent(data.data); // backend should return updated event
      setEditMode(false);
      alert("Event updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Event Info */}
        {!editMode ? (
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-2">
            <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
              {event.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              <strong>Time:</strong> {event.time}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              <strong>Total Registrations:</strong> {event.totalRegistrations || 0}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Edit Event
            </h1>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Title"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              placeholder="Time"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={formData.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
              placeholder="Venue"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Registered Students */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Registered Students
          </h2>
          {registrations.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">
              No students registered yet.
            </p>
          ) : (
            registrations.map((reg) => (
              <div
                key={reg._id}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md text-gray-900 dark:text-white"
              >
                <p>
                  <strong>Name:</strong> {reg.user_id?.name}
                </p>
                <p>
                  <strong>Username:</strong> {reg.user_id?.username}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
