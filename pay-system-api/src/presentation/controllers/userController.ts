import { Request, Response } from "express";
import { CreateUser } from "../../application/use-cases/createUser";

export class UserController {
  constructor(private createUser: CreateUser) {}

  create = async (req: Request, res: Response) => {
    const result = await this.createUser.execute(req.body);
    res.status(201).json(result);
  };
}
