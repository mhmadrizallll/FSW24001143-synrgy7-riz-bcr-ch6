import express from "express";
import { carsControllers } from "../controllers/CarsControllers";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

router.get("/cars", carsControllers.getCars);

// access superadmin and admin with token
router.get("/cars/superadmin", authMiddleware, carsControllers.getCars);
router.post("/cars", authMiddleware, carsControllers.create);
router.put("/cars/:id", authMiddleware, carsControllers.update);
router.delete("/cars/:id", authMiddleware, carsControllers.softDelete);
router.post("/cars/restore/:id", authMiddleware, carsControllers.restore);

export default router;
