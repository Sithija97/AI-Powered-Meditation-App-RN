import { updateUser } from "../store/auth/authSlice";
import {
  userLogin,
  userRegistration,
  getAllRegisteredUsers,
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
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "./vehicles";

export const authService = {
  userLogin,
  userRegistration,
  getAllRegisteredUsers,
  updateUserData,
  deleteUserData,
};

export const vehicleService = {
  getVehicles,
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
