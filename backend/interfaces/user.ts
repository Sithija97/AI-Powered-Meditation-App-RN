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
  dob: Date; // dob
  gender: string; // gender
  profileImgUrl: string;
  nicDetails: {
    nic: string;
    startDate: Date;
    endDate: Date;
    nicImageUrl: string;
  };
  policeReportsDetails: {
    reportNumber: number | string;
    startDate: Date;
    endDate: Date;
    policeReportImageUrl: string;
  };
  drivingLicenceDetails: {
    licenceNumber: number | string;
    startDate: Date;
    endDate: Date;
    drivingLicenceImageUrl: string;
  };
  matchPassword(enteredPassword: string): Promise<boolean>;
}
