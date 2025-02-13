import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/profile/:id", protect, getUserProfile);

export default userRouter;
