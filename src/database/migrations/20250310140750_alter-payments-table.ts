import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("payments", (table) => {
        table.dropColumn("txid");
    });

    await knex.schema.alterTable("payments", (table) => {
        table.text("value").notNullable().alter();
    });

    await knex("payments").update("value", "0");

    await knex.schema.alterTable("payments", (table) => {
        table.decimal("value", 10, 2).notNullable().alter();
        table.string("code").notNullable().alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("payments", (table) => {
        table.timestamp("txid").notNullable();
        table.timestamp("value").notNullable().alter();
        table.timestamp("code").notNullable().alter();
    });
}