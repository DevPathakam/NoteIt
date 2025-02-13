import NoteModel from "../models/note.js";

export const createUserNote = async (userId, noteToCreate) =>
  await NoteModel.create({
    user: userId,
    ...noteToCreate,
  });

export const findOneAndUpdateUserNote = async (noteId, userId, noteToEdit) =>
  await NoteModel.findOneAndUpdate(
    { _id: noteId, user: userId },
    { $set: noteToEdit },
    { new: true, runValidators: true }
  );
