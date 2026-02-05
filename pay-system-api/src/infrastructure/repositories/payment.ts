import { prisma } from "../db/prismaClient";
import { PaymentRepository } from "../../domain/repositories/payment";
import { Payment } from "../../domain/entities/payment";
import { Money } from "../../domain/value-objects/money";

export class PrismaPaymentRepository implements PaymentRepository {
  async create(payment: Payment): Promise<Payment> {
    const created = await prisma.payment.create({
      data: {
        userId: payment.userId,
        cardId: payment.cardId,
        amount: payment.amount.amount,
        status: payment.status,
      },
    });

    return new Payment(
      created.id,
      created.userId,
      created.cardId,
      new Money(created.amount),
      created.status,
      created.createdAt
    );
  }

  async update(payment: Payment): Promise<Payment> {
    const updated = await prisma.payment.update({
      where: { id: payment.id! },
      data: { status: payment.status },
    });

    return new Payment(
      updated.id,
      updated.userId,
      updated.cardId,
      new Money(updated.amount),
      updated.status,
      updated.createdAt
    );
  }

  async findByUser(userId: number): Promise<Payment[]> {
    const payments = await prisma.payment.findMany({ where: { userId } });

    return payments.map(
      p =>
        new Payment(
          p.id,
          p.userId,
          p.cardId,
          new Money(p.amount),
          p.status,
          p.createdAt
        )
    );
  }
}
