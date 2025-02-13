import UserModel from "../models/user.js";

export const findUserById = async (userId) =>
  await UserModel.findById(userId).select("-password");

export const findOneUserByEmailOrUsername = async (email, username) =>
  await UserModel.findOne({
    $or: [{ email }, { username }],
  });

export const createUser = async (user) =>
  await UserModel.create({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    password: user.password,
  });
