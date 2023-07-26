import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  deleteVehicle,
  getAllVehicles,
  getVehicles,
  registerVehicle,
  updateVehicle,
} from "../controllers/vehicles.controller.js";
const vehicleRouter = express.Router();

vehicleRouter.post("/", protect, registerVehicle);
vehicleRouter.get("/", protect, getVehicles);
vehicleRouter.get("/all", protect, getAllVehicles);
vehicleRouter.put("/:id", protect, updateVehicle);
vehicleRouter.delete("/:id", protect, deleteVehicle);

export { vehicleRouter };
