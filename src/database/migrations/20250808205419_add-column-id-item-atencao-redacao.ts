import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("items_atencao_redacao", (table) => {
      table.uuid("id").primary().notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("items_atencao_redacao", (table) => {
      table.dropColumn("id");
  });
}