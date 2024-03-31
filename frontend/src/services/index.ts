import {
  userLogin,
  userRegistration,
  getAllRegisteredUsers,
  deleteUserData,
} from "./auth";
import { getVehicles, addVehicle, deleteVehicle } from "./vehicles";

export const authService = {
  userLogin,
  userRegistration,
  getAllRegisteredUsers,
  deleteUserData,
};

export const vehicleService = {
  getVehicles,
  addVehicle,
  deleteVehicle,
};
