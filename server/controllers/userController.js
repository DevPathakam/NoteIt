import responseMessages from "../data/responseMessages.js";
import { findUserById } from "../services/userService.js";

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ message: responseMessages.userNotFound });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: responseMessages.serverDefaultError, error });
  }
};
