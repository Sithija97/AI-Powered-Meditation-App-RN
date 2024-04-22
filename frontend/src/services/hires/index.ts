import axios from "axios";
import { IHire } from "../../models";

const API_URL = "/api/hires";

// get hires
export const getHires = async () => {
  const response = await axios.get(`${API_URL}`);
  if (response.data) {
    return response.data;
  }
};

// get aLL hires
export const getAllHires = async () => {
  const response = await axios.get(`${API_URL}/all`);
  if (response.data) {
    return response.data;
  }
};

// add hire
export const addHire = async (data: IHire) => {
  const response = await axios.post(`${API_URL}`, data);
  if (response.data) {
    return response.data;
  }
};

// update hire
export const updateHire = async (data: IHire, id: string) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  if (response.data) {
    return response.data;
  }
};

// delete hire
export const deleteHire = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  if (response.data) {
    return response.data;
  }
};
