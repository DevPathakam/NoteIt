import express from "express";
import { createCustomNoteType, getNoteTypes } from "../controllers/noteTypeController.js";
import { protect } from "../middlewares/authMiddleware.js";


const noteTypeRouter = express.Router();

noteTypeRouter.post("/createCustomNoteType", protect, createCustomNoteType);
noteTypeRouter.get("/getNoteTypes", protect, getNoteTypes);

export default noteTypeRouter;
