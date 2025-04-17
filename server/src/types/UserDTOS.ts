import { IUser } from "../models/User";
export type safeUserDTO = Omit<IUser, "password" | "confirmpassword">;
