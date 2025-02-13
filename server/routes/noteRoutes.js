import express from "express";
import { createNote, editNote } from "../controllers/notesController.js";
import { protect } from "../middlewares/authMiddleware.js";

const noteRouter = express.Router();

noteRouter.post("/createNote", protect, createNote);
noteRouter.put("/editNote/:id", protect, editNote); 
// TODO: noteRouter.put("/editNote/:id", protect, inUnpinNote);

export default noteRouter;
