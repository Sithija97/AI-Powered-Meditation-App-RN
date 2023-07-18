import axios from "axios";
import { userLoginData, userRegistrationData } from "../../models";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = "/api/users";

// register user
export const userRegistration = async (userData: userRegistrationData) => {
  const response = await axios.post(`${BASE_URL}${API_URL}/`, userData);
  if (response.data) {
    return response.data;
  }
};

// login user
export const userLogin = async (userData: userLoginData) => {
  const response = await axios.post(`${BASE_URL}${API_URL}/auth`, userData);
  if (response.data) {
    return response.data;
  }
};
