import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { IItemsAtencao } from "../../../models/ItemsAtencao.model";
import { IRedacaoItemAtencaoRepository } from "./RedacaoItemAtencao.repository.interface";


export class DbRedacaoItemAtencaoRepository extends DbRepository<IItemsAtencao, string> implements IRedacaoItemAtencaoRepository {

    constructor() {
        super(`items_atencao`)
    }

}