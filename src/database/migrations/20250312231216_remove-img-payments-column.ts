import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("payments", (table) => {
        table.dropColumn("img");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("payments", (table) => {
        table.text("img");
    });
}

