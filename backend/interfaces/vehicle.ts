import { Document, Types } from "mongoose";

export interface IVehicle extends Document {
  user: Types.ObjectId;
  ownership: string;
  type: string;
  fuelType: string;
  chassieNumber: string;
  revenueLicenceDetails: {
    amount: number;
    effectiveDate: string;
    reneivalDate: string;
    licenceImgUrl: string;
  };
  insuaranceDetails: {
    amount: number;
    effectiveDate: string;
    reneivalDate: string;
    insuranceImgUrl: string;
  };
  smokeTestDetails: {
    amount: number;
    effectiveDate: string;
    reneivalDate: string;
    smokeTestImgUrl: string;
  };
  portPermitDetails: {
    amount: number;
    effectiveDate: string;
    reneivalDate: string;
    portPermitImgUrl: string;
  };
  leasingDetails: {
    company: string;
    amount: number;
    effectiveDate: string;
    reneivalDate: string;
    leasingImgUrl: string;
  };
}
