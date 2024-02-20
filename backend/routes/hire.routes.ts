import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  deleteHire,
  getAllHires,
  getHire,
  getHiresByUser,
  registerHire,
  updateHire,
} from "../controllers/hire.controller.js";

const hireRouter = express.Router();

hireRouter.post("/", protect, registerHire);
hireRouter.get("/", protect, getHiresByUser);
hireRouter.get("/all", protect, getAllHires);
hireRouter.get("/:id", protect, getHire);
hireRouter.put("/:id", protect, updateHire);
hireRouter.delete("/:id", protect, deleteHire);

export { hireRouter };
