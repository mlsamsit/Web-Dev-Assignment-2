import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b-4 border-black bg-white p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold uppercase tracking-brutalist border-none pb-0 mb-0">
          EVENT MANAGER
        </h1>
        <div className="flex gap-4 items-center">
          {user && (
            <>
              <span className="font-bold uppercase text-sm">
                {user.name} <span className="text-red-600">[{user.role}]</span>
              </span>
              <Button onClick={handleLogout} variant="secondary">
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
