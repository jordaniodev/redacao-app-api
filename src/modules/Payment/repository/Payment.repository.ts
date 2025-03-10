import { IDbRepository } from "../../../@shared/repositories/DbRepository.repository.interface";
import { ICriteriosAvaliacao } from './../../../models/CriteriosAvaliacao.model';
import { IPayment } from './../../../models/Payment.model';

export interface IPaymentRepository extends IDbRepository<IPayment, string>{}