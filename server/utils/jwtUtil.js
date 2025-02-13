import jwt from "jsonwebtoken";
import process from "process";

// Generate JWT Token
export const generateToken = (userId) =>
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
// Verify JWT Token
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);