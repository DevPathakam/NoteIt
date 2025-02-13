import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "NoteType",
      required: true, // Every note must have a type
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Notes are linked to users
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    pinOrder: {
      type: Number,
      default: null, // Null for unpinned notes
    },
  },
  { timestamps: true }
);

const NoteModel = model("Note", noteSchema);

export default NoteModel;
