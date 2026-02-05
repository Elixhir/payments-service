import { prisma } from "../db/prismaClient";
import { CardRepository } from "../../domain/repositories/card";
import { Card } from "../../domain/entities/card";
import { CardNumber } from "../../domain/value-objects/card_number";
import { ExpirationDate } from "../../domain/value-objects/expiration_date";

export class PrismaCardRepository implements CardRepository {
  async create(card: Card): Promise<Card> {
    const created = await prisma.card.create({
      data: {
        userId: card.userId,
        cardNumber: card.cardNumber.value,
        cardHolderName: card.cardHolderName,
        expirationDate: card.expirationDate.value,
        cvv: card.cvv,
      },
    });

    return new Card(
      created.id,
      created.userId,
      new CardNumber(created.cardNumber),
      created.cardHolderName,
      new ExpirationDate(created.expirationDate),
      created.cvv,
      created.createdAt
    );
  }

  async findByUser(userId: number): Promise<Card[]> {
    const cards = await prisma.card.findMany({ where: { userId } });
    return cards.map(
      c =>
        new Card(
          c.id,
          c.userId,
          new CardNumber(c.cardNumber),
          c.cardHolderName,
          new ExpirationDate(c.expirationDate),
          c.cvv,
          c.createdAt
        )
    );
  }

  async findById(id: number): Promise<Card | null> {
    const c = await prisma.card.findUnique({ where: { id } });
    if (!c) return null;

    return new Card(
      c.id,
      c.userId,
      new CardNumber(c.cardNumber),
      c.cardHolderName,
      new ExpirationDate(c.expirationDate),
      c.cvv,
      c.createdAt
    );
  }
}
