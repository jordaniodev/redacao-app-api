import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("redacoes", (table) => {
        table.timestamp("paid_at");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("redacoes", (table) => {
        table.dropColumn("paid_at");
    });
}

