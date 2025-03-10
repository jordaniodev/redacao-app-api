import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.alterTable(`redacoes`, (table) => {

        table.foreign(`users_id`).references(`id`).inTable(`users`);
        table.foreign(`criterios_avaliacao_id`).references(`id`).inTable(`criterios_avaliacao`);
        table.foreign(`temas_id`).references(`id`).inTable(`temas`);
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.alterTable(`redacoes`, (table) => {
        table.dropForeign(`users_id`)
        table.dropForeign(`criterios_avaliacao_id`)
        table.dropForeign(`temas_id`)
    })
}

