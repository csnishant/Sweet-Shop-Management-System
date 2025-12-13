import express from "express";
import { addSweet, getAllSweets, purchaseSweet, restockSweet, searchSweets } from "../controllers/sweetController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/sweets", protect, addSweet);

router.get("/sweets", protect, getAllSweets);
router.get("/sweets/search", protect, searchSweets);

router.post("/sweets/:id/purchase", protect, purchaseSweet);
router.post("/sweets/:id/restock", protect, adminMiddleware, restockSweet);

export default router;
