import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  nic: string;
  password: string;
  title: string;
  role: string;
  maritalStatus: string;
  email: string;
  address: string;
  dob: string;
  gender: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}
