import { RedacaoService } from "./Redacao.service";
import { CreateRedacaoData } from "./Redacao.validator";

export class RedacaoController {

    private redacaoService: RedacaoService;

    constructor() {
        this.redacaoService = new RedacaoService();
    }

    create(data: CreateRedacaoData) {
        return this.redacaoService.create(data)
    }


    async getById(id: string) {
        return await this.redacaoService.getById(id);
    }
}