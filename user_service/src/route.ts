import express from "express";
import { loginUser, myProfile, registerUser } from "./controller.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/profile", myProfile);
 
export default router;