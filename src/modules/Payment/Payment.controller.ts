import { PaymentService } from "./Payment.service";

export class PaymentController {

    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService()
    }

    
}