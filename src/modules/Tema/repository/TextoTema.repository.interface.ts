import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { ITextosTemas } from "../../../models/TextosTemas.model";

export interface ITextoTemaRepository extends IDbRepository<ITextosTemas, string>{}