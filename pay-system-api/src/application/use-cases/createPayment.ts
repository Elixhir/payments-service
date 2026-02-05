import { PaymentRepository } from "../../domain/repositories/payment";
import { CardRepository } from "../../domain/repositories/card";
import { UserRepository } from "../../domain/repositories/user";
import { PaymentGateway } from "../../domain/repositories/payment";
import { Payment } from "../../domain/entities/payment";
import { Money } from "../../domain/value-objects/money";
import { CreatePaymentDTO } from "../dtos/createPaymentDto";

export class CreatePayment {
  constructor(
    private paymentRepo: PaymentRepository,
    private cardRepo: CardRepository,
    private userRepo: UserRepository,
    private gateway: PaymentGateway
  ) {}

  async execute(data: CreatePaymentDTO) {
    const user = await this.userRepo.findById(data.userId);
    if (!user) throw new Error("User not found");

    const card = await this.cardRepo.findById(data.cardId);
    if (!card) throw new Error("Card not found");

    if (card.userId !== user.id) throw new Error("Card does not belong to user");

    const payment = new Payment(
      null,
      data.userId,
      data.cardId,
      new Money(data.amount)
    );

    const savedPayment = await this.paymentRepo.create(payment);

    const status = await this.gateway.process(payment.amount.amount);

    savedPayment.status = status;
    return this.paymentRepo.update(savedPayment);
  }
}
