import mongoose, { Schema } from "mongoose";
import { IHire } from "../interfaces/hire.js";

const hireSchema = new Schema<IHire>(
  {
    hireType: { type: String, required: true },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    startLocation: { type: String, required: true },
    endTime: { type: String, required: true },
    endLocation: { type: String, required: true },
    distance: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Hire = mongoose.model<IHire>("Hire", hireSchema);

export default Hire;
