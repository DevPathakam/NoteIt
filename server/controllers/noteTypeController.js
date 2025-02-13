import responseMessages from "../data/responseMessages.js";
import {
  createUserNoteType,
  findOneUserNoteType,
  findUserNoteTypes,
} from "../services/noteTypeService.js";
import { invalidRequest } from "../utils/reqResUtil.js";

// Create a user-defined note type
export const createCustomNoteType = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    if (!name) return invalidRequest(res, responseMessages.field.noteType.name);

    // Check if note type already exists for this user
    const existingType = await findOneUserNoteType(name, userId);
    if (existingType) {
      return res.status(400).json({ message: responseMessages.noteTypeExists });
    }

    const newNoteType = await createUserNoteType(name, userId);
    return res.status(201).json(newNoteType);
  } catch (error) {
    return res.status(500).json({
      request: responseMessages.request.createCustomNoteType,
      message: responseMessages.serverDefaultError,
      error,
    });
  }
};

// Get all note types (System + User-defined)
export const getNoteTypes = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch system types (user=null) and user-defined types
    const noteTypes = await findUserNoteTypes(userId);
    return res.status(200).json(noteTypes);
  } catch (error) {
    return res.status(500).json({
      request: responseMessages.request.getNoteTypes,
      message: responseMessages.serverDefaultError,
      error,
    });
  }
};
