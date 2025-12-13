import express from "express";
import { addSweet } from "../controllers/sweetController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/sweets", protect, addSweet);

export default router;
