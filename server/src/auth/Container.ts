// src/container.ts
import { AuthController } from "../controllers/AuthControllers";
import { AuthService } from "./AuthService";
import { AuthStrategyFactory } from "./strategies/AuthStrategyFactory";

const strategyFactory = new AuthStrategyFactory();
const authService = new AuthService(strategyFactory);
const authController = new AuthController(authService);

export { authController };
