import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(`redacoes`, (table) => {
        table.integer(`nota`).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(`redacoes`, (table) => {
        table.dropColumn(`nota`)
    })
}

