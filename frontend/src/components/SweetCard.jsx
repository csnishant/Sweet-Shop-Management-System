import React, { useState } from "react";

const SweetCard = ({ sweet, onPurchase }) => {
  const [buyQty, setBuyQty] = useState(1); // Default 1

  return (
    <div className="bg-white p-4 rounded-3xl shadow-xl flex flex-col space-y-2">
      <h2 className="text-xl font-semibold text-gray-800">{sweet.name}</h2>
      <p className="text-gray-600">Category: {sweet.category}</p>
      <p className="text-gray-600">Price: ₹{sweet.price}</p>
      <p className="text-gray-600">Available: {sweet.quantity}</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-2">
        <label className="text-gray-700">Qty:</label>
        <input
          type="number"
          min="1"
          max={sweet.quantity} // Cannot buy more than stock
          value={buyQty}
          onChange={(e) =>
            setBuyQty(Math.min(Number(e.target.value), sweet.quantity))
          }
          className="w-16 px-2 py-1 border rounded-lg text-center focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={() => onPurchase(sweet._id, buyQty)}
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
