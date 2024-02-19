import { Document, Types } from "mongoose";

export interface IVehicle extends Document {
  user: Types.ObjectId;
  ownership: string;
  type: string;
  fuelType: string;
  chassieNumber: string;
  revenueLicenceDetails: {
    amount: number;
    effectiveDate: Date;
    reneivalDate: Date;
    licenceImgUrl: string;
  };
  insuaranceDetails: {
    amount: number;
    effectiveDate: Date;
    reneivalDate: Date;
    insuranceImgUrl: string;
  };
  smokeTestDetails: {
    amount: number;
    effectiveDate: Date;
    reneivalDate: Date;
    smokeTestImgUrl: string;
  };
  portPermitDetails: {
    amount: number;
    effectiveDate: Date;
    reneivalDate: Date;
    portPermitImgUrl: string;
  };
  leasingDetails: {
    company: string;
    amount: number;
    effectiveDate: Date;
    reneivalDate: Date;
    leasingImgUrl: string;
  };
}
