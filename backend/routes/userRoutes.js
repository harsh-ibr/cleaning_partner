import express from "express";
import { userCreate } from "../controller/UserController.js";

const router = express.Router();

router.post("/register", userCreate);

export default router;
