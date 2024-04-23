import axios from "axios";
import { IUser, userLoginData, userRegistrationData } from "../../models";

const API_URL = "/api/users";

// register user
export const userRegistration = async (userData: userRegistrationData) => {
  const response = await axios.post(`${API_URL}`, userData);
  if (response.data) {
    return response.data;
  }
};

// login user
export const userLogin = async (userData: userLoginData) => {
  const response = await axios.post(`${API_URL}/auth`, userData);
  if (response.data) {
    return response.data;
  }
};

// get all registered users
export const getAllRegisteredUsers = async () => {
  const response = await axios.get(`${API_URL}/all`);
  if (response.data) {
    return response.data;
  }
};

// get drivers
export const getDrivers = async () => {
  const response = await axios.get(`${API_URL}/drivers`);
  if (response.data) {
    return response.data;
  }
};

// update user profile

// update user
export const updateUserData = async (id: string, data: IUser) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  if (response.data) {
    return response.data;
  }
};

// delete user
export const deleteUserData = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  if (response.data) {
    return response.data;
  }
};
