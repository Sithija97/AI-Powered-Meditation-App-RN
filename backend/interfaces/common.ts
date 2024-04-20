import { Request } from "express";
export interface CustomRequest extends Request {
  user: {
    [x: string]: any;
    _id: string;
    name: string;
    nic: string;
    title: string;
    role: number;
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
  };
}

export interface IError extends Error {
  message: string;
  name: string;
  kind: string;
  stack: any;
}
