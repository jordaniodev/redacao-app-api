import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { ITemas } from "../../../models/Temas.model";

export interface ITemaRepository extends IDbRepository<ITemas, string>{}