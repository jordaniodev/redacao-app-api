import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { IItemsAtencaoRedacao } from "../../../models/ItemsAtencaoRedacao.model";
import { IItemAtencaoRedacaoRepository } from "./ItemAtencaoRedacao.repository.interface";


export class DbItemAtencaoRedacaoRepository extends DbRepository<IItemsAtencaoRedacao, string> implements IItemAtencaoRedacaoRepository {

    constructor() {
        super(`items_atencao_redacao`);
    }

}