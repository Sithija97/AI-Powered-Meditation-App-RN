import { Document, Types } from "mongoose";

export interface IHire extends Document {
  hireType: string;
  vehicle: Types.ObjectId;
  driver: Types.ObjectId;
  date: string;
  startTime: string;
  startLocation: string;
  endTime: string;
  endLocation: string;
  distance: string;
  amount: number;
}
