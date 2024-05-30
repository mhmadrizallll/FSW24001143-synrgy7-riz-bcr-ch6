import express, { Express, Response } from "express";
import knex from "knex";
import dotenv from "dotenv";
import { Model } from "objection";
import router from "./src/routes";

dotenv.config();

const knekInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "1",
    port: 5432,
    host: "127.0.0.1",
    database: "db_ch6",
  },
});
Model.knex(knekInstance);
const app: Express = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
