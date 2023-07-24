import { Request } from "express";
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

export interface CustomRequest extends Request {
  user: {
    _id: string;
    name: string;
    nic: string;
    title: string;
    role: number;
    maritalStatus: string;
    email: string;
    address: string;
    dob: string;
    gender: string;
  };
}

export interface IError extends Error {
  message: string;
  name: string;
  kind: string;
  stack: any;
}
