import { Router } from "express";
import { authController } from "../auth/Container";
import { validateLoginInput } from "../auth/middlewares/validation";
import { validate } from "../auth/middlewares/validate";

export const authRouter = Router();
authRouter.post(
  "/login",
  [...validateLoginInput, validate],
  authController.login.bind(authController)
);
