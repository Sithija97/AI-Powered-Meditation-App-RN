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
