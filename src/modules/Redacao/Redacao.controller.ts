import { IRedacao } from "../../models/Redacao.model";
import { RedacaoService } from "./Redacao.service";
import { CreateRedacaoData, UpdateRedacaoData } from "./Redacao.validator";
import { UserService } from './../User/User.service';
import { PaymentService } from "../Payment/Payment.service";

export class RedacaoController {

    private redacaoService: RedacaoService;
    private userService: UserService;
    private paymentService: PaymentService;

    constructor() {
        this.redacaoService = new RedacaoService();
        this.userService = new UserService();
        this.paymentService = new PaymentService();
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
        this.paymentService.create({
            redacoes_id: id
        }).then((response) => console.log(response));
        
        return await this.redacaoService.toCorrect(id);
    }
}