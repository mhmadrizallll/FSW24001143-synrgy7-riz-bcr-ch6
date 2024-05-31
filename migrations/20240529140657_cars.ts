import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table) => {
    table.string("id", 255).primary();
    table.string("merk", 255).notNullable();
    table.string("type", 255).notNullable();
    table.integer("year").notNullable();
    table
      .enum("status", ["available", "rented"])
      .defaultTo("available")
      .notNullable();
    table.string("created_by", 255).nullable();
    table.string("updated_by", 255).nullable();
    table.string("deleted_by", 255).nullable();
    table.string("restored_by", 255).nullable();
    table.timestamps(true, true);
    table.boolean("is_deleted").defaultTo(false).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
