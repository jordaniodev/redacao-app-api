
import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { IItemsAtencao } from "../../../models/ItemsAtencao.model";


export interface IRedacaoItemAtencaoRepository extends IDbRepository<IItemsAtencao, string> {
}