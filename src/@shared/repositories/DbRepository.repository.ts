import { IPaginateParams, IWithPagination } from "knex-paginate";
import { knex } from "../../database";
import { IDbRepository } from "./DbRepository.repository.interface";
import { Knex } from "knex";

export abstract class DbRepository<T extends { id: ID }, ID> implements IDbRepository<T, ID> {
    table: string;

    constructor(table: string) {
        this.table = table;
    }

    getById(id: ID, idColumnName = 'id', columns?: (keyof T)[]): Promise<T | undefined> {
        return knex(this.table).select(columns || `*`).where({
            [idColumnName]: id
        }).first() as Promise<T | undefined>;
    }

    paginate(params: IPaginateParams, columns: (keyof T)[] | string = `*`): Promise<IWithPagination<T> | T[]> {
        if (!params.disabled)
            return knex(this.table)
                .select(columns)
                .paginate(params) as Promise<IWithPagination<T> | T[]>;

        return this.list(columns);
    }

    private list(columns: (keyof T)[] | string = `*`): Promise<T[]> {
        return knex(this.table).select(columns) as Promise<T[]>
    }

    async create(data: Omit<T, 'id'>, hasId = true): Promise<T> {

        const createData = !hasId ? data : { ...data, id: crypto.randomUUID() };
        const result = await knex(this.table)
            .returning("*")
            .insert(createData);

        return result[0] as unknown as T;
    }

    async filter(filters: Partial<T>, columns: string | keyof T = `*`): Promise<T[] | undefined> {
        if (typeof columns === 'string') {
            return knex<T>(this.table).where(filters).select(columns) as Promise<T[] | undefined>;
        } else {
            return knex<T>(this.table).where(filters).select([columns as keyof T]) as Promise<T[] | undefined>;
        }
    }

    async getOneBy(column: keyof T, value: string | number, columns?: (keyof T)[]): Promise<T> {
        return knex(this.table).select(columns || `*`).where(String(column), value).first()
    }

    async update(id: ID, data: Partial<T>): Promise<T[] | undefined> {
        return await knex(this.table)
            .where({ id })
            .first()
            .update(data, `*`) as unknown as Promise<T[] | undefined>;
    }
}