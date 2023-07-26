import { Document, Types } from "mongoose";

export interface IVehicle extends Document {
  user: Types.ObjectId;
  ownership: string;
  type: string;
  chassieNumber: string;
  fuelType: string;
}
