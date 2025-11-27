import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registrationsAPI } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { usePageTransition } from "../hooks/useAnimation";
import gsap from "gsap";

export default function StudentDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageRef = usePageTransition();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await registrationsAPI.getMyRegistrations();
        setRegistrations(response.data);

        // Stagger animation
        gsap.from(".registration-card", {
          duration: 0.5,
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
        });
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold uppercase tracking-brutalist border-b-4 border-black pb-4">
            MY REGISTRATIONS
          </h1>
          <Link to="/events">
            <Button variant="secondary">BROWSE EVENTS</Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-2xl font-bold uppercase">LOADING...</p>
          </div>
        ) : registrations.length === 0 ? (
          <Card>
            <p className="text-2xl font-bold uppercase mb-6">
              NO REGISTRATIONS YET
            </p>
            <Link to="/events">
              <Button variant="success">REGISTER FOR EVENTS</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrations.map((registration) => (
              <Card
                key={registration._id}
                className="registration-card flex flex-col"
              >
                <h2 className="text-2xl font-bold uppercase tracking-brutalist border-b-3 border-black pb-3 mb-4">
                  {registration.eventId.title}
                </h2>

                <p className="text-sm mb-4 flex-grow">
                  {registration.eventId.description}
                </p>

                <div className="space-y-2 mb-6 text-sm font-bold uppercase">
                  <p>📅 {registration.eventId.date}</p>
                  <p>🕐 {registration.eventId.time}</p>
                  <p>📍 {registration.eventId.venue}</p>
                </div>

                <Link
                  to={`/events/${registration.eventId._id}`}
                  className="mt-auto"
                >
                  <Button variant="secondary" className="w-full">
                    VIEW DETAILS
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
