import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    DATABASE_HOST: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PORT: z.number().default(5433),
    PORT: z.number().default(3002),
    EFI_BANK_API_CLIENT_ID: z.string(),
    EFI_BANK_API_CLIENT_SECRET: z.string(),
    EFI_BANK_API_ENV: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
})

export const _env = envSchema.safeParse(process.env)

if(!_env.success){
    console.error(`😒 Invalid enviroment variables`, _env.error.format())
    throw new Error(`😒 Invalid enviroment variables`)
}

export const env = _env.data