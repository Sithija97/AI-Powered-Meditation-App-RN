import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/index.js";
import { UserRole } from "../enums/index.js";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    title: { type: String },
    role: { type: String, default: UserRole.IDLE },
    maritalStatus: { type: String },
    email: { type: String },
    address: { type: String },
    dob: { type: Date },
    gender: { type: String },
    profileImgUrl: { type: String },
    nicDetails: {
      nic: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      nicImageUrl: { type: String },
    },
    policeReportsDetails: {
      reportNumber: { type: Schema.Types.Mixed },
      startDate: { type: Date },
      endDate: { type: Date },
      policeReportImageUrl: { type: String },
    },
    drivingLicenceDetails: {
      licenceNumber: { type: Schema.Types.Mixed },
      startDate: { type: Date },
      endDate: { type: Date },
      drivingLicenceImageUrl: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
