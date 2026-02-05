import { prisma } from "../db/prismaClient";
import { UserRepository } from "../../domain/repositories/user";
import { User } from "../../domain/entities/user";
import { Email } from "../../domain/value-objects/email";

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email.value,
        password: user.password,
      },
    });

    return new User(created.id, created.name, new Email(created.email),created.password, created.createdAt);
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { email } });
    if (!found) return null;

    return new User(found.id, found.name, new Email(found.email), found.password,found.createdAt);
  }

  async findById(id: number): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { id } });
    if (!found) return null;

    return new User(found.id, found.name, new Email(found.email), found.createdAt);
  }
}
