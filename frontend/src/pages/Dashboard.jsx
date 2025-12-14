import React, { useEffect, useState } from "react";
import SweetCard from "../components/SweetCard";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all sweets or filtered
  const fetchSweets = async () => {
    try {
      // Build query string dynamically
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("name", search);
      if (category && category !== "all")
        queryParams.append("category", category);
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);

      const url = `http://localhost:5000/api/sweets/search?${queryParams.toString()}`;

      const res = await fetch(url, {
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
  }, []); // fetch all on load

  // Handle search/filter submit
  const handleSearch = (e) => {
    e.preventDefault();
    fetchSweets();
  };

  // Purchase sweet
 const handlePurchase = async (id, quantity) => {
   try {
     const res = await fetch(
       `http://localhost:5000/api/sweets/${id}/purchase`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ quantity }), // Pass selected quantity
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

      {/* Search & Filter Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search sweet..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-full border w-64 focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-full border focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Categories</option>
          <option value="milk">Milk</option>
          <option value="dry-fruit">Dry Fruit</option>
          <option value="chocolate">Chocolate</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 rounded-full border w-32 focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 rounded-full border w-32 focus:ring-2 focus:ring-indigo-500"
        />

        <button className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition">
          Search
        </button>
      </form>

      {/* Sweet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sweets.length > 0 ? (
          sweets.map((sweet) => (
            <SweetCard
              key={sweet._id}
              sweet={sweet}
              onPurchase={handlePurchase}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No sweets found 🍬
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
