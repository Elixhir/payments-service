import { Router } from "express";
import { UserController } from "../controllers/userController";

export const buildUserRoutes = (controller: UserController) => {
  const router = Router();
  router.post("/", controller.create);
  return router;
};
