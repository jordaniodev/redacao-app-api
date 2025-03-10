import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`items_atencao`, (table) => {
        table.uuid(`id`).primary()
        table.string(`nome`, 200).notNullable()
        table.text(`descricao`).notNullable()
        table.text(`como_melhorar`)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`items_atencao`)
}

