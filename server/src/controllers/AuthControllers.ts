// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { AuthContext } from "../auth/AuthContext";
import { EmailPasswordStrategy } from "../auth/strategies/EmailPasswordStrategy";
// Import additional strategies as needed
// import { GoogleStrategy } from "../auth/strategies/GoogleStrategy";
// import { OAuthStrategy } from "../auth/strategies/OAuthStrategy";

export class AuthController {
  private authContext: AuthContext;

  constructor(authMethod: string) {
    this.authContext = new AuthContext(this.selectStrategy(authMethod));
  }

  private selectStrategy(authMethod: string) {
    switch (authMethod) {
      case "email":
        return new EmailPasswordStrategy();
      // case "google":
      //   return new GoogleStrategy();
      // case "oauth":
      //   return new OAuthStrategy();
      default:
        throw new Error("Invalid authentication method");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password, authMethod = "email" } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      // Dynamically set authentication strategy
      this.authContext = new AuthContext(this.selectStrategy(authMethod));

      const { user, token } = await this.authContext.authenticate({
        email,
        password,
      });
      res.json({ user, token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name, authMethod = "email" } = req.body;

      // Validate input
      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ error: "Email, password, and name are required" });
      }

      // Dynamically set authentication strategy
      this.authContext = new AuthContext(this.selectStrategy(authMethod));

      const { user, token } = await this.authContext.register({
        email,
        password,
        name,
      });
      res.status(201).json({ user, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
