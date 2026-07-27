import bcrypt from "bcrypt";
import User from "./auth.model";
import { generateToken } from "./auth.utils";

export const registerUser = async (userData: any) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  const token = generateToken(user._id.toString());

  return {
    user,
    token,
  };
};