import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.alterTable(`temas`, (table) => {
        table.boolean(`is_custom`).nullable().defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.alterTable(`temas`, (table) => {
        table.dropColumn(`is_custom`)
    })
}

