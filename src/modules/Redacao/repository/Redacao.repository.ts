import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { IRedacao } from "../../../models/Redacao.model";
import { IRedacaoRepository } from "./Redacao.repository.interface";


export class DbRedacaoRepository extends DbRepository<IRedacao, string> implements IRedacaoRepository {

    constructor() {
        super(`redacoes`)
    }

}