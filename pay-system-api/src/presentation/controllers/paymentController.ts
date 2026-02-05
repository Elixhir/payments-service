import { Request, Response } from "express";
import { CreatePayment } from "../../application/use-cases/createPayment";
import { GetUserPayments } from "../../application/use-cases/getUserPayment";

export class PaymentController {
  constructor(
    private createPayment: CreatePayment,
    private getUserPayments: GetUserPayments
  ) {}

  create = async (req: Request, res: Response) => {
    const result = await this.createPayment.execute(req.body);
    res.status(201).json(result);
  };

  history = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const result = await this.getUserPayments.execute(userId);
    res.json(result);
  };
}
