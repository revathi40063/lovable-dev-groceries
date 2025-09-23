import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);          // body: { productId, quantity }
router.put("/update/:itemId", updateCartItem); // itemId = productId
router.delete("/remove/:itemId", removeCartItem);

export default router;
