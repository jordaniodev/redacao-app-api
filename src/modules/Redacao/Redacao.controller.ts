import { IRedacao } from "../../models/Redacao.model";
import { RedacaoService } from "./Redacao.service";
import { CreateRedacaoData, UpdateRedacaoData } from "./Redacao.validator";
import { UserService } from './../User/User.service';

export class RedacaoController {

    private redacaoService: RedacaoService;
    private userService: UserService;

    constructor() {
        this.redacaoService = new RedacaoService();
        this.userService = new UserService();
    }

    async create({ users_email }: CreateRedacaoData) {
        const user = await this.userService.firstOrCreate({ email: users_email });
        return this.redacaoService.create({ users_id: user?.id })
    }

    async getById(id: string) {
        return await this.redacaoService.getById(id);
    }

    async update(id: string, data: UpdateRedacaoData) {
        return await this.redacaoService.update(id, data)
    }

    async correct(id: string) {
        return await this.redacaoService.toCorrect(id);
    }
}