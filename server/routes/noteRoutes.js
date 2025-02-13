import express from "express";
import {
  createNote,
  editNote,
  getUserNotes,
  removeNote,
} from "../controllers/notesController.js";
import { protect } from "../middlewares/authMiddleware.js";

const noteRouter = express.Router();

noteRouter.post("/createNote", protect, createNote);
noteRouter.put("/editNote/:id", protect, editNote);
noteRouter.delete("/removeNote/:id", protect, removeNote);
noteRouter.get("/userNotes", protect, getUserNotes);
// TODO: noteRouter.put("/editNote/:id", protect, inUnpinNote);

export default noteRouter;
