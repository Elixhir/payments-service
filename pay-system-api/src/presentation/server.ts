import express from "express";
import dotenv from "dotenv";

import { PrismaUserRepository } from "../infrastructure/repositories/user";
import { PrismaCardRepository } from "../infrastructure/repositories/card";
import { PrismaPaymentRepository } from "../infrastructure/repositories/payment";
import { HttpPaymentGateway } from "../infrastructure/repositories/paymentGateway";

import { CreateUser } from "../application/use-cases/createUser";
import { RegisterCard } from "../application/use-cases/registerCard";
import { CreatePayment } from "../application/use-cases/createPayment";
import { GetUserPayments } from "../application/use-cases/getUserPayment";

import { UserController } from "./controllers/userController";
import { CardController } from "./controllers/cardController";
import { PaymentController } from "./controllers/paymentController";

import { buildUserRoutes } from "./routes/userRoutes";
import { buildCardRoutes } from "./routes/cardRoutes";
import { buildPaymentRoutes } from "./routes/paymentRoutes";

import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const app = express();
app.use(express.json());

const userRepo = new PrismaUserRepository();
const cardRepo = new PrismaCardRepository();
const paymentRepo = new PrismaPaymentRepository();
const gateway = new HttpPaymentGateway();

const createUserUC = new CreateUser(userRepo);
const registerCardUC = new RegisterCard(cardRepo, userRepo);
const createPaymentUC = new CreatePayment(paymentRepo, cardRepo, userRepo, gateway);
const getUserPaymentsUC = new GetUserPayments(paymentRepo);

const userController = new UserController(createUserUC);
const cardController = new CardController(registerCardUC);
const paymentController = new PaymentController(createPaymentUC, getUserPaymentsUC);

app.use("/users", buildUserRoutes(userController));
app.use("/cards", buildCardRoutes(cardController));
app.use("/payments", buildPaymentRoutes(paymentController));

app.use(errorHandler);

app.listen(3000, () => console.log("API running on port 3000"));
