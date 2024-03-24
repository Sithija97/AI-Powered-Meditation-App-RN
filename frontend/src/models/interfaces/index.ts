export interface userRegistrationData {
  name: string;
  nic: string;
  title: string;
  password: string;
  email: string;
  address: string;
  dob: string;
  maritalStatus: string;
}

export interface userLoginData {
  nic: string;
  password: string;
}
interface RevenueLicenceDetails {
  amount: number;
  effectiveDate: string;
  renewalDate: string;
  licenceImgUrl: string;
}

interface InsuaranceDetails {
  amount: number;
  effectiveDate: string;
  renewalDate: string;
  insuranceImgUrl: string;
}

interface SmokeTestDetails {
  amount: number;
  effectiveDate: string;
  renewalDate: string;
  smokeTestImgUrl: string;
}

interface PortPermitDetails {
  amount: number;
  effectiveDate: string;
  renewalDate: string;
  portPermitImgUrl: string;
}

interface LeasingDetails {
  company: string;
  amount: number;
  effectiveDate: string;
  renewalDate: string;
  leasingImgUrl: string;
}

export interface IVehicle {
  _id?: string;
  user?: string;
  ownership: string;
  type: string;
  fuelType: string;
  chassieNumber: string;
  revenueLicenceDetails: RevenueLicenceDetails;
  insuaranceDetails: InsuaranceDetails;
  smokeTestDetails: SmokeTestDetails;
  portPermitDetails: PortPermitDetails;
  leasingDetails: LeasingDetails;
  [key: string]: any; // Index signature allowing string indexing
}

export interface VehicleData {
  type: string;
  ownership: string;
  fuelType: string;
  chassieNumber: string;
}

export interface IInitialState {
  vehicleInfo: IVehicle[];
  selectedVehicle: IVehicle | null;
  getVehiclesError: boolean;
  getVehiclesSuccess: boolean;
  getVehiclesLoading: boolean;
  getVehiclesMessage: string;
  addVehicleError: boolean;
  addVehicleSuccess: boolean;
  addVehicleLoading: boolean;
  addVehicleMessage: string;
  deleteVehicleError: boolean;
  deleteVehicleSuccess: boolean;
  deleteVehicleLoading: boolean;
  deleteVehicleMessage: string;
}
