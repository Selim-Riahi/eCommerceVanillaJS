import { EmailPasswordStrategy } from "./EmailPasswordStrategy";
import { AuthStrategy } from "./AuthStrategy";
// Import other strategies as needed
// import { GoogleStrategy } from "./GoogleStrategy";
// import { OAuthStrategy } from "./OAuthStrategy";

export class AuthStrategyFactory {
  createStrategy(authMethod: string): AuthStrategy {
    switch (authMethod.toLowerCase()) {
      case "email":
        return new EmailPasswordStrategy();
      // case "google":
      //   return new GoogleStrategy();
      // case "oauth":
      //   return new OAuthStrategy();
      default:
        throw new Error(`Invalid authentication method: ${authMethod}`);
    }
  }
}
