import { IPaginateParams } from "knex-paginate";
import { z } from "zod";

export interface IZodPaginateParams {
    perPage?: number | string;
    currentPage?: number | string;
    isFromStart?: boolean;
    isLengthAware?: boolean;
    disabled?: boolean | string;
}

export const paginateValidatorSchema = z.object({
    perPage: z.string()
        .optional()
        .default('10')
        .transform(value => Number(value))
        .refine(value => !isNaN(value), {
            message: "PerPage must be a valid number",
        })
        .superRefine((value, ctx) => {
            if (value > 20)
                ctx.addIssue({
                    code: z.ZodIssueCode.too_big,
                    maximum: 20,
                    type: 'number',
                    inclusive: true,
                    message: "PerPage must not exceed 20",
                });
        }),
    currentPage: z.string()
        .optional()
        .default('1')
        .transform(value => Number(value))
        .refine(value => !isNaN(value), {
            message: "CurrentPage must be a valid number",
        }),
    disabled: z.string()
        .optional()
        .default(`0`)
        .transform(value => {
            return [1, "1", true, "true"].includes(value)
        }),
});
