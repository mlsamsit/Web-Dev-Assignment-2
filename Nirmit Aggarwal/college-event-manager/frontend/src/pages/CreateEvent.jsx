import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { eventsAPI } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { usePageTransition } from "../hooks/useAnimation";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const pageRef = usePageTransition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await eventsAPI.create(formData);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/admin-dashboard" className="mb-6 inline-block">
          <Button variant="secondary">← BACK</Button>
        </Link>

        <Card>
          <h1 className="text-4xl font-bold uppercase tracking-brutalist border-b-4 border-black pb-4 mb-8">
            CREATE NEW EVENT
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-200 border-3 border-red-600 font-bold uppercase text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bold uppercase tracking-brutalist mb-2">
                EVENT TITLE *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-brutalist mb-2">
                DESCRIPTION *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-brutalist mb-2">
                  DATE *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-brutalist mb-2">
                  TIME *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-brutalist mb-2">
                  VENUE *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t-4 border-black">
              <Button
                variant="success"
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? "CREATING..." : "CREATE EVENT"}
              </Button>
              <Link to="/admin-dashboard" className="flex-1">
                <Button variant="secondary" className="w-full">
                  CANCEL
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
