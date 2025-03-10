import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`users`, (table) => {
        table.uuid(`id`).primary();
        table.string(`email`, 255).notNullable().unique();
        table.uuid(`utm_tracking_id`);
    
        table.foreign(`utm_tracking_id`).references(`id`).inTable(`utm_tracking`);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`users`)
}

