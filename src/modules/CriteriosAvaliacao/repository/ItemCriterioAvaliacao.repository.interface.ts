import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { IItemsCriterioAvaliacao } from "../../../models/ItemsCriterioAvaliacao.model";
import { ICriteriosAvaliacao } from './../../../models/CriteriosAvaliacao.model';

export interface IItemsCriteriosAvaliacaoRepository extends IDbRepository<IItemsCriterioAvaliacao, string>{}