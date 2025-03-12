
import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { IRedacaoItemsCriterioAvaliacao } from './../../../models/RedacaoItemsCriterioAvaliacao.model';


export interface IRedacaoItemCriterioAvaliacaoRepository extends IDbRepository<IRedacaoItemsCriterioAvaliacao, string> { }