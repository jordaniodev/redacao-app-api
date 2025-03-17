import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'
import { attachPaginate } from 'knex-paginate'

export const config: Knex.Config = {
    client: 'pg',
    connection: {
        host: env.DATABASE_HOST,
        port: env.DATABASE_PORT,
        user: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD,
        database: env.DATABASE_NAME
    },
    migrations: {
        extension: 'ts',
        directory : env.NODE_ENV === `development` ? './src/database/migrations' : `./database/migrations`
    }
}
export const knex = setupKnex(config)
attachPaginate();
