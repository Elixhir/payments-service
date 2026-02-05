import { Money } from "../value-objects/money";

export type PaymentStatus = "pending" | "approved" | "rejected";

export class Payment {
  constructor(
    public readonly id: number | null,
    public readonly userId: number,
    public readonly cardId: number,
    public amount: Money,
    public status: PaymentStatus = "pending",
    public readonly createdAt?: Date
  ) {}

  markApproved() {
    this.status = "approved";
  }

  markRejected() {
    this.status = "rejected";
  }
}
