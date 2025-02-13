import UserModel from "../models/user.js"; // Import User Model
import responseMessages from "../data/responseMessages.js";
import { verifyToken } from "../utils/jwtUtil.js";

export const protect = async (req, res, next) => {
  let token;
  const { notAuthorized, tokenFailed, noToken } = responseMessages;

  // Check if the token is sent in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header and remove "Bearer"
      token = req.headers.authorization.split(" ")[1];
      const decoded = verifyToken(token);

      // Get user from the database (excluding password)
      req.user = await UserModel.findById(decoded.userId).select("-password");
      if (!req.user) {
        return res.status(404).json({ message: responseMessages.userNotFound });
      }
      next(); // Continue to the next middleware or route handler
    } catch (error) {
      res
        .status(401)
        .json({ message: `${notAuthorized}, ${tokenFailed}`, error });
    }
  } else {
    res.status(401).json({ message: `${notAuthorized}, ${noToken}` });
  }
};
