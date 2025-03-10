import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`textos_tema`, (table) => {
        table.uuid(`id`).primary()
        table.text(`conteudo`).notNullable()
        table.uuid(`temas_id`)

        table.foreign(`temas_id`).references(`id`).inTable(`temas`);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`textos_tema`)
}

