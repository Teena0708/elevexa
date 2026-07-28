import bcrypt from "bcrypt";
import User from "./auth.model";
import { generateToken } from "./auth.utils";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  const userObj = user.toObject();
  delete (userObj as any).password;

  const token = generateToken(user._id.toString());

  return {
    user: userObj,
    token,
  };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const userObj = user.toObject();
  delete (userObj as any).password;

  const token = generateToken(user._id.toString());

  return {
    user: userObj,
    token,
  };
};