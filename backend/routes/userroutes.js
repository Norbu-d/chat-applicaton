import express from "express";
import protectRoute from "../middleware/protectroute.js";
import { getUsersForSidebar } from "../controllers/usercontrollers.js"; // Corrected function name

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;
