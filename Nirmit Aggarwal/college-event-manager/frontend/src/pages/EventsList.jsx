import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eventsAPI, registrationsAPI } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { usePageTransition, useGSAPAnimation } from "../hooks/useAnimation";
import gsap from "gsap";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState({});
  const pageRef = usePageTransition();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsAPI.getAll();
        setEvents(response.data);

        // Stagger animation for cards
        gsap.from(".event-card", {
          duration: 0.5,
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
        });

        // Fetch registered events
        try {
          const registrationsResponse =
            await registrationsAPI.getMyRegistrations();
          const registeredEventIds = registrationsResponse.data.map(
            (r) => r.eventId._id
          );
          const registeredMap = {};
          registeredEventIds.forEach((id) => {
            registeredMap[id] = true;
          });
          setRegistered(registeredMap);
        } catch (e) {
          // User might not be logged in
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold uppercase tracking-brutalist border-b-4 border-black pb-4">
            UPCOMING EVENTS
          </h1>
          <Link to="/admin/create-event">
            <Button variant="purple">+ NEW EVENT</Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-2xl font-bold uppercase">LOADING...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="card-brutalist text-center py-12">
            <p className="text-2xl font-bold uppercase">NO EVENTS FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event._id} className="event-card flex flex-col h-full">
                <h2 className="text-2xl font-bold uppercase tracking-brutalist border-b-3 border-black pb-3 mb-4">
                  {event.title}
                </h2>

                <p className="text-sm mb-4 flex-grow">{event.description}</p>

                <div className="space-y-2 mb-6 text-sm font-bold uppercase">
                  <p>📅 {event.date}</p>
                  <p>🕐 {event.time}</p>
                  <p>📍 {event.venue}</p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link to={`/events/${event._id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      VIEW
                    </Button>
                  </Link>
                  {registered[event._id] ? (
                    <div className="flex-1 bg-green-200 border-3 border-green-600 p-3 flex items-center justify-center">
                      <span className="font-bold text-xs uppercase">
                        ✓ REGISTERED
                      </span>
                    </div>
                  ) : (
                    <Link to={`/events/${event._id}`} className="flex-1">
                      <Button variant="success" className="w-full">
                        REGISTER
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
