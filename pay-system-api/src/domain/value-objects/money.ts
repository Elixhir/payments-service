export class Money {
  public readonly amount: number;

  constructor(amount: number) {
    if (amount <= 0) throw new Error("Amount must be greater than zero");
    this.amount = Number(amount.toFixed(2));
  }
}
