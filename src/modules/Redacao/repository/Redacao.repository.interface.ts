
import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { IRedacao } from "../../../models/Redacao.model";


export interface IRedacaoRepository extends IDbRepository<IRedacao, string> { }