import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { eventsAPI } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { usePageTransition } from "../hooks/useAnimation";

export default function EditEvent() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const pageRef = usePageTransition();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventsAPI.getById(id);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await eventsAPI.update(id, formData);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <p className="text-2xl font-bold uppercase">LOADING...</p>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/admin-dashboard" className="mb-6 inline-block">
          <Button variant="secondary">← BACK</Button>
        </Link>

        <Card>
          <h1 className="text-4xl font-bold uppercase tracking-brutalist border-b-4 border-black pb-4 mb-8">
            EDIT EVENT
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
                disabled={submitting}
                className="flex-1"
              >
                {submitting ? "SAVING..." : "SAVE CHANGES"}
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
