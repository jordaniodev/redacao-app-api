import { IPaginateParams } from "knex-paginate";
import { UserService } from "./User.service";
import { IUser } from "../../models/User.model";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService()
    }


    async getById(id: string) {
        return await this.userService.getById(id);
    }

    async paginate(params: IPaginateParams) {
        return this.userService.paginate(params);
    }

    async firstOrCreate(user: Omit<IUser, 'id'>) {
        return this.userService.firstOrCreate(user);
    }
}