import { IPaginateParams } from "knex-paginate";
import { IUser } from "../../models/User.model";
import { ICriteriosAvaliacaoRepository } from "./repository/CriteriosAvaliacao.repository.interface";
import { DbCriteriosAvaliacaoRepository } from "./repository/CriteriosAvaliacao.repository";
import { ICriteriosAvaliacao } from "../../models/CriteriosAvaliacao.model";
import { IItemsCriteriosAvaliacaoRepository } from "./repository/ItemCriterioAvaliacao.repository.interface";
import { DbItemsCriteriosAvaliacaoRepository } from "./repository/ItemCriterioAvaliacao.repository";


export class CriteriosAvaliacaoService {
    private criteriosAvaliacaoRepository: ICriteriosAvaliacaoRepository;
    private itemsCriteriosAvaliacaoRepository: IItemsCriteriosAvaliacaoRepository;

    constructor() {
        this.criteriosAvaliacaoRepository = new DbCriteriosAvaliacaoRepository()
        this.itemsCriteriosAvaliacaoRepository = new DbItemsCriteriosAvaliacaoRepository()
    }

    async getById(id: string): Promise<ICriteriosAvaliacao | undefined> {
            const criterioAvaliacao = await this.criteriosAvaliacaoRepository.getById(id);
    
            if (criterioAvaliacao)
                criterioAvaliacao.items_criterios_avaliacao = await this.itemsCriteriosAvaliacaoRepository.filter({ criterios_avaliacao_id: criterioAvaliacao.id })
    
            return criterioAvaliacao;
        }

    paginate(params: IPaginateParams) {
        return this.criteriosAvaliacaoRepository.paginate(params);
    }

}