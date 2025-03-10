import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { ICriteriosAvaliacao } from "../../../models/CriteriosAvaliacao.model";
import { ICriteriosAvaliacaoRepository } from "./CriteriosAvaliacao.repository.interface";


export class DbCriteriosAvaliacaoRepository extends DbRepository<ICriteriosAvaliacao, string> implements ICriteriosAvaliacaoRepository {

    constructor() {
        super(`criterios_avaliacao`)
    }

}