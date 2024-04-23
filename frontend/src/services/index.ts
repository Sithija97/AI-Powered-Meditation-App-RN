import { updateUser } from "../store/auth/authSlice";
import {
  userLogin,
  userRegistration,
  getAllRegisteredUsers,
  getDrivers,
  deleteUserData,
  updateUserData,
} from "./auth";
import {
  addHire,
  deleteHire,
  getAllHires,
  getHires,
  updateHire,
} from "./hires";
import {
  getVehicles,
  getAllVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "./vehicles";

export const authService = {
  userLogin,
  userRegistration,
  getDrivers,
  getAllRegisteredUsers,
  updateUserData,
  deleteUserData,
};

export const vehicleService = {
  getVehicles,
  getAllVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};

export const hireService = {
  getHires,
  getAllHires,
  addHire,
  updateHire,
  deleteHire,
};
