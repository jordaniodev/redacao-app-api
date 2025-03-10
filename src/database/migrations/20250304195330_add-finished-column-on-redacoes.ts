import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(`redacoes`, (table) => {
        table.boolean(`finished`).nullable().defaultTo(false)
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(`redacoes`, (table) => {
        table.dropColumn(`finished`)
    })
}

