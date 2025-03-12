import knex from "knex";
import { IPaginateParams, IWithPagination } from "knex-paginate";

export interface IDbRepository<T, ID> {
    table: string;
    getById: (id: ID, idColumnName?: string, columns?: (keyof T)[]) => Promise<T | undefined>;
    paginate: (params: IPaginateParams, columns?: (keyof T)[] | string) => Promise<IWithPagination<T> | T[]>
    filter: (filters: Partial<T>, columns?: string | keyof T) => Promise<T[] | undefined>;
    getOneBy: (column: keyof T, value: string | number, columns?: (keyof T)[]) => Promise<T | undefined>;
    // delete: (id: ID) => void; @TODO Faze deleção
    create: (data: Omit<T, 'id'>, hasId?: boolean) => Promise<T>;
    update: (id: ID, data: Partial<T>) => Promise<T[] | undefined>; 
}
