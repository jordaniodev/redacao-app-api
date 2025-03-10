import knex from "knex";
import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { ITemas } from "../../../models/Temas.model";
import { ITemaRepository } from "./Tema.repository.interface";

export class DbTemaRepository extends DbRepository<ITemas, string> implements ITemaRepository {

    constructor() {
        super(`temas`)
    }

}