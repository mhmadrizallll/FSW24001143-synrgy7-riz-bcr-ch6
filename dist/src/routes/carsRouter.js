"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CarsControllers_1 = require("../controllers/CarsControllers");
const router = express_1.default.Router();
router.get("/cars", CarsControllers_1.carsControllers.getCars);
exports.default = router;
