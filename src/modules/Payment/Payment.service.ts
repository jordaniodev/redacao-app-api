import { IPayment } from "../../models/Payment.model";
import { IPaymentRepository } from "./repository/Payment.repository";
import { DbPaymentRepository } from "./repository/Payment.repository.interface";
import efiCrendentials from "../../env/efiCrendentials";
import EfiPay from "sdk-node-apis-efi";

export class PaymentService {
    private paymentRepository: IPaymentRepository;

    constructor() {
        this.paymentRepository = new DbPaymentRepository();
    }

    async create(payment: Partial<IPayment>) {
        try {
            const efiPay = new EfiPay(efiCrendentials)
            const paymentEfiData = await efiPay.pixCreateImmediateCharge({}, {
                "calendario": {
                    "expiracao": 3600
                },
                "valor": {
                    "original": "2.99",
                },
                "chave": "e4e80616-13d6-4e08-bcd5-a6059f52d443",
                "solicitacaoPagador": "Redação Avulsa"
            })

            const paymentCreated = await this.paymentRepository.create({
                created_at: new Date().toISOString(),
                redacoes_id: payment.redacoes_id!,
                txid: paymentEfiData.txid,
                value: 2.99
            });          

            const qrCode = await efiPay.pixGenerateQRCode({ id: paymentEfiData.loc.id })
            const paymentUpdated = this.paymentRepository.update(paymentCreated.id, {
                code: paymentEfiData.pixCopiaECola,
                expires_at: new Date(Date.now() + 3500).toISOString(),
                image: qrCode.imagemQrcode
            })

            return paymentUpdated;

        } catch (e) {
            return e;
        }
    }

    getByTxId(txId: string){
        return this.paymentRepository.getOneBy(`txid`, txId);
    }

    update(id:string, data: Partial<IPayment>){
        return this.paymentRepository.update(id, data);
    }

}