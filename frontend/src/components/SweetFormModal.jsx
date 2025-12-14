import React, { useState, useEffect } from "react";

const SweetFormModal = ({ isOpen, onClose, onSubmit, sweet }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("milk");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (sweet) {
      setName(sweet.name);
      setCategory(sweet.category);
      setPrice(sweet.price);
      setQuantity(sweet.quantity);
    } else {
      setName("");
      setCategory("milk");
      setPrice("");
      setQuantity("");
    }
  }, [sweet]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {sweet ? "Update Sweet" : "Add Sweet"}
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="milk">Milk</option>
            <option value="dry-fruit">Dry Fruit</option>
            <option value="chocolate">Chocolate</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            className="px-4 py-2 border rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            className="px-4 py-2 border rounded-lg"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-400 text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600">
              {sweet ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SweetFormModal;
