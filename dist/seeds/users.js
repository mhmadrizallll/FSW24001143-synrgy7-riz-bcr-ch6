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
const bcrypt_1 = require("../src/utils/bcrypt");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("users").del();
        // Inserts seed entries
        yield knex("users").insert([
            {
                id: (0, uuid_1.v4)(),
                username: "superadmin",
                email: "superadmin@admin.com",
                password: yield (0, bcrypt_1.encryptPassword)("Superadmin1*"),
                role: "superadmin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "admin",
                email: "admin@admin.com",
                password: yield (0, bcrypt_1.encryptPassword)("Admin1*"),
                role: "admin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member",
                email: "member@admin.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
        ]);
    });
}
exports.seed = seed;
