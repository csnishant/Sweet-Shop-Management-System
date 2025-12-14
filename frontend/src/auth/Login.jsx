import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        // Store token and role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect based on role
        if (data.role === "admin") {
          navigate("/admin"); // ✅ Admin dashboard
        } else {
          navigate("/"); // Normal user dashboard
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-indigo-500 text-white py-3 rounded-2xl font-medium hover:bg-indigo-600 transition">
            Login
          </button>
        </form>

        <p className="text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-500 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
