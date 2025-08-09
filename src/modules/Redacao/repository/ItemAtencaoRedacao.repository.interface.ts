
import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { IItemsAtencaoRedacao } from "../../../models/ItemsAtencaoRedacao.model";


export interface IItemAtencaoRedacaoRepository extends IDbRepository<IItemsAtencaoRedacao, string> { }