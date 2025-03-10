import { IPaginateParams } from "knex-paginate";
import { TemaService } from "./Tema.service";
import { ITemas } from "../../models/Temas.model";

export class TemaController {

    private temaService: TemaService;

    constructor() {
        this.temaService = new TemaService()
    }

    getById(id: string) {
        return this.temaService.getById(id);
    }

    async paginate(params: IPaginateParams) {
        return this.temaService.paginate(params);
    }
 
    async create(data: Omit<ITemas , 'id'>) {
        return this.temaService.create(data)
    }
}