import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`redacoes`, (table) => {
        table.uuid(`id`).primary()
        table.uuid(`users_id`).notNullable()
        table.uuid(`criterios_avaliacao_id`)
        table.uuid(`temas_id`)
    })

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`redacoes`)
}

