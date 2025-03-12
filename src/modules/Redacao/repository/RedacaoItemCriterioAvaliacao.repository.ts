import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { IRedacaoItemsCriterioAvaliacao } from "../../../models/RedacaoItemsCriterioAvaliacao.model";
import { IRedacaoItemCriterioAvaliacaoRepository } from "./RedacaoItemCriterioAvaliacao.repository.interface";


export class DbRedacaoItemCriterioAvaliacaoRepository extends DbRepository<IRedacaoItemsCriterioAvaliacao, string> implements IRedacaoItemCriterioAvaliacaoRepository {

    constructor() {
        super(`redacoes_items_criterio_avaliacao`)
    }

}