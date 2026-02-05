import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";

export const buildPaymentRoutes = (controller: PaymentController) => {
  const router = Router();

  router.post("/", controller.create);
  router.get("/user/:userId", controller.history);

  return router;
};
