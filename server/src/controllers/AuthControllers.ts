import { Request, Response } from "express";
import { AuthService } from "../auth/AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login(email, password);

      res.json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  }
}
