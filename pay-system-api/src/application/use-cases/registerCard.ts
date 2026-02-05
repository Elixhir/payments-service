import { CardRepository } from "../../domain/repositories/card";
import { UserRepository } from "../../domain/repositories/user";
import { Card } from "../../domain/entities/card";
import { CardNumber } from "../../domain/value-objects/card_number";
import { ExpirationDate } from "../../domain/value-objects/expiration_date";
import { RegisterCardDTO } from "../dtos/registerCardDto";

export class RegisterCard {
  constructor(
    private cardRepo: CardRepository,
    private userRepo: UserRepository
  ) {}

  async execute(data: RegisterCardDTO) {
    const user = await this.userRepo.findById(data.userId);
    if (!user) throw new Error("User not found");

    const card = new Card(
      null,
      data.userId,
      new CardNumber(data.cardNumber),
      data.cardHolderName,
      new ExpirationDate(data.expirationDate),
      data.cvv
    );

    return this.cardRepo.create(card);
  }
}
