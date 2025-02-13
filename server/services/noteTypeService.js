import NoteTypeModel from "../models/noteType.js";

export const findUserNoteTypes = async (userId) =>
  await NoteTypeModel.find({
    $or: [{ isSystemType: true }, { user: userId }],
  });

export const findOneUserNoteTypeById = async (id, userId) =>
  await NoteTypeModel.findOne({
    _id: id,
    $or: [{ user: userId }, { isSystemType: true }],
  });

export const findOneUserNoteType = async (name, userId) =>
  await NoteTypeModel.findOne({ name, user: userId });

export const createUserNoteType = async (name, userId) =>
  await NoteTypeModel.create({
    name,
    user: userId,
    isSystemType: false,
  });
