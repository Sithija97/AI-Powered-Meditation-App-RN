import mongoose, { Schema, model } from "mongoose";
import { IVehicle } from "../interfaces/vehicle.js";

const vehicleSchema = new Schema<IVehicle>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ownership: {
      type: String,
      required: [true, "Please add an ownership"],
    },
    type: {
      type: String,
      required: [true, "Please add a vehicle type"],
    },
    chassieNumber: {
      type: String,
      required: [true, "Please add vehicle's chassie number"],
    },
    fuelType: {
      type: String,
      required: [true, "Please add vehicle's fuel type"],
    },
    revenueLicenceDetails: {
      amount: { type: Number },
      effectiveDate: { type: Date },
      renewalDate: { type: Date },
      licenceImgUrl: { type: String },
    },
    insuaranceDetails: {
      amount: { type: Number },
      effectiveDate: { type: Date },
      renewalDate: { type: Date },
      insuranceImgUrl: { type: String },
    },
    smokeTestDetails: {
      amount: { type: Number },
      effectiveDate: { type: Date },
      renewalDate: { type: Date },
      smokeTestImgUrl: { type: String },
    },
    portPermitDetails: {
      amount: { type: Number },
      effectiveDate: { type: Date },
      renewalDate: { type: Date },
      portPermitImgUrl: { type: String },
    },
    leasingDetails: {
      company: { type: String },
      amount: { type: Number },
      effectiveDate: { type: Date },
      renewalDate: { type: Date },
      leasingImgUrl: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
