import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo / App Name */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        CredMate
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {auth?.token ? (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-600 hover:text-black transition"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;