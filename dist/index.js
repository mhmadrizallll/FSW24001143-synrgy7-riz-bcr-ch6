"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
const objection_1 = require("objection");
const routes_1 = __importDefault(require("./src/routes"));
dotenv_1.default.config();
const knekInstance = (0, knex_1.default)({
    client: "pg",
    connection: {
        user: "postgres",
        password: "1",
        port: 5432,
        host: "127.0.0.1",
        database: "db_ch6",
    },
});
objection_1.Model.knex(knekInstance);
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
