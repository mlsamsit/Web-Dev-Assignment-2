import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eventsAPI, registrationsAPI } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { usePageTransition } from "../hooks/useAnimation";
import gsap from "gsap";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const pageRef = usePageTransition();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await eventsAPI.getAll();
        setEvents(eventsResponse.data);

        // Fetch registration counts for each event
        const countMap = {};
        for (const event of eventsResponse.data) {
          try {
            const countResponse =
              await registrationsAPI.getEventRegistrationCount(event._id);
            countMap[event._id] = countResponse.data.count;
          } catch (e) {
            countMap[event._id] = 0;
          }
        }
        setCounts(countMap);

        // Stagger animation
        gsap.from(".event-stat-card", {
          duration: 0.5,
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRegistrations = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div ref={pageRef} className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold uppercase tracking-brutalist border-b-4 border-black pb-4">
            ADMIN DASHBOARD
          </h1>
          <Link to="/admin/create-event">
            <Button variant="purple">+ CREATE EVENT</Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-yellow-100">
            <p className="text-sm font-bold uppercase mb-2">TOTAL EVENTS</p>
            <p className="text-5xl font-black">{events.length}</p>
          </Card>
          <Card className="bg-green-200">
            <p className="text-sm font-bold uppercase mb-2">
              TOTAL REGISTRATIONS
            </p>
            <p className="text-5xl font-black">{totalRegistrations}</p>
          </Card>
          <Card className="bg-purple-200">
            <p className="text-sm font-bold uppercase mb-2">
              AVG REGISTRATIONS
            </p>
            <p className="text-5xl font-black">
              {events.length > 0
                ? Math.round(totalRegistrations / events.length)
                : 0}
            </p>
          </Card>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-2xl font-bold uppercase">LOADING...</p>
          </div>
        ) : events.length === 0 ? (
          <Card>
            <p className="text-2xl font-bold uppercase mb-6">
              NO EVENTS CREATED YET
            </p>
            <Link to="/admin/create-event">
              <Button variant="success">CREATE FIRST EVENT</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event._id} className="event-stat-card flex flex-col">
                <h2 className="text-2xl font-bold uppercase tracking-brutalist border-b-3 border-black pb-3 mb-4">
                  {event.title}
                </h2>

                <p className="text-sm mb-4 flex-grow">{event.description}</p>

                <div className="bg-blue-100 border-3 border-blue-500 p-4 mb-6 font-bold uppercase text-lg">
                  <p className="text-sm">
                    Registrations:{" "}
                    <span className="text-3xl">{counts[event._id] || 0}</span>
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-sm font-bold uppercase">
                  <p>📅 {event.date}</p>
                  <p>🕐 {event.time}</p>
                  <p>📍 {event.venue}</p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/admin/edit-event/${event._id}`}
                    className="flex-1"
                  >
                    <Button variant="purple" className="w-full">
                      EDIT
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={async () => {
                      if (window.confirm("Delete this event?")) {
                        try {
                          await eventsAPI.delete(event._id);
                          setEvents(events.filter((e) => e._id !== event._id));
                        } catch (error) {
                          alert("Failed to delete event");
                        }
                      }
                    }}
                  >
                    DELETE
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
