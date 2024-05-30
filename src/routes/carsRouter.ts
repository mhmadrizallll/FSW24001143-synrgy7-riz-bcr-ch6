import express from "express";
import { carsControllers } from "../controllers/CarsControllers";
const router = express.Router();

router.get("/cars", carsControllers.getCars);

export default router;
