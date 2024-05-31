import express from "express";
import { userControllers } from "../controllers/UserControllers";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

// access member without token
router.post("/login", userControllers.login);

// access superadmin and admin with token
router.get("/", authMiddleware, userControllers.getUsers);
router.post("/register", authMiddleware, userControllers.register);
router.put("/:id", authMiddleware, userControllers.updateUser);
router.delete("/:id", authMiddleware, userControllers.deleteUser);
router.get("/me", authMiddleware, userControllers.getCurrentUser);

export default router;
