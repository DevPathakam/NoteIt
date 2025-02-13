import { Schema, model } from "mongoose";

const noteTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isSystemType: {
      type: Boolean,
      default: false, // System types are predefined, others are user-created
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null, // Null for system types, user ID for custom types
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const NoteTypeModel = model("NoteType", noteTypeSchema);

export default NoteTypeModel;
