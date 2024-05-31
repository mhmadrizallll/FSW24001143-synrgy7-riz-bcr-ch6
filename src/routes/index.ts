import express from "express";
import usersRouter from "./usersRouter";
import carsRouter from "./carsRouter";
import { carsControllers } from "../controllers/CarsControllers";
const router = express.Router();

router.use("/api", usersRouter);
router.use("/api", carsRouter);

export default router;
