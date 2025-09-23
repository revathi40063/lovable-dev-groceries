import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createCoupon, getCoupons, updateCoupon, deleteCoupon } from "../controllers/adminController.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.use(protect, admin);

router.post("/coupon", createCoupon);
router.get("/coupon", getCoupons);
router.put("/coupon/:id", updateCoupon);
router.delete("/coupon/:id", deleteCoupon);

// quick product create endpoint for admins
router.post("/product", createProduct);

export default router;
