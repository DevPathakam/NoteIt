import responseMessages from "../data/responseMessages.js";
import {
  createUserNote,
  findOneAndRemoveUserNote,
  findOneAndUpdateUserNote,
  findUserNotes,
} from "../services/noteService.js";
import { findOneUserNoteTypeById } from "../services/noteTypeService.js";
import { invalidRequest, serverError } from "../utils/reqResUtil.js";

const validateNote = async (note, userId, res) => {
  if (!note.title) {
    invalidRequest(res, responseMessages.field.note.title);
    return false;
  }
  if (!note.content) {
    invalidRequest(res, responseMessages.field.note.content);
    return false;
  }
  if (!note.type) {
    invalidRequest(res, responseMessages.field.note.type);
    return false;
  }

  // Ensure the selected noteType exists and belongs to the user (or is a system type)
  const validNoteType = await findOneUserNoteTypeById(note.type, userId);
  if (!validNoteType) {
    res.status(400).json({
      message: `${responseMessages.field.noteType.name} ${responseMessages.validation.isInvalid}`,
    });
    return false;
  }
  return true;
};

export const createNote = async (req, res) => {
  try {
    const userId = req.user._id;

    const noteToCreate = req.body;
    const isValid = await validateNote(noteToCreate, userId, res);
    if (!isValid) return;

    const newNote = await createUserNote(userId, noteToCreate);
    return res.status(201).json(newNote);
  } catch (error) {
    return serverError(
      res,
      responseMessages.responseOf.notes_createNote,
      error
    );
  }
};

export const editNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;
    const noteToEdit = req.body;
    const isValid = await validateNote(noteToEdit, userId, res);
    if (!isValid) return;

    const updatedNote = await findOneAndUpdateUserNote(
      noteId,
      userId,
      noteToEdit
    );
    return res.status(201).json(updatedNote);
  } catch (error) {
    return serverError(res, responseMessages.responseOf.notes_editNote, error);
  }
};

export const removeNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.id;

    const deletedNote = await findOneAndRemoveUserNote(noteId, userId);
    return res.status(200).json(deletedNote);
  } catch (error) {
    return serverError(
      res,
      responseMessages.responseOf.notes_removeNote,
      error
    );
  }
};

export const getUserNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const { lastNoteId, limit } = req.query;

    const userNotes = await findUserNotes({
      lastNoteId,
      userId,
      limit: parseInt(limit, 10) || 10,
    });
    return res.status(200).json(userNotes);
  } catch (error) {
    return serverError(
      res,
      responseMessages.responseOf.notes_getUserNotes,
      error
    );
  }
};
