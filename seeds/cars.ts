import { Knex } from "knex";
import { v4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      id: v4(),
      merk: "Toyota",
      type: "Yaris",
      year: 2020,
      status: "available",
    },
    { id: v4(), merk: "Honda", type: "CRV", year: 2021, status: "available" },
    { id: v4(), merk: "BMW", type: "X5", year: 2022, status: "available" },
    {
      id: v4(),
      merk: "Nissan",
      type: "Altima",
      year: 2023,
      status: "available",
    },
    {
      id: v4(),
      merk: "Ford",
      type: "Mustang",
      year: 2024,
      status: "available",
    },
    {
      id: v4(),
      merk: "Chevrolet",
      type: "Cruze",
      year: 2025,
      status: "available",
    },
    {
      id: v4(),
      merk: "Hyundai",
      type: "Elantra",
      year: 2026,
      status: "available",
    },
    { id: v4(), merk: "Kia", type: "Soul", year: 2027, status: "available" },
    { id: v4(), merk: "Mazda", type: "CX-5", year: 2028, status: "available" },
    {
      id: v4(),
      merk: "Jeep",
      type: "Cherokee",
      year: 2029,
      status: "available",
    },
  ]);
}
