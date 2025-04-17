import { Request, Response } from "express";
import { AuthService } from "../auth/AuthService";
import { RegisterDTO } from "../types/RegisterDTO";
import jwt from "jsonwebtoken";

export class AuthController {
  constructor(private authService: AuthService) {}

  private sendResponse() {} // to be implimented NEXT

  private setAuthTokenCookie(res: Response, token: string): void {
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.APP_CONTEXT === "PRODUCTION",
      maxAge: 3600 * 1000,
      sameSite: "strict",
    });
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password, authMethod = "email" } = req.body;
      const { user, token } = await this.authService.login(
        email,
        password,
        authMethod
      );

      if (token) {
        this.setAuthTokenCookie(res, token);
      } else {
        throw new Error("Token generation failed.");
      }

      res.json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : "Invalid credentials",
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userData: RegisterDTO = req.body;
      const { user, token } = await this.authService.register(userData);
      if (token) {
        this.setAuthTokenCookie(res, token);
      } else {
        throw new Error("Token generation failed.");
      }

      res.json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : "Invalid credentials",
      });
    }
  }
}
