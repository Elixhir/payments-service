
import { Request, Response } from "express";
import { RegisterCard } from "../../application/use-cases/registerCard";

export class CardController {
  constructor(private registerCard: RegisterCard) {}

  create = async (req: Request, res: Response) => {
    const result = await this.registerCard.execute(req.body);
    res.status(201).json(result);
  };
}
