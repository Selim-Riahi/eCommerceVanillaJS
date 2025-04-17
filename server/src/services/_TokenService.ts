import jwt, { SignOptions } from "jsonwebtoken";
import { UserDocument } from "../repositories/UserRepository";

class JWTSecretMissingError extends Error {
  constructor() {
    super("JWT_SECRET is not configured in environment variables.");
    this.name = "JWTSecretMissingError";
  }
}

export class JWTService {
  static generateToken(user: UserDocument): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new JWTSecretMissingError();
    }

    const payload = {
      id: user._id,
    };

    const options: SignOptions = {
      expiresIn: Number(process.env.JWT_EXPIRY) || 3600,
    };

    return jwt.sign(payload, jwtSecret, options);
  }
}
