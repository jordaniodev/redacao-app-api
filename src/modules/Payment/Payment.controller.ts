import { RedacaoService } from "../Redacao/Redacao.service";
import { PaymentService } from "./Payment.service";
import { ResponsePixPaymentWebhook } from "./Payment.service.type";

export class PaymentController {

    private paymentService: PaymentService;
    private redacaoService: RedacaoService;

    constructor() {
        this.paymentService = new PaymentService()
        this.redacaoService = new RedacaoService()
    }

    async payRedacao(txid: string) {
        const paymentData = await this.paymentService.getByTxId(txid);
        if(paymentData) {
            this.paymentService.update(paymentData.id, {
                paid_at: new Date().toISOString(),
            })

            this.redacaoService.update(paymentData.redacoes_id, {
                paid_at: new Date().toISOString(),
            })
        }
    }   
}