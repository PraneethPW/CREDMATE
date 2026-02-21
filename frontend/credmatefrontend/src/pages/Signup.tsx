import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // 1️⃣ Register
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      // 2️⃣ Auto login after register
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await API.post("/auth/login", formData);

      auth?.login(res.data.access_token);
      navigate("/dashboard");

    } catch (error) {
      alert("Signup failed");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white py-2 rounded"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p
          className="text-sm text-gray-500 mt-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Signup;