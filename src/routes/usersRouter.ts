import express from "express";
import { userControllers } from "../controllers/UserControllers";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

// access member without token
router.post("/users/register", userControllers.register);
router.post("/users/login", userControllers.login);
router.put("/users/:id", userControllers.updateUser);

// access superadmin and admin with token
router.get("/users", authMiddleware, userControllers.getUsers);
router.post(
  "/users/superadmin/register",
  authMiddleware,
  userControllers.register
);
router.put("/users/superadmin/:id", authMiddleware, userControllers.updateUser);
router.delete("/users/:id", authMiddleware, userControllers.deleteUser);
router.get("/users/me", authMiddleware, userControllers.getCurrentUser);

export default router;
