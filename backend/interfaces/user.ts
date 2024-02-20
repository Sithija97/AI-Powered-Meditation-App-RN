import { Document } from "mongoose";

export interface IUser extends Document {
  name: string; // full name
  nic: string;
  password: string;
  title: string; // title
  role: string; // type
  maritalStatus: string; // martial status
  email: string;
  address: string; // address
  dob: string; // dob
  gender: string; // gender
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
