import { Router } from "express";
import { authController } from "../auth/Container";
import { validateLoginInput } from "../auth/middlewares/validation";
import { validate } from "../auth/middlewares/validate";

const router = Router();
router.post("/login", [...validateLoginInput, validate], authController.login);
