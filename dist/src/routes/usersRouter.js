"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserControllers_1 = require("../controllers/UserControllers");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// access member without token
router.post("/login", UserControllers_1.userControllers.login);
// access superadmin and admin with token
router.get("/", authMiddleware_1.default, UserControllers_1.userControllers.getUsers);
router.post("/register", authMiddleware_1.default, UserControllers_1.userControllers.register);
router.put("/:id", authMiddleware_1.default, UserControllers_1.userControllers.updateUser);
router.delete("/:id", authMiddleware_1.default, UserControllers_1.userControllers.deleteUser);
router.get("/me", authMiddleware_1.default, UserControllers_1.userControllers.getCurrentUser);
exports.default = router;
