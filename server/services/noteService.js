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

export const findOneAndRemoveUserNote = async (noteId, userId) =>
  await NoteModel.findOneAndUpdate(
    { _id: noteId, user: userId },
    { $set: { deleted: true } },
    { new: true }
  );

export const findUserNotes = async ({ lastNoteId, userId, limit = 10 }) => {
  const query = {
    user: userId,
    $or: [{ deleted: false }, { deleted: null }, { deleted: undefined }],
  };
  if (lastNoteId) query._id = { $lt: lastNoteId };

  const notes = await NoteModel.find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .populate("type", "name")
    .lean();

  return { notes, hasMore: notes.length === limit };
};

export const deleteManyOldNotes = async () =>
  await NoteModel.deleteMany({ deleted: true });
