import { Email } from "../value-objects/email";

export class User {
  constructor(
    public readonly id: number | null,
    public name: string,
    public email: Email,
    public password: string,
    public readonly createdAt?: Date
  ) {}

  updateName(name: string) {
    if (!name || name.length < 2) throw new Error("Invalid name");
    this.name = name;
  }
}
