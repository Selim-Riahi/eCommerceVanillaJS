import { AuthStrategy } from "./AuthStrategy";
import bcrypt from "bcrypt";
import { InvalidCredentialsError, UserExistsError } from "../auth.errors";
import { RegisterDTO } from "../../types/RegisterDTO";
import { UserRepository } from "../../repositories/UserRepository";
import { safeUserDTO } from "../../types/UserDTOS";
import { JWTService } from "../../services/_TokenService";

export class EmailPasswordStrategy implements AuthStrategy {
  async authenticate({ email, password }: { email: string; password: string }) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new InvalidCredentialsError();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new InvalidCredentialsError();
    const token = JWTService.generateToken(user);
    const { password: _, confirmpassword, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as safeUserDTO, token };
  }

  async register(userData: RegisterDTO) {
    const existingUser = await UserRepository.getUserByEmail(userData?.email);
    if (existingUser) throw new UserExistsError();
    await UserRepository.insertUser(userData);
    const user = await UserRepository.getUserByEmail(userData?.email);
    if (!user) throw new InvalidCredentialsError();
    const token = JWTService.generateToken(user);
    const { password: _, confirmpassword: __, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
