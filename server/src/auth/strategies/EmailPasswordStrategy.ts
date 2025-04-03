// src/auth/strategies/EmailPasswordStrategy.ts
import { AuthStrategy } from "./AuthStrategy";
import { UserModel } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError, UserExistsError } from "../auth.errors";

export class EmailPasswordStrategy implements AuthStrategy {
  async authenticate({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new InvalidCredentialsError();
    }

    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword, token };
  }

  async register({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new UserExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email,
      password: hashedPassword,
      name,
      authMethod: "email",
    });

    await user.save();

    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword, token };
  }

  private generateToken(user: any): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
}
