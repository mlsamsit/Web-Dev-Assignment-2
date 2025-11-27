import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { eventsAPI, registrationsAPI } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { usePageTransition } from "../hooks/useAnimation";
import { useAuth } from "../AuthContext.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const pageRef = usePageTransition();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventsAPI.getById(id);
        setEvent(response.data);

        // Check if registered
        try {
          const registrationsResponse =
            await registrationsAPI.getMyRegistrations();
          const isRegistered = registrationsResponse.data.some(
            (r) => r.eventId._id === id
          );
          setRegistered(isRegistered);
        } catch (e) {
          // User not logged in
        }

        // Get registration count if admin
        if (user?.role === "admin") {
          try {
            const countResponse =
              await registrationsAPI.getEventRegistrationCount(id);
            setRegistrationCount(countResponse.data.count);
          } catch (e) {
            console.error("Error fetching count:", e);
          }
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user]);

  const handleRegister = async () => {
    try {
      await registrationsAPI.register(id);
      setRegistered(true);
      alert("Successfully registered for this event!");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to register");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <p className="text-2xl font-bold uppercase">LOADING...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-3xl mx-auto">
          <Card>
            <p className="text-2xl font-bold uppercase">EVENT NOT FOUND</p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => navigate("/events")}
            >
              BACK TO EVENTS
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/events" className="mb-6 inline-block">
          <Button variant="secondary">← BACK</Button>
        </Link>

        <Card className="mb-6">
          <h1 className="text-5xl font-bold uppercase tracking-brutalist border-b-4 border-black pb-4 mb-6">
            {event.title}
          </h1>

          <div className="bg-yellow-100 border-3 border-yellow-400 p-6 mb-6">
            <p className="text-lg font-bold uppercase mb-4">EVENT DETAILS</p>
            <div className="space-y-3 font-bold uppercase text-sm">
              <p>
                📅 <span className="font-mono">DATE: {event.date}</span>
              </p>
              <p>
                🕐 <span className="font-mono">TIME: {event.time}</span>
              </p>
              <p>
                📍 <span className="font-mono">VENUE: {event.venue}</span>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-brutalist border-b-3 border-black pb-3 mb-4">
              DESCRIPTION
            </h2>
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          {user?.role === "admin" && (
            <div className="bg-purple-200 border-3 border-purple-600 p-4 mb-6 font-bold uppercase">
              <p className="text-sm">
                ADMIN VIEW - Registration Count:{" "}
                <span className="text-2xl">{registrationCount}</span>
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t-4 border-black">
            {user?.role === "admin" ? (
              <>
                <Link to={`/admin/edit-event/${event._id}`} className="flex-1">
                  <Button variant="purple" className="w-full">
                    EDIT EVENT
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={async () => {
                    if (window.confirm("Delete this event?")) {
                      try {
                        await eventsAPI.delete(event._id);
                        navigate("/events");
                      } catch (error) {
                        alert("Failed to delete event");
                      }
                    }
                  }}
                >
                  DELETE
                </Button>
              </>
            ) : registered ? (
              <div className="flex-1 bg-green-300 border-4 border-green-600 p-3 flex items-center justify-center">
                <span className="font-bold text-lg uppercase">
                  ✓ REGISTERED
                </span>
              </div>
            ) : (
              <Button
                variant="success"
                className="flex-1"
                onClick={handleRegister}
              >
                REGISTER NOW
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
