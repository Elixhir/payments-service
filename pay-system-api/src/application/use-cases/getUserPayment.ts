import { PaymentRepository } from "../../domain/repositories/payment";

export class GetUserPayments {
  constructor(private paymentRepo: PaymentRepository) {}

  async execute(userId: number) {
    return this.paymentRepo.findByUser(userId);
  }
}
