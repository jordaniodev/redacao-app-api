import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { IItemsCriterioAvaliacao } from "../../../models/ItemsCriterioAvaliacao.model";
import { IItemsCriteriosAvaliacaoRepository } from "./ItemCriterioAvaliacao.repository.interface";


export class DbItemsCriteriosAvaliacaoRepository extends DbRepository<IItemsCriterioAvaliacao, string> implements IItemsCriteriosAvaliacaoRepository {

    constructor() {
        super(`items_criterios_avaliacao`)
    }

}