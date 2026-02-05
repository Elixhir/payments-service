import { Router } from "express";
import { CardController } from "../controllers/cardController";

export const buildCardRoutes = (controller: CardController) => {
  const router = Router();
  router.post("/", controller.create);
  return router;
};
