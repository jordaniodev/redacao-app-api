import { DbRepository } from "../../../@shared/repositories/DbRepository.repository";
import { IPayment } from './../../../models/Payment.model';
import { IPaymentRepository } from './Payment.repository';

export class DbPaymentRepository extends DbRepository<IPayment, string> implements IPaymentRepository {

    constructor() {
        super(`payments`)
    }

}