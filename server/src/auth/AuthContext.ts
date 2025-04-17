// src/auth/AuthContext.ts
import { RegisterDTO } from "../types/RegisterDTO";
import { AuthStrategy } from "./strategies/AuthStrategy";

export class AuthContext {
  constructor(private strategy: AuthStrategy) {}

  setStrategy(strategy: AuthStrategy): void {
    this.strategy = strategy;
  }

  async authenticate(credentials: { email: string; password: string }) {
    return this.strategy.authenticate(credentials);
  }

  async register(userData: RegisterDTO) {
    if (typeof this.strategy.register !== "function") {
      throw new Error("Registration not supported for this strategy");
    }
    return this.strategy.register(userData);
  }
}
