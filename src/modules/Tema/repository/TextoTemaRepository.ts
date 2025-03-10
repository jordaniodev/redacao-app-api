import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { ITextosTemas } from "../../../models/TextosTemas.model";
import { ITextoTemaRepository } from './TextoTema.repository.interface';

export class DbTextoTemaRepository extends DbRepository<ITextosTemas, string> implements ITextoTemaRepository {

    constructor() {
        super(`textos_tema`)
    }

}