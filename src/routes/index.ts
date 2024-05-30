import express from "express";
import usersRouter from "./usersRouter";
import carsRouter from "./carsRouter";
const router = express.Router();

router.use("/api", usersRouter);
router.use("/api", carsRouter);

export default router;
