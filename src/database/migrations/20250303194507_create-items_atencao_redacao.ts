import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`items_atencao_redacao`, (table) => {
        table.uuid(`items_atencao_id`).notNullable()
        table.uuid(`redacoes_id`)

        table.foreign(`items_atencao_id`).references(`id`).inTable(`items_atencao`);
        table.foreign(`redacoes_id`).references(`id`).inTable(`redacoes`);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`items_atencao_redacao`)
}

