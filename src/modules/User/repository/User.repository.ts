import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { IUser } from "../../../models/User.model";
import { IUserRepository } from './User.repository.interface';

export class DbUserRepository extends DbRepository<IUser, string> implements IUserRepository {

    constructor() {
        super(`users`)
    }

}