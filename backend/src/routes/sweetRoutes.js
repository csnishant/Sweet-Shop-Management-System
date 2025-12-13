import express from "express";
import { addSweet, deleteSweet, getAllSweets, purchaseSweet, restockSweet, searchSweets, updateSweet } from "../controllers/sweetController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
const router = express.Router();

//sweets
router.post("/sweets", protect, addSweet);
router.get("/sweets", protect, getAllSweets);
router.get("/sweets/search", protect, searchSweets);
router.put("/sweets/:id", protect, updateSweet);
router.delete("/sweets/:id", protect, adminMiddleware, deleteSweet);

//Invebtory
router.post("/sweets/:id/purchase", protect, purchaseSweet);
router.post("/sweets/:id/restock", protect, adminMiddleware, restockSweet);

export default router;
