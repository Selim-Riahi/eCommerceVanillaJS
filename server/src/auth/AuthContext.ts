// src/auth/AuthContext.ts
import { AuthStrategy } from "./strategies/AuthStrategy";

export class AuthContext {
  constructor(private strategy: AuthStrategy) {}

  setStrategy(strategy: AuthStrategy): void {
    this.strategy = strategy;
  }

  async authenticate(args: any) {
    return this.strategy.authenticate(args);
  }

  async register(args: any) {
    if (!("register" in this.strategy)) {
      throw new Error("Registration not supported for this strategy");
    }
    return this.strategy.register!(args);
  }
}
