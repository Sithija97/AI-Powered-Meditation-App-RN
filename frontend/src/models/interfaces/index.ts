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

export interface NicDetails {
  nic: string;
  startDate: string;
  endDate: string;
  nicImageUrl: string;
}

export interface PoliceReportsDetails {
  reportNumber: string | number;
  startDate: string;
  endDate: string;
  policeReportImageUrl: string;
}

export interface DrivingLicenceDetails {
  licenceNumber: string | number;
  startDate: string;
  endDate: string;
  drivingLicenceImageUrl: string;
}

interface RevenueLicenceDetails {
  amount: number;
  effectiveDate: string;
  renewalDate: string;
  licenceImgUrl: string;
}

interface InsuaranceDetails {
  company: string;
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

export interface IUser {
  _id?: string;
  name: string;
  title: string;
  nic: string;
  role: string;
  maritalStatus: string;
  mobileNumber: string;
  email: string;
  address: string;
  dob: string | null;
  gender: string;
  profileImgUrl: string;
  nicDetails: NicDetails;
  policeReportsDetails: PoliceReportsDetails;
  drivingLicenceDetails: DrivingLicenceDetails;
}

export interface IHire {
  _id?: string;
  hireType: string;
  vehicle: IVehicle;
  driver: IUser;
  date: string;
  startTime: string;
  startLocation: string;
  endTime: string;
  endLocation: string;
  distance: string;
  amount: number;
}

export interface IHireInput {
  _id?: string;
  hireType: string;
  vehicle: string;
  driver: string;
  date: string;
  startTime: string;
  startLocation: string;
  endTime: string;
  endLocation: string;
  distance: string;
  amount: number;
}

export interface VehicleData {
  type: string;
  ownership: string;
  fuelType: string;
  chassieNumber: string;
}

export interface IInitialVehicleState {
  vehicleInfo: IVehicle[];
  allVehicles: IVehicle[];
  selectedVehicle: IVehicle | null;
  getVehiclesError: boolean;
  getVehiclesSuccess: boolean;
  getVehiclesLoading: boolean;
  getVehiclesMessage: string;
  getAllVehiclesLoading: boolean;
  getAllVehiclesSuccess: boolean;
  getAllVehiclesError: boolean;
  getAllVehiclesMessage: string;
  addVehicleError: boolean;
  addVehicleSuccess: boolean;
  addVehicleLoading: boolean;
  addVehicleMessage: string;
  deleteVehicleError: boolean;
  deleteVehicleSuccess: boolean;
  deleteVehicleLoading: boolean;
  deleteVehicleMessage: string;
}

export interface IInitialAuthState {
  userInfo: IUser | null;
  selectedUser: IUser | null;
  allRegisteredUsers: IUser[];
  drivers: IUser[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isgetAllUsersLoading: boolean;
  isgetAllUsersSuccess: boolean;
  isgetAllUsersError: boolean;
  getDriversLoading: boolean;
  getDriversSuccess: boolean;
  getDriversError: boolean;
  getDriversMessage: string;
  message: string;
}

export interface IIniitalHireState {
  hires: IHire[];
  allHires: IHire[];
  selectedHire: IHire | null;
  getHiresLoading: boolean;
  getHiresSuccess: boolean;
  getHiresError: boolean;
  getHiresMessage: string;
  getAllHiresLoading: boolean;
  getAllHiresSuccess: boolean;
  getAllHiresError: boolean;
  getAllHiresMessage: string;
}
