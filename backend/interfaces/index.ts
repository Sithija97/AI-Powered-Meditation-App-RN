import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface CustomRequest extends Request {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface IError extends Error {
  message: string;
  name: string;
  kind: string;
  stack: any;
}
