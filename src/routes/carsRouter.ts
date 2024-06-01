import express from "express";
import { carsControllers } from "../controllers/CarsControllers";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", authMiddleware, carsControllers.getCars);
router.post("/", authMiddleware, carsControllers.create);
router.put("/:id", authMiddleware, carsControllers.update);
router.delete("/:id", authMiddleware, carsControllers.softDelete);
router.post("/restore/:id", authMiddleware, carsControllers.restore);

export default router;
