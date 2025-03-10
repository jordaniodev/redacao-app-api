import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { IUser } from "../../../models/User.model";

export interface IUserRepository extends IDbRepository<IUser, string>{}