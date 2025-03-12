import knex from "knex";
import { z } from "zod";
import { validateByDatabase } from "../../@shared/utils/validate-params";

export interface CreateRedacaoData {
    users_email: string;
}
export interface UpdateRedacaoData {
    criterios_avaliacao_id?: string | null;
    temas_id?: string | null;
    conteudo?: string;
}

export const createRedacaoSchema = z.object({
    users_email: z.string().email().superRefine(async (value, ctx) => await validateByDatabase(value, ctx, `users`, `email`))
})

export const updateRedacaoSchema = z.object({
    criterios_avaliacao_id: z.string().uuid().nullish().superRefine(async (value, ctx) => await validateByDatabase(value, ctx, `criterios_avaliacao`, `id`)),
    temas_id: z.string().uuid().nullish().superRefine(async (value, ctx) => await validateByDatabase(value, ctx, `temas`, `id`)),
    conteudo: z.string()
})