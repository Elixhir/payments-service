import { CardNumber } from "../value-objects/card_number";
import { ExpirationDate } from "../value-objects/expiration_date";

export class Card {
  constructor(
    public readonly id: number | null,
    public readonly userId: number,
    public cardNumber: CardNumber,
    public cardHolderName: string,
    public expirationDate: ExpirationDate,
    public cvv: string,
    public readonly createdAt?: Date
  ) {
    if (!cardHolderName) throw new Error("Card holder name required");
    if (!/^\d{3,4}$/.test(cvv)) throw new Error("Invalid CVV");
  }
}
