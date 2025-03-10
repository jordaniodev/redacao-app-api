import { IPaginateParams } from "knex-paginate";
import { IUser } from "../../models/User.model";
import { DbUserRepository } from "./repository/User.repository";
import { IUserRepository } from "./repository/User.repository.interface";

export class UserService {
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new DbUserRepository()
    }

    getById(id: string): Promise<IUser | undefined> {
        return this.userRepository.getById(id);
    }

    paginate(params: IPaginateParams) {
        return this.userRepository.paginate(params);
    }

    getOneBy(column: keyof IUser, value: string){
        return this.userRepository.getOneBy(column, value)
    }
    create(user) {
        return this.userRepository.create(user);
    }

    async firstOrCreate(user: Omit<IUser, 'id'>){
        const existUser = await this.getOneBy(`email`, user.email)
        if(existUser)
            return existUser;

        return this.create(user)
    }
}