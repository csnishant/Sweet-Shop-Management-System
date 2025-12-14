import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // ✅ Default role

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }), // ✅ Include role
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/"); // redirect after registration
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Register
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-indigo-500 text-white py-3 rounded-2xl font-medium hover:bg-indigo-600 transition">
            Register
          </button>
        </form>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
