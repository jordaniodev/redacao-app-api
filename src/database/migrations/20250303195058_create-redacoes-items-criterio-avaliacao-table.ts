import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`redacoes_items_criterio_avaliacao`, (table) => {
        table.uuid(`redacoes_id`).notNullable()
        table.uuid(`items_criterios_avaliacao_id`).notNullable()
        table.integer(`nota`)

        table.foreign(`redacoes_id`).references(`id`).inTable(`redacoes`);
        table.foreign(`items_criterios_avaliacao_id`).references(`id`).inTable(`items_criterios_avaliacao`);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`redacoes_items_criterio_avaliacao`)
}

