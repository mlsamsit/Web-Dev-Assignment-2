import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import { useInfo } from "../zustand/store";

export default function AuthPage() {
  const [mode, setMode] = useState("signin");
  const isSignup = mode === "signup";
  const navigate = useNavigate();

  const setName = useInfo((state) => state.setName)
  const setUsername = useInfo((state) => state.setUsername)
  const setRole = useInfo((state) => state.setRole)

  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const signup = async () => {
    const payload = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) return alert(data.message || "Signup failed!");
      alert(data.message || "Signup successful!");
      setMode("signin");
    } catch (err) {
      console.error(err);
      alert("Network error!");
    }
  };

  const signin = async () => {
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) return alert(data.message || "Signin failed!");

      
      setUsername(data.data.user.username);
      setName(data.data.user.name);
      setRole(data.data.user.role);

      alert(data.message || "Signin successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Network error!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) signup();
    else signin();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />

      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl p-8 shadow-xl bg-white dark:bg-gray-950/40 border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {isSignup && (
              <input
                ref={nameRef}
                type="text"
                placeholder="Name"
                className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800
                           border border-gray-300 dark:border-gray-700 
                           focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}

            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800
                         border border-gray-300 dark:border-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800
                         border border-gray-300 dark:border-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-lg bg-green-600 text-white font-medium 
                         hover:bg-green-700 transition dark:bg-green-500 dark:hover:bg-green-600"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setMode(isSignup ? "signin" : "signup")}
              className="ml-1 text-green-600 dark:text-green-400 font-medium hover:underline"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
