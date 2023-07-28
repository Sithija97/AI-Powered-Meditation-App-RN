export interface userRegistrationData {
  name: string;
  nic: string;
  title: string;
  password: string;
  email: string;
  address: string;
  dob: string;
  maritalStatus: string;
}

export interface userLoginData {
  nic: string;
  password: string;
}

export interface Vehicle {
  _id: string;
  user: string;
  type: string;
  ownership: string;
  fuelType: string;
  chassieNumber: string;
}

export interface VehicleData {
  type: string;
  ownership: string;
  fuelType: string;
  chassieNumber: string;
}
