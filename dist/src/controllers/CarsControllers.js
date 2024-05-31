"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsControllers = void 0;
const CarService_1 = require("../services/CarService");
const uuid_1 = require("uuid");
class CarsControllers {
    getCars(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            console.log("ini adalah user", role);
            try {
                let cars;
                if (role === "superadmin" || role === "admin") {
                    cars = yield CarService_1.carService.getAllCars();
                    res.status(200).json({
                        status: true,
                        message: "Cars Available",
                        data: cars,
                    });
                }
                else {
                    cars = yield CarService_1.carService.getCarIsDeletedFalse();
                    res.status(200).json({
                        status: true,
                        message: "Cars Available",
                        data: cars,
                    });
                }
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { merk, type, year, status } = req.body;
            const user = req.user;
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            console.log("ini adalah user", user);
            try {
                if (!merk || !type || !year) {
                    return res.status(400).json({
                        status: false,
                        message: "All fields are required",
                    });
                }
                if (role !== "superadmin" && role !== "admin") {
                    return res.status(401).json({
                        status: false,
                        message: "Access forbidden",
                    });
                }
                const payload = {
                    id: (0, uuid_1.v4)(),
                    merk,
                    type,
                    year,
                    status,
                    created_by: user.username,
                };
                const car = yield CarService_1.carService.createCar(payload);
                res.status(200).json({
                    status: true,
                    message: "Car created",
                    data: payload,
                });
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { merk, type, year, status } = req.body;
            const { id } = req.params;
            const user = req.user;
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            try {
                if (!merk || !type || !year) {
                    return res.status(400).json({
                        status: false,
                        message: "All fields are required",
                    });
                }
                if (role !== "superadmin" && role !== "admin") {
                    return res.status(401).json({
                        status: false,
                        message: "Access forbidden",
                    });
                }
                const payload = {
                    merk,
                    type,
                    year,
                    status,
                    updated_by: user.username,
                    updated_at: new Date(),
                };
                const car = yield CarService_1.carService.updateCar(id, payload);
                res.status(200).json({
                    status: true,
                    message: "Car updated",
                    data: {
                        id: car.id,
                        merk: car.merk,
                        type: car.type,
                        year: car.year,
                        status: car.status,
                        updated_by: car.updated_by,
                    },
                });
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    softDelete(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user;
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            try {
                const car = yield CarService_1.carService.softDeleteCar(id, user.username);
                if (role !== "superadmin" && role !== "admin") {
                    return res.status(401).json({
                        status: false,
                        message: "Access forbidden",
                    });
                }
                if (car) {
                    res.status(200).json({
                        status: true,
                        message: "Car deleted",
                        data: {
                            id: car.id,
                            merk: car.merk,
                            type: car.type,
                            year: car.year,
                            status: car.status,
                            is_deleted: car.is_deleted,
                        },
                    });
                }
                else {
                    res.status(404).json({
                        status: false,
                        message: "Car not found or already deleted",
                    });
                }
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    restore(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user;
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            try {
                const car = yield CarService_1.carService.restoreCar(id, user.username);
                if (role !== "superadmin" && role !== "admin") {
                    return res.status(401).json({
                        status: false,
                        message: "Access forbidden",
                    });
                }
                if (car) {
                    res.status(200).json({
                        status: true,
                        message: "Car restored",
                        data: {
                            id: car.id,
                            merk: car.merk,
                            type: car.type,
                            year: car.year,
                            status: car.status,
                            restored_by: car.restored_by,
                        },
                    });
                }
                else {
                    res.status(404).json({
                        status: false,
                        message: "Car not found or already restored",
                    });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: false, message: err });
            }
        });
    }
}
const carsControllers = new CarsControllers();
exports.carsControllers = carsControllers;
