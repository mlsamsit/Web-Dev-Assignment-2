import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import { Header } from "./components/Header";
import LoginSignup from "./pages/LoginSignup";
import EventsList from "./pages/EventsList";
import EventDetails from "./pages/EventDetails";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import "./index.css";

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-2xl font-bold uppercase">LOADING...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/events" replace />;
  }

  return children;
}

function Layout({ children }) {
  const { user } = useAuth();

  return (
    <>
      {user && <Header />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/login" element={<LoginSignup />} />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Layout>
                  <EventsList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <EventDetails />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-registrations"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requireAdmin>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-event"
            element={
              <ProtectedRoute requireAdmin>
                <Layout>
                  <CreateEvent />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-event/:id"
            element={
              <ProtectedRoute requireAdmin>
                <Layout>
                  <EditEvent />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/events" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
