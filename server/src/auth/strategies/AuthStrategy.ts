import { RegisterDTO } from "../../types/RegisterDTO";

export interface AuthStrategy {
  authenticate(args: any): Promise<{ user: any; token?: string }>;
  register?(args: RegisterDTO): Promise<{ user: any; token?: string }>;
}
