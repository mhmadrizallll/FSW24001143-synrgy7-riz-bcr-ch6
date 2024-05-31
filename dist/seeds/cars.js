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
exports.seed = void 0;
const uuid_1 = require("uuid");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("cars").del();
        // Inserts seed entries
        yield knex("cars").insert([
            {
                id: (0, uuid_1.v4)(),
                merk: "Toyota",
                type: "Yaris",
                year: 2020,
                status: "available",
            },
            { id: (0, uuid_1.v4)(), merk: "Honda", type: "CRV", year: 2021, status: "available" },
            { id: (0, uuid_1.v4)(), merk: "BMW", type: "X5", year: 2022, status: "available" },
            {
                id: (0, uuid_1.v4)(),
                merk: "Nissan",
                type: "Altima",
                year: 2023,
                status: "available",
            },
            {
                id: (0, uuid_1.v4)(),
                merk: "Ford",
                type: "Mustang",
                year: 2024,
                status: "available",
            },
            {
                id: (0, uuid_1.v4)(),
                merk: "Chevrolet",
                type: "Cruze",
                year: 2025,
                status: "available",
            },
            {
                id: (0, uuid_1.v4)(),
                merk: "Hyundai",
                type: "Elantra",
                year: 2026,
                status: "available",
            },
            { id: (0, uuid_1.v4)(), merk: "Kia", type: "Soul", year: 2027, status: "available" },
            { id: (0, uuid_1.v4)(), merk: "Mazda", type: "CX-5", year: 2028, status: "available" },
            {
                id: (0, uuid_1.v4)(),
                merk: "Jeep",
                type: "Cherokee",
                year: 2029,
                status: "available",
            },
        ]);
    });
}
exports.seed = seed;
