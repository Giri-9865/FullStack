import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET as string;

export const createUser = async (userData: any) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  await User.create({
    name: userData.name,
    password: hashedPassword,
    email: userData.email,
    mobile: userData.mobile,
  });
};

export const loginUser = async (userData: any) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new Error("Incorrect credentials");
  }

  const authToken = jwt.sign({ userId: user.id }, jwtSecret);
  return { success: true, authToken };
};

export const updateUser = async (userData: any) => {
  const { email, name, password, mobile } = userData;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  let hasChanges = false;

  if (name && name !== user.name) {
    user.name = name;
    hasChanges = true;
  }

  if (mobile && mobile !== user.mobile) {
    user.mobile = mobile;
    hasChanges = true;
  }

  if (
    password &&
    password !== "" &&
    !(await bcrypt.compare(password, user.password))
  ) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    hasChanges = true;
  }

  if (hasChanges) {
    await user.save();
    return { success: true, message: "User updated successfully" };
  } else {
    return { success: false, message: "No changes detected" };
  }
};

export const getUserData = async (email: string) => {
  return await User.findOne({ email });
};
