import express from "express";
import {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  deleteMany,
} from "../controller/CategoryController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getAll);
router.post("/", protect, authorizeRoles("admin"), create);
router.get("/:id", protect, authorizeRoles("admin"), getById);
router.put("/:id", protect, authorizeRoles("admin"), updateById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteById);
router.delete("/", protect, authorizeRoles("admin"), deleteMany);

export default router;
