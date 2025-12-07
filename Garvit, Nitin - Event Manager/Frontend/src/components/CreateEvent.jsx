import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import { useInfo } from "../zustand/store";

export default function CreateEvent() {
  const navigate = useNavigate();
  const role = useInfo((state) => state.role);

  useEffect(() => {
    if (role !== "admin") {
      alert("This page is only accessible to admins");
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const isoDate = new Date(formData.date).toISOString();

      const payload = {
        ...formData,
        date: isoDate,
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Event created successfully!");
      navigate("/events/all");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
          Create New Event
        </h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>

            <button
              onClick={() => navigate("/events/all")}
              className="px-4 py-2 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
