import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react"; // or use any icon you prefer

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-teal-500 p-2 rounded-lg text-white">
          <Home className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg text-gray-800">RealEstate</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
        {token && (
          <Link to="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
        )}
        {token ? (
          <>
            <button
              onClick={handleLogout}
              className="border border-gray-300 px-3 py-1 rounded-md font-semibold text-gray-800 hover:bg-gray-100"
            >
              Sign Out
            </button>
            <span className="text-gray-500">Welcome, {user?.name || "Guest"}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-black">Login</Link>
            <Link to="/register" className="text-gray-600 hover:text-black">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
