import { Knex } from "knex";
import { v4 } from "uuid";
import { encryptPassword } from "../src/utils/bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: v4(),
      username: "superadmin",
      email: "superadmin@admin.com",
      password: await encryptPassword("Superadmin1*"),
      role: "superadmin",
    },
    {
      id: v4(),
      username: "admin",
      email: "admin@admin.com",
      password: await encryptPassword("Admin1*"),
      role: "admin",
    },
    {
      id: v4(),
      username: "member",
      email: "member@admin.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
  ]);
}
