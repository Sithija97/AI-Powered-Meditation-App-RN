import { userLogin, userRegistration } from "./auth";
import { getVehicles } from "./vehicles";

export const authService = {
  userLogin,
  userRegistration,
};

export const vehicleService = {
  getVehicles,
};
