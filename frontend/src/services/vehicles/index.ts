import axios from "axios";
import { IVehicle } from "../../models";

const API_URL = "/api/vehicles";

// get vehicles
export const getVehicles = async () => {
  const response = await axios.get(`${API_URL}`);
  if (response.data) {
    return response.data;
  }
};

// get all vehicles
export const getAllVehicles = async () => {
  const response = await axios.get(`${API_URL}/all`);
  if (response.data) {
    return response.data;
  }
};

// add vehicle
export const addVehicle = async (data: IVehicle) => {
  const response = await axios.post(`${API_URL}`, data);
  if (response.data) {
    return response.data;
  }
};

// update vehicle
export const updateVehicle = async (data: IVehicle, id: string) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  if (response.data) {
    return response.data;
  }
};

// delete vehicle
export const deleteVehicle = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  if (response.data) {
    return response.data;
  }
};
