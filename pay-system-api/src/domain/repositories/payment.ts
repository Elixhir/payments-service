import { Payment } from "../entities/payment";
import { PaymentStatus } from "../entities/payment";

export interface PaymentRepository {
  create(payment: Payment): Promise<Payment>;
  update(payment: Payment): Promise<Payment>;
  findByUser(userId: number): Promise<Payment[]>;
}

export interface PaymentGateway {
  process(amount: number): Promise<PaymentStatus>;
}
