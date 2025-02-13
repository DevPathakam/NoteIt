import responseMessages from "../data/responseMessages.js";
import {
  createUserNote,
  findOneAndUpdateUserNote,
} from "../services/noteService.js";
import { findOneUserNoteTypeById } from "../services/noteTypeService.js";
import { invalidRequest } from "../utils/reqResUtil.js";

//FIXME: function crash the server even it returns response
const validateNote = async (note, userId, res) => {
  if (!note.title)
    return invalidRequest(res, responseMessages.field.note.title);
  if (!note.content)
    return invalidRequest(res, responseMessages.field.note.content);
  if (!note.type) return invalidRequest(res, responseMessages.field.note.type);

  // Ensure the selected noteType exists and belongs to the user (or is a system type)
  const validNoteType = await findOneUserNoteTypeById(note.type, userId);
  console.log('validNoteType: ', validNoteType);
  if (!validNoteType)
    return res.status(400).json({
      message: `${responseMessages.field.noteType.name} ${responseMessages.validation.isInvalid}`,
    });
};

export const createNote = async (req, res) => {
  try {
    const userId = req.user._id;

    const noteToCreate = req.body;
    validateNote(noteToCreate, userId, res);
    const newNote = await createUserNote(userId, noteToCreate);
    return res.status(201).json(newNote);
  } catch (error) {
    return res.status(500).json({
      request: responseMessages.request.createNote,
      message: responseMessages.serverDefaultError,
      error,
    });
  }
};

export const editNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;
    const noteToEdit = req.body;
    validateNote(noteToEdit, userId, res);
    const updatedNote = await findOneAndUpdateUserNote(
      noteId,
      userId,
      noteToEdit
    );
    return res.status(201).json(updatedNote);
  } catch (error) {
    return res.status(500).json({
      request: responseMessages.request.editNote,
      message: responseMessages.serverDefaultError,
      error,
    });
  }
};
