import { IPaymentRepository } from "./repository/Payment.repository";
import { DbPaymentRepository } from "./repository/Payment.repository.interface";

export class PaymentService {
    private paymentRepository: IPaymentRepository;

    constructor(){
        this.paymentRepository = new DbPaymentRepository();
    }


}