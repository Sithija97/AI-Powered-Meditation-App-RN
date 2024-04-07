import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  nic: string;
  password: string;
  title: string;
  role: string; // type
  maritalStatus: string;
  email: string;
  mobileNumber: string;
  address: string;
  dob: string;
  gender: string;
  profileImgUrl: string;
  nicDetails: {
    nic: string;
    startDate: string;
    endDate: string;
    nicImageUrl: string;
  };
  policeReportsDetails: {
    reportNumber: number | string;
    startDate: string;
    endDate: string;
    policeReportImageUrl: string;
  };
  drivingLicenceDetails: {
    licenceNumber: number | string;
    startDate: string;
    endDate: string;
    drivingLicenceImageUrl: string;
  };
  matchPassword(enteredPassword: string): Promise<boolean>;
}
