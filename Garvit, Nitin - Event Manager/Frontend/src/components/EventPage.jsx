import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`, {
          credentials: "include"
        });
        const data = await res.json();
        if (res.ok) {
          setEvent(data.data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const checkRegistration = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/registrations/check/${id}`, {
          credentials: "include"
        });
        const data = await res.json();
        if (res.ok) {
          setRegistered(data.data.registered);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
    checkRegistration();
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/registrations/register/${id}`, {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setRegistered(true);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading || event === null) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mt-20">
          Loading event details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
          {event.title}
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4">{event.description}</p>

        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
          Time: {event.time}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Venue: {event.venue}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Total Registrations: {event.totalRegistrations || 0}
        </p>

        {registered ? (
          <button
            disabled
            className="px-6 py-2 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
          >
            Registered
          </button>
        ) : (
          <button
            onClick={handleRegister}
            disabled={registering}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 dark:bg-green-500 dark:hover:bg-green-600"
          >
            {registering ? "Registering..." : "Register"}
          </button>
        )}
      </div>
    </div>
  );
}
