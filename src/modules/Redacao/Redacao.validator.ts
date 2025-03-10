import knex from "knex";
import { z } from "zod";
import { validateByDatabase } from "../../@shared/utils/validate-params";

export interface CreateRedacaoData {
    users_id: string;
}

export const createRedacaoSchema = z.object({
    users_id: z.string().uuid().superRefine(async (value, ctx) => await validateByDatabase(value, ctx, `users`, `id`))
})