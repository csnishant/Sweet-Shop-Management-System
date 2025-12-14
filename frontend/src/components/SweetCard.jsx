import React from "react";

const SweetCard = ({ sweet, onPurchase }) => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-xl flex flex-col space-y-2">
      <h2 className="text-xl font-semibold text-gray-800">{sweet.name}</h2>

      <p className="text-gray-600">Category: {sweet.category}</p>
      <p className="text-gray-600">Price: ₹{sweet.price}</p>
      <p className="text-gray-600">Quantity: {sweet.quantity}</p>

      <button
        onClick={() => onPurchase(sweet._id)}
        disabled={sweet.quantity === 0}
        className={`py-2 px-4 rounded-full font-medium transition ${
          sweet.quantity === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}>
        {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
      </button>
    </div>
  );
};

export default SweetCard;
