import express from "express";
import {getMessage, sendMessage } from "../controllers/messagecontrollers.js"; // Ensure this path is correct
import protectRoute from "../middleware/protectroute.js";


const router = express.Router();

// Define POST route with middleware
router.get("/:id", protectRoute, getMessage);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
