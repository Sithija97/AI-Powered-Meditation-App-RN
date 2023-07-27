import axios from "axios";

const API_URL = "/api/vehicles";

// get vehicles
export const getVehicles = async () => {
  const response = await axios.get(`${API_URL}`);
  if (response.data) {
    return response.data;
  }
};
