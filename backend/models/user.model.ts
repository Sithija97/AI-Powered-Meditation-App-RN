import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/index.js";
import { Gender, MaritalStatus, UserRole } from "../enums/index.js";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    title: { type: String, default: "untitled" },
    role: { type: String, default: UserRole.IDLE },
    maritalStatus: { type: String, default: MaritalStatus.UNMARRIED },
    email: { type: String },
    mobileNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    dob: { type: String, default: "" },
    gender: { type: String, default: Gender.MALE },
    profileImgUrl: { type: String, default: "" },
    nicDetails: {
      nic: { type: String, default: "" },
      startDate: { type: String, default: null },
      endDate: { type: String, default: null },
      nicImageUrl: { type: String, default: "" },
    },
    policeReportsDetails: {
      reportNumber: { type: Schema.Types.Mixed, default: "" },
      startDate: { type: String, default: null },
      endDate: { type: String, default: null },
      policeReportImageUrl: { type: String, default: "" },
    },
    drivingLicenceDetails: {
      licenceNumber: { type: Schema.Types.Mixed, default: "" },
      startDate: { type: String, default: null },
      endDate: { type: String, default: null },
      drivingLicenceImageUrl: { type: String, default: "" },
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
