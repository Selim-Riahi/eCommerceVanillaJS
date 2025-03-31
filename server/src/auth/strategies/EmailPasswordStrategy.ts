// src/auth/strategies/EmailPasswordStrategy.ts
import { AuthStrategy } from "./AuthStrategy";
import { UserModel } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class EmailPasswordStrategy implements AuthStrategy {
  async authenticate({ email, password }: { email: string; password: string }) {
    // 1. Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // 3. Generate JWT token
    const token = this.generateToken(user);

    // 4. Return user without password and token
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
    // 1. Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user
    const user = new UserModel({
      email,
      password: hashedPassword,
      name,
      authMethod: "email",
    });

    await user.save();

    // 4. Generate JWT token
    const token = this.generateToken(user);

    // 5. Return user without password and token
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword, token };
  }

  private generateToken(user: any): string {
    return jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  }
}
