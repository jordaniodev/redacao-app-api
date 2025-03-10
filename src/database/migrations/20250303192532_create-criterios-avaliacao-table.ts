import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`criterios_avaliacao`, (table) => {
        table.uuid(`id`).primary()
        table.string(`nome`, 200).notNullable()
        table.text(`descricao`).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`criterios_avaliacao`)
}

