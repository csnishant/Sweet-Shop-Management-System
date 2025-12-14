import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  // Fetch all sweets
  const fetchSweets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSweets(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/sweets/search?name=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setSweets(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Purchase sweet
  const handlePurchase = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/sweets/${id}/purchase`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      alert(data.message);
      fetchSweets(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Sweet Shop Dashboard
      </h1>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search sweets..."
          className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition">
          Search
        </button>
      </form>

      {/* Sweets List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sweets.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-white p-4 rounded-3xl shadow-2xl flex flex-col space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {sweet.name}
            </h2>
            <p className="text-gray-600">Category: {sweet.category}</p>
            <p className="text-gray-600">Price: ${sweet.price}</p>
            <p className="text-gray-600">Quantity: {sweet.quantity}</p>

            <button
              onClick={() => handlePurchase(sweet._id)}
              disabled={sweet.quantity === 0}
              className={`py-2 px-4 rounded-full font-medium transition ${
                sweet.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}>
              {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
