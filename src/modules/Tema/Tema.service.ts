import { IPaginateParams } from "knex-paginate";
import { IUser } from "../../models/User.model";
import { ITemaRepository } from "./repository/Tema.repository.interface";
import { DbTemaRepository } from "./repository/Tema.repository";
import { ITemas } from "../../models/Temas.model";
import { DbTextoTemaRepository } from './repository/TextoTemaRepository';
import { ITextoTemaRepository } from "./repository/TextoTema.repository.interface";
import { ITextosTemas } from "../../models/TextosTemas.model";
import { IZodPaginateParams } from "../../@shared/validator/paginate.validator";


export class TemaService {
    private temaRepository: ITemaRepository;
    private textoTemaRepository: ITextoTemaRepository;
    constructor() {
        this.temaRepository = new DbTemaRepository()
        this.textoTemaRepository = new DbTextoTemaRepository()
    }

    async getById(id: string): Promise<ITemas | undefined> {
        const tema = await this.temaRepository.getById(id);

        if (tema)
            tema.textos_tema = await this.textoTemaRepository.filter({ temas_id: tema.id })

        return tema;
    }

    paginate(params: IPaginateParams) {
        return this.temaRepository.paginate(params);
    }

    async create({ nome, textos_tema }: Omit<ITemas, 'id'>) {
        const temaData: Omit<ITemas, 'id'> = {
            is_custom: true,
            nome: nome,
        }
        const tema = await this.temaRepository.create(temaData);
        textos_tema?.forEach((texto) => {
            const textoData: Omit<ITextosTemas, 'id'> = {
                conteudo: texto.conteudo!,
                temas_id: tema.id
            }
            this.textoTemaRepository.create(textoData)
        })

        return this.getById(tema.id);
    }
}