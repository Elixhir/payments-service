export class ExpirationDate {
  public readonly value: string;

  constructor(value: string) {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value))
      throw new Error("Invalid expiration date format MM/YY");

    const [month, year] = value.split("/").map(Number);
    const now = new Date();
    const expiry = new Date(2000 + year, month);

    if (expiry < now) throw new Error("Card expired");

    this.value = value;
  }
}
