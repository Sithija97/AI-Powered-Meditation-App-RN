import { Request } from "express";
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
