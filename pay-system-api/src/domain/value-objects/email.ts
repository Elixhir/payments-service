export class Email {
  public readonly value: string;

  constructor(value: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) throw new Error("Invalid email");
    this.value = value.toLowerCase();
  }
}
