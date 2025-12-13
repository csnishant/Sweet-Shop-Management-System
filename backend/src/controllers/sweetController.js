import Sweet from "../models/sweet.js";

export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const sweetExists = await Sweet.findOne({ name });
    if (sweetExists) {
      return res.status(409).json({
        success: false,
        message: "Sweet already exists",
      });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Sweet added successfully",
      data: sweet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
