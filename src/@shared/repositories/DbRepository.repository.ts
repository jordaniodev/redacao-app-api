import { IPaginateParams, IWithPagination } from "knex-paginate";
import { knex } from "../../database";
import { IDbRepository } from "./DbRepository.repository.interface";
import { Knex } from "knex";

export abstract class DbRepository<T extends { id: ID }, ID> implements IDbRepository<T, ID> {
    table: string;

    constructor(table) {
        this.table = table;
    }

    getById(id: ID, idColumnName = 'id'): Promise<T | undefined> {
        return knex(this.table).where({
            [idColumnName]: id
        }).first() as Promise<T | undefined>;
    }

    paginate(params: IPaginateParams, columns: (keyof T)[] | string = `*`): Promise<IWithPagination<T> | T[]> {
        if(!params.disabled)
            return knex(this.table)
                .select(columns) 
                .paginate(params) as Promise<IWithPagination<T> | T[]>;
        
        return this.list(columns);
    }

    private list(columns: (keyof T)[] | string = `*`): Promise<T[]> {
        return knex(this.table).select(columns) as Promise<T[]>
    }

    async create(data: Omit<T, 'id'>): Promise<T> {

        const result = await knex(this.table)
            .returning("*")
            .insert({
                ...data,
                id: crypto.randomUUID()
            });

        return result[0] as unknown as T;
    }

    async filter(filters: Partial<T>, columns: string | keyof T = `*`): Promise<T[] | undefined> {
        if (typeof columns === 'string') {
            return knex<T>(this.table).where(filters).select(columns) as Promise<T[] | undefined>;
        } else {
            return knex<T>(this.table).where(filters).select([columns as keyof T]) as Promise<T[] | undefined>;
        }
    }
    
    async getOneBy(column: keyof T, value: string | number): Promise<T> {
        return knex(this.table).where(String(column), value).first()
    }
}