import express from "express";
import { userControllers } from "../controllers/UserControllers";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

router.get("/users", authMiddleware, userControllers.getUsers);
router.post("/users/admin/register", authMiddleware, userControllers.register);
router.post("/users/register", userControllers.register);
router.post("/users/login", userControllers.login);
router.put("/users/admin/:id", authMiddleware, userControllers.updateUser);
router.put("/users/:id", userControllers.updateUser);
router.delete("/users/:id", authMiddleware, userControllers.deleteUser);
router.get("/users/me", authMiddleware, userControllers.getCurrentUser);

export default router;
