import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await API.post("/auth/login", formData);

      auth?.login(res.data.access_token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-950">

      {/* Login Card */}
      <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl shadow-2xl w-96">

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          CredMate Login
        </h2>

        {/* Email */}
        <div className="flex items-center bg-slate-800 rounded-lg px-3 mb-4 border border-slate-700">
          <Mail className="text-slate-400 mr-2" size={18} />
          <input
            className="w-full p-3 bg-transparent text-white outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-slate-800 rounded-lg px-3 mb-6 border border-slate-700">
          <Lock className="text-slate-400 mr-2" size={18} />
          <input
            type="password"
            className="w-full p-3 bg-transparent text-white outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Signup */}
        <p
          className="text-sm text-slate-400 text-center mt-5 cursor-pointer hover:text-white"
          onClick={() => navigate("/signup")}
        >
          Don’t have an account? Sign up
        </p>

      </div>
    </div>
  );
};

export default Login;