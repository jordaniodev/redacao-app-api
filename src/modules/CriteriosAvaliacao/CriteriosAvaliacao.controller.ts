import { IPaginateParams } from "knex-paginate";
import { IUser } from "../../models/User.model";
import { CriteriosAvaliacaoService } from "./CriteriosAvaliacao.service";

export class CriteriosAvaliacaoController {
    private criteriosAvaliacaoService: CriteriosAvaliacaoService;

    constructor() {
        this.criteriosAvaliacaoService = new CriteriosAvaliacaoService()
    }

    async getById(id: string) {
        return await this.criteriosAvaliacaoService.getById(id);
    }

    async paginate(params: IPaginateParams) {
        return this.criteriosAvaliacaoService.paginate(params);
    }
}