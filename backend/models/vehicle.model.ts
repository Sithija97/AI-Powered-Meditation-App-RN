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
    vehicleNo: {
      type: String,
      required: [true, "Please add vehicle's number"],
    },
    fuelType: {
      type: String,
      required: [true, "Please add vehicle's fuel type"],
    },
    revenueLicenceDetails: {
      amount: { type: Number, default: 0 },
      effectiveDate: { type: String, default: null },
      renewalDate: { type: String, default: null },
      licenceImgUrl: { type: String, default: "" },
    },
    insuaranceDetails: {
      company: { type: String, default: "" },
      amount: { type: Number, default: 0 },
      effectiveDate: { type: String, default: null },
      renewalDate: { type: String, default: null },
      insuranceImgUrl: { type: String, default: "" },
    },
    smokeTestDetails: {
      amount: { type: Number, default: 0 },
      effectiveDate: { type: String, default: null },
      renewalDate: { type: String, default: null },
      smokeTestImgUrl: { type: String, default: "" },
    },
    portPermitDetails: {
      amount: { type: Number, default: 0 },
      effectiveDate: { type: String, default: null },
      renewalDate: { type: String, default: null },
      portPermitImgUrl: { type: String, default: "" },
    },
    leasingDetails: {
      company: { type: String, default: "" },
      amount: { type: Number, default: 0 },
      effectiveDate: { type: String, default: null },
      renewalDate: { type: String, default: null },
      leasingImgUrl: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
