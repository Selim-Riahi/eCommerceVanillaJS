import { AuthStrategyFactory } from "./strategies/AuthStrategyFactory";
import { InvalidCredentialsError, UserExistsError } from "./auth.errors";
import { AuthContext } from "./AuthContext";
import { EmailPasswordStrategy } from "./strategies/EmailPasswordStrategy";

export class AuthService {
  private authContext: AuthContext;
  private strategyFactory: AuthStrategyFactory;

  constructor(strategyFactory: AuthStrategyFactory) {
    this.strategyFactory = strategyFactory;
    this.authContext = new AuthContext(new EmailPasswordStrategy()); // Optional: Default strategy
  }

  async login(email: string, password: string, authMethod: string) {
    try {
      const strategy = this.strategyFactory.createStrategy(authMethod);
      this.authContext = new AuthContext(strategy);

      return await this.authContext.authenticate({ email, password });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes("User not found") ||
          error.message.includes("Invalid credentials")
        ) {
          throw new InvalidCredentialsError();
        }
      }
      throw error;
    }
  }

  async register(
    email: string,
    password: string,
    name: string,
    authMethod: string
  ) {
    try {
      // Call `createStrategy` as an instance method
      const strategy = this.strategyFactory.createStrategy(authMethod);
      this.authContext = new AuthContext(strategy);

      return await this.authContext.register({ email, password, name });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("User already exists")) {
          throw new UserExistsError();
        }
      }
      throw error;
    }
  }
}
