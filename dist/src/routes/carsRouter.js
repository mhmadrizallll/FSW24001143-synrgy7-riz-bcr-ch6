"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CarsControllers_1 = require("../controllers/CarsControllers");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get("/cars", CarsControllers_1.carsControllers.getCars);
// access superadmin and admin with token
router.get("/cars/superadmin", authMiddleware_1.default, CarsControllers_1.carsControllers.getCars);
router.post("/cars", authMiddleware_1.default, CarsControllers_1.carsControllers.create);
router.put("/cars/:id", authMiddleware_1.default, CarsControllers_1.carsControllers.update);
router.delete("/cars/:id", authMiddleware_1.default, CarsControllers_1.carsControllers.softDelete);
router.post("/cars/restore/:id", authMiddleware_1.default, CarsControllers_1.carsControllers.restore);
exports.default = router;
