import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  deleteVehicle,
  getAllVehicles,
  getVehicle,
  getVehicles,
  registerVehicle,
  updateVehicle,
} from "../controllers/vehicles.controller.js";
const vehicleRouter = express.Router();

vehicleRouter.post("/", protect, registerVehicle);
vehicleRouter.get("/", protect, getVehicles);
vehicleRouter.get("/all", protect, getAllVehicles);
vehicleRouter.get("/:id", protect, getVehicle);
vehicleRouter.put("/:id", protect, updateVehicle);
vehicleRouter.delete("/:id", protect, deleteVehicle);

export { vehicleRouter };
