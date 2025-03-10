import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { ICriteriosAvaliacao } from './../../../models/CriteriosAvaliacao.model';

export interface ICriteriosAvaliacaoRepository extends IDbRepository<ICriteriosAvaliacao, string>{}