import { userLogin, userRegistration } from "./auth";
import { getVehicles, addVehicle, deleteVehicle } from "./vehicles";

export const authService = {
  userLogin,
  userRegistration,
};

export const vehicleService = {
  getVehicles,
  addVehicle,
  deleteVehicle,
};
