import {
  userLogin,
  userRegistration,
  getAllRegisteredUsers,
  deleteUserData,
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
