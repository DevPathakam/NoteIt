import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import process from "process";
import seedSystemNoteTypes from "./seeders/seedData.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import noteTypeRoutes from "./routes/noteTypeRoutes.js";

try {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // Connect to MongoDB
  connectDB();
  
  // Routes start here
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/notes", noteRoutes);
  app.use("/api/noteTypes", noteTypeRoutes);
  //Routes end here
  
  seedSystemNoteTypes(); // Seed system note types
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server is up on port ${PORT}`)); // Kick start server
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
