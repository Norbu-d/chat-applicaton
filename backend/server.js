import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors
import authRoutes from "./routes/authroutes.js";
import connectdb from "./db/connectdb.js";
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for cookie parser to access cookies
app.use(cookieParser());

// Use the router for routes starting with /api/auth
app.use("/api/auth", authRoutes);

// Use the router for routes starting with /api/messages
app.use("/api/messages", messageRoutes);

// Use the router for routes starting with /api/users
app.use("/api/users", userRoutes);

connectdb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
