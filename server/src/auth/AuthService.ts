import { AuthContext } from "./AuthContext";
import { AuthStrategyFactory } from "./strategies/AuthStrategyFactory";
import { InvalidCredentialsError, UserExistsError } from "./auth.errors";

export class AuthService {
  private authContext: AuthContext;

  constructor(
    private strategyFactory: AuthStrategyFactory,
    authMethod: string = "email"
  ) {
    this.authContext = new AuthContext(
      AuthStrategyFactory.createStrategy(authMethod)
    );
  }

  async login(email: string, password: string) {
    try {
      return await this.authContext.authenticate({ email, password });
    } catch (error) {
      if (error instanceof Error) {
        // Ensure 'error' is an Error instance
        if (
          error.message.includes("User not found") ||
          error.message.includes("Invalid credentials")
        ) {
          throw new InvalidCredentialsError();
        }
      }
      throw error; // Rethrow if it's not a known error
    }
  }

  async register(email: string, password: string, name: string) {
    try {
      return await this.authContext.register({ email, password, name });
    } catch (error) {
      if (error instanceof Error) {
        // Ensure 'error' is an Error instance
        if (error.message.includes("User already exists")) {
          throw new UserExistsError();
        }
      }
      throw error; // Rethrow if it's not a known error
    }
  }
}
