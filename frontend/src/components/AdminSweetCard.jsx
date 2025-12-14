import React from "react";

const AdminSweetCard = ({ sweet, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-xl flex flex-col space-y-2">
      <h2 className="text-xl font-semibold">{sweet.name}</h2>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Quantity: {sweet.quantity}</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(sweet)}
          className="px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">
          Edit
        </button>
        <button
          onClick={() => onDelete(sweet._id)}
          className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminSweetCard;
