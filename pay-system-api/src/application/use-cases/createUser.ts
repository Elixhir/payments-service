import { UserRepository } from "../../domain/repositories/user";
import { User } from "../../domain/entities/user";
import { Email } from "../../domain/value-objects/email";
import { CreateUserDTO } from "../dtos/createUserDto";
import bcrypt from "bcrypt"

export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(data: CreateUserDTO) {
    const existing = await this.userRepo.findByEmail(data.email);
    const hashedPassword = await bcrypt.hash(data.password, 10)
    if (existing) throw new Error("Email already registered");

    const user = new User(null, data.name, new Email(data.email), hashedPassword);
    return this.userRepo.create(user);
  }
}
