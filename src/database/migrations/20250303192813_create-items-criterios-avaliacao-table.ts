import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`items_criterios_avaliacao`, (table) => {
        table.uuid(`id`).primary()
        table.string(`slug`, 20)
        table.text(`descricao`).notNullable()
        table.uuid(`criterios_avaliacao_id`)


        table.foreign(`criterios_avaliacao_id`).references(`id`).inTable(`criterios_avaliacao`);

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`items_criterios_avaliacao`)
}

