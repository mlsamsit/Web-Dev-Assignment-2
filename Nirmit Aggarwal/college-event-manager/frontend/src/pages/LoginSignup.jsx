import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { authAPI } from "../api";
import { Button } from "../components/Button";
import { usePageTransition } from "../hooks/useAnimation";

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
      const response = isSignup
        ? await authAPI.signup(formData)
        : await authAPI.login(formData);

      login(response.data.token, response.data.user);
      navigate(
        response.data.user.role === "admin" ? "/admin-dashboard" : "/events"
      );
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-white flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <div className="card-brutalist">
          <h1 className="text-4xl font-bold uppercase tracking-brutalist border-b-4 border-black pb-6 mb-8">
            {isSignup ? "SIGN UP" : "LOGIN"}
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-200 border-3 border-red-600 font-bold uppercase text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div>
                <label className="block font-bold uppercase tracking-brutalist mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label className="block font-bold uppercase tracking-brutalist mb-2">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-brutalist mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "LOADING..." : isSignup ? "CREATE ACCOUNT" : "LOGIN"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t-3 border-black">
            <p className="text-center mb-4 font-bold uppercase">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </p>
            <Button
              variant="secondary"
              onClick={() => setIsSignup(!isSignup)}
              className="w-full"
            >
              {isSignup ? "GO TO LOGIN" : "CREATE ACCOUNT"}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t-3 border-yellow-400 bg-yellow-100 p-4">
            <p className="font-bold text-xs uppercase mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs font-bold">
              Admin: admin@college.edu / admin123
            </p>
            <p className="text-xs font-bold">
              Student: john@college.edu / student123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
