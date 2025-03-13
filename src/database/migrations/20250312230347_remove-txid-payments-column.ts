import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("payments", (table) => {
        table.text("code").alter();
        table.uuid("redacoes_id").alter();
        table.timestamp("expires_at").alter();
        table.text("img");
    });
    
}


export async function down(knex: Knex): Promise<void> {
}

