import express from "express";
import { userCreate, login, user } from "../controller/UserController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", userCreate);
router.post("/login", login);
router.get("/user", protect, authorizeRoles("user"), user);

export default router;
