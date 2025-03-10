import { CreateRedacaoData } from "./Redacao.validator";
import { DbRedacaoRepository } from "./repository/Redacao.repository";
import { IRedacaoRepository } from "./repository/Redacao.repository.interface";

export class RedacaoService {
    private redacaoRepository: IRedacaoRepository;

    constructor() {
        this.redacaoRepository = new DbRedacaoRepository();
    }

    create(data: CreateRedacaoData) {
        return this.redacaoRepository.create(data)
    }

    
    async getById(id: string) {
        return await this.redacaoRepository.getById(id);
    }
}