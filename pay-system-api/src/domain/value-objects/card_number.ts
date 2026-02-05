export class CardNumber {
  public readonly value: string;

  constructor(value: string) {
    const sanitized = value.replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(sanitized)) throw new Error("Invalid card number");
    this.value = sanitized;
  }

  get masked() {
    return "**** **** **** " + this.value.slice(-4);
  }
}
