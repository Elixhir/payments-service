import { Card } from "../entities/card";

export interface CardRepository {
  create(card: Card): Promise<Card>;
  findByUser(userId: number): Promise<Card[]>;
  findById(id: number): Promise<Card | null>;
}
