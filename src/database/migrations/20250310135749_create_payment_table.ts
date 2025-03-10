import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`payments`, (table) => {
        table.uuid(`id`).primary();
        table.timestamp(`created_at`).notNullable()
        table.timestamp(`expires_at`).notNullable()
        table.timestamp(`txid`).notNullable()
        table.timestamp(`value`).notNullable()
        table.timestamp(`code`).notNullable()
        table.uuid(`redacoes_id`);

        table.foreign(`redacoes_id`).references(`id`).inTable(`redacoes`);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`redacoes`)
}

