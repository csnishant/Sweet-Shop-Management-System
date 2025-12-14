import React, { useEffect, useState } from "react";
import AdminSweetCard from "../components/AdminSweetCard";
import SweetFormModal from "../components/SweetFormModal";

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editSweet, setEditSweet] = useState(null);

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

  // Add or Update sweet
  const handleSubmit = async (sweetData) => {
    try {
      const url = editSweet
        ? `http://localhost:5000/api/sweets/${editSweet._id}`
        : "http://localhost:5000/api/sweets";

      const method = editSweet ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sweetData),
      });

      const data = await res.json();
      alert(data.message);
      setModalOpen(false);
      setEditSweet(null);
      fetchSweets();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete sweet
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/sweets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);
      fetchSweets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600">
          Add Sweet
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <AdminSweetCard
            key={sweet._id}
            sweet={sweet}
            onEdit={(s) => {
              setEditSweet(s);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <SweetFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditSweet(null);
        }}
        onSubmit={handleSubmit}
        sweet={editSweet}
      />
    </div>
  );
};

export default AdminDashboard;
