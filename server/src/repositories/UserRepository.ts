import { IUser, UserModel } from "../models/User";
import { Document } from "mongoose";
import { RegisterDTO } from "../types/RegisterDTO";
import { UserExistsError } from "../auth/auth.errors";
import bcrypt from "bcrypt";
export type UserDocument = IUser & Document;
export class UserRepository {
  static async getUserByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email })
      .select("-password,-confirmpassword")
      .lean<IUser>();
  }
  static async insertUser(userData: RegisterDTO): Promise<void> {
    const {
      email,
      password,
      firstname,
      lastname,
      country,
      socials,
      confirmpassword,
    } = userData;

    const existingUser = await this.getUserByEmail(email);
    if (existingUser) throw new UserExistsError();
    if (password !== confirmpassword) throw new Error("Passwords Must Match");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      firstname,
      lastname,
      country,
      socials,
      authMethod: "email",
    });

    await user.save();
  }
}
