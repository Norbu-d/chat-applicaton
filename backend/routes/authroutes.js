// authroutes.js
import express from "express";
import { signup, login, logout } from "../controllers/authcontrollers.js";

const router = express.Router();

router.post("/signup", signup);  // Make sure the path is "/signup" here
router.post("/login", login);
router.post("/logout", logout);

export default router;
