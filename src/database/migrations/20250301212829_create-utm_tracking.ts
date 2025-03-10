import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`utm_tracking`, (table) => {
        table.uuid(`id`).primary()
        table.string(`source`, 200)
        table.string(`content`, 200)
        table.string(`campaing`, 200)
        table.string(`term`, 200)
        table.string(`medium`, 200)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(`utm_tracking`)
}

