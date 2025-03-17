import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { knex } from '../../database';

type ZodParam<T> = z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny, T, T>;

export  function validateParams<T>(validatorSchemaObject: ZodParam<T>) {
    return async (request: FastifyRequest) => {
        const isBodyMethod = ['POST', 'PUT', 'PATCH'].includes(request.method);
        const data = isBodyMethod ? request.body : request.query;
        const dataValidated = await validatorSchemaObject.parseAsync(data) as T;
        request.body = dataValidated;
        request.query = dataValidated;
    };
}

export function validateIdExistsByRouteParam(table: string) {
    return async (request: FastifyRequest) => {
        const routeParams = request.params as { id: string };
        const { id } = routeParams;

        const idSchema = z.string().uuid().superRefine(async (value, ctx) => await validateByDatabase(value, ctx, table, `id`));

        await idSchema.parseAsync(id);
    };
}

export async function validateByDatabase(value: any, ctx: any, table: string, column: string) {
    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
    if (!value || !isValidUUID ) return;

    const record = await knex(table).where(column, value).first();
    if (!record) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Não existe nenhum registro com '${value}' na coluna '${String(column)}' da tabela '${table}'.`
        });
    }
}