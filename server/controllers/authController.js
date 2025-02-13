import responseMessages from "../data/responseMessages.js";
import {
  createUser,
  findOneUserByEmailOrUsername,
} from "../services/userService.js";
import { generateToken } from "../utils/jwtUtil.js";
import { invalidRequest, serverError } from "../utils/reqResUtil.js";

export const signup = async (req, res) => {
  try {
    const userToAdd = req.body;
    if (!userToAdd.username)
      return invalidRequest(res, responseMessages.field.user.username);
    if (!userToAdd.email)
      return invalidRequest(res, responseMessages.field.user.email);
    if (!userToAdd.password)
      return invalidRequest(res, responseMessages.field.user.password);
    if (!userToAdd.firstName)
      return invalidRequest(res, responseMessages.field.user.firstName);

    const existingUser = await findOneUserByEmailOrUsername(
      userToAdd.email,
      userToAdd.username
    );

    if (existingUser) {
      if (existingUser.email === userToAdd.email)
        return res.status(400).json({ message: responseMessages.emailTaken });
      if (existingUser.username === userToAdd.username)
        return res
          .status(400)
          .json({ message: responseMessages.usernameTaken });
    }

    const newUser = await createUser(userToAdd);
    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    return serverError(res, responseMessages.responseOf.auth_signup, error);
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername)
      return invalidRequest(res, responseMessages.field.user.usernameOrEmail);
    if (!password)
      return invalidRequest(res, responseMessages.field.user.password);

    const user = await findOneUserByEmailOrUsername(
      emailOrUsername,
      emailOrUsername
    );
    if (!user)
      return res
        .status(401)
        .json({ message: responseMessages.invalidCredentials });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: responseMessages.invalidCredentials });

    // Respond with token
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (error) {
    return serverError(res, responseMessages.responseOf.auth_login, error);
  }
};
