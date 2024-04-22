import { FC, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import {
  addVehicle,
  getVehicles,
  updateVehicle,
} from "../../store/vehicle/vehicleSlice";
import { useNavigate } from "react-router-dom";
import { IVehicle, RequestStatus } from "../../models";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ImageUploader } from "../../components/imageuploader";

interface IProps {
  // onClose: () => void;
}

export const UpdateVehicles: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedVehicle } = useAppSelector(
    (state: RootState) => state.vehicles
  );

  const [baseData, setBaseData] = useState({
    type: selectedVehicle?.type!,
    ownership: selectedVehicle?.ownership!,
    fuelType: selectedVehicle?.fuelType!,
    chassieNumber: selectedVehicle?.chassieNumber!,
  });
  const [revenueLicenceData, setRevenueLicenceData] = useState({
    amount: selectedVehicle?.revenueLicenceDetails.amount,
    effectiveDate: selectedVehicle?.revenueLicenceDetails.effectiveDate,
    renewalDate: selectedVehicle?.revenueLicenceDetails.renewalDate,
    licenceImgUrl: selectedVehicle?.revenueLicenceDetails.licenceImgUrl,
  });
  const [insuaranceData, setInsuaranceData] = useState({
    company: selectedVehicle?.insuaranceDetails.company,
    amount: selectedVehicle?.insuaranceDetails.amount,
    effectiveDate: selectedVehicle?.insuaranceDetails.effectiveDate,
    renewalDate: selectedVehicle?.insuaranceDetails.renewalDate,
    insuranceImgUrl: selectedVehicle?.insuaranceDetails.insuranceImgUrl,
  });
  const [smokeTestData, setSmokeTestData] = useState({
    amount: selectedVehicle?.smokeTestDetails.amount,
    effectiveDate: selectedVehicle?.smokeTestDetails.effectiveDate,
    renewalDate: selectedVehicle?.smokeTestDetails.renewalDate,
    smokeTestImgUrl: selectedVehicle?.smokeTestDetails.smokeTestImgUrl,
  });
  const [portPermitData, setPortPermitData] = useState({
    amount: selectedVehicle?.portPermitDetails.amount,
    effectiveDate: selectedVehicle?.portPermitDetails.effectiveDate,
    renewalDate: selectedVehicle?.portPermitDetails.renewalDate,
    portPermitImgUrl: selectedVehicle?.portPermitDetails.portPermitImgUrl,
  });
  const [leasingDetailsData, setLeasingDetailsData] = useState({
    company: selectedVehicle?.leasingDetails.company,
    amount: selectedVehicle?.leasingDetails.amount,
    effectiveDate: selectedVehicle?.leasingDetails.effectiveDate,
    renewalDate: selectedVehicle?.leasingDetails.renewalDate,
    leasingImgUrl: selectedVehicle?.leasingDetails.leasingImgUrl,
  });

  const handleBaseChange = (event: any) => {
    const { name, value } = event.target;
    setBaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRevenueLicenceChange = (event: any) => {
    const { name, value } = event.target;
    setRevenueLicenceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInsuaranceChange = (event: any) => {
    const { name, value } = event.target;
    setInsuaranceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSmokeTestChange = (event: any) => {
    const { name, value } = event.target;
    setSmokeTestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePortPermitChange = (event: any) => {
    const { name, value } = event.target;
    setPortPermitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLeasingDataChange = (event: any) => {
    const { name, value } = event.target;
    setLeasingDetailsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const payload: IVehicle = {
      ...baseData,
      revenueLicenceDetails: {
        amount: revenueLicenceData.amount!,
        effectiveDate: revenueLicenceData.effectiveDate!,
        renewalDate: revenueLicenceData.renewalDate!,
        licenceImgUrl: revenueLicenceData.licenceImgUrl!,
      },
      insuaranceDetails: {
        company: insuaranceData.company!,
        amount: insuaranceData.amount!,
        effectiveDate: insuaranceData.effectiveDate!,
        renewalDate: insuaranceData.renewalDate!,
        insuranceImgUrl: insuaranceData.insuranceImgUrl!,
      },
      smokeTestDetails: {
        amount: smokeTestData.amount!,
        effectiveDate: smokeTestData.effectiveDate!,
        renewalDate: smokeTestData.renewalDate!,
        smokeTestImgUrl: smokeTestData.smokeTestImgUrl!,
      },
      portPermitDetails: {
        amount: portPermitData.amount!,
        effectiveDate: portPermitData.effectiveDate!,
        renewalDate: portPermitData.renewalDate!,
        portPermitImgUrl: portPermitData.portPermitImgUrl!,
      },
      leasingDetails: {
        company: leasingDetailsData.company!,
        amount: leasingDetailsData.amount!,
        effectiveDate: leasingDetailsData.effectiveDate!,
        renewalDate: leasingDetailsData.renewalDate!,
        leasingImgUrl: leasingDetailsData.leasingImgUrl!,
      },
    };

    const vehicleData = {
      id: selectedVehicle?._id!,
      data: payload,
    };

    await dispatch(updateVehicle(vehicleData)).then((res) => {
      if (res.meta.requestStatus === RequestStatus.Fulfiled) {
        dispatch(getVehicles());
        navigate("/vehicles");
      }
    });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h3">Update Vehicle</Typography>
        <IconButton aria-label="delete">
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ownership</InputLabel>
            <Select
              label="Ownership"
              name="ownership"
              value={baseData.ownership}
              onChange={handleBaseChange}
            >
              <MenuItem value={"owned"}>Owned</MenuItem>
              <MenuItem value={"hired"}>Hired</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={baseData.type}
              onChange={handleBaseChange}
            >
              <MenuItem value={"car"}>Car</MenuItem>
              <MenuItem value={"van"}>Van</MenuItem>
              <MenuItem value={"prime motor"}>Prime Motor</MenuItem>
              <MenuItem value={"trailer"}>Trailer</MenuItem>
              <MenuItem value={"bicycle"}>Bicycle</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fuel Type</InputLabel>
            <Select
              label="Fuel Type"
              name="fuelType"
              value={baseData.fuelType}
              onChange={handleBaseChange}
            >
              <MenuItem value={"diesol"}>Diesol</MenuItem>
              <MenuItem value={"petrol"}>Petrol</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="chassieNumber"
            name="chassieNumber"
            label="Chassie Number"
            value={baseData.chassieNumber}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        Revenue Licence Details
      </Typography>
      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
            value={revenueLicenceData.amount}
            onChange={handleRevenueLicenceChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="effectiveDate"
            label="Effective Date"
            placeholder="YYYY.MM.DD"
            value={revenueLicenceData.effectiveDate}
            onChange={handleRevenueLicenceChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="renewalDate"
            label="Reneival Date"
            placeholder="YYYY.MM.DD"
            value={revenueLicenceData.renewalDate}
            onChange={handleRevenueLicenceChange}
            fullWidth
          />
        </Grid>

        <ImageUploader
          setter={setRevenueLicenceData}
          name="licenceImgUrl"
          folderName="vehicle - revenue_licences"
        />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        Insurance Details
      </Typography>

      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="company"
            name="company"
            label="Company"
            value={insuaranceData.company}
            onChange={handleInsuaranceChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
            value={insuaranceData.amount}
            onChange={handleInsuaranceChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="effectiveDate"
            label="Effective Date"
            placeholder="YYYY.MM.DD"
            value={insuaranceData.effectiveDate}
            onChange={handleInsuaranceChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="renewalDate"
            label="Reneival Date"
            placeholder="YYYY.MM.DD"
            value={insuaranceData.renewalDate}
            onChange={handleInsuaranceChange}
            fullWidth
          />
        </Grid>

        <ImageUploader
          setter={setInsuaranceData}
          name="insuranceImgUrl"
          folderName="vehicle - insuarance_licences"
        />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        Smoke Test Details
      </Typography>
      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
            value={smokeTestData.amount}
            onChange={handleSmokeTestChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="effectiveDate"
            label="Effective Date"
            placeholder="YYYY.MM.DD"
            value={smokeTestData.effectiveDate}
            onChange={handleSmokeTestChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="renewalDate"
            label="Reneival Date"
            placeholder="YYYY.MM.DD"
            value={smokeTestData.renewalDate}
            onChange={handleSmokeTestChange}
            fullWidth
          />
        </Grid>

        <ImageUploader
          setter={setSmokeTestData}
          name="smokeTestImgUrl"
          folderName="vehicle - smoke_test_licences"
        />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        Port permit Details
      </Typography>
      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
            value={portPermitData.amount}
            onChange={handlePortPermitChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="effectiveDate"
            label="Effective Date"
            placeholder="YYYY.MM.DD"
            value={portPermitData.effectiveDate}
            onChange={handlePortPermitChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="renewalDate"
            label="Reneival Date"
            placeholder="YYYY.MM.DD"
            value={portPermitData.renewalDate}
            onChange={handlePortPermitChange}
            fullWidth
          />
        </Grid>

        <ImageUploader
          setter={setPortPermitData}
          name="portPermitImgUrl"
          folderName="vehicle - port_permits"
        />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        Leasing Details
      </Typography>
      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="compnay"
            name="company"
            label="Company"
            fullWidth
            value={leasingDetailsData.company}
            onChange={handleLeasingDataChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
            value={leasingDetailsData.amount}
            onChange={handleLeasingDataChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="effectiveDate"
            label="Effective Date"
            placeholder="YYYY.MM.DD"
            value={leasingDetailsData.effectiveDate}
            onChange={handleLeasingDataChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="renewalDate"
            label="Reneival Date"
            placeholder="YYYY.MM.DD"
            value={leasingDetailsData.renewalDate}
            onChange={handleLeasingDataChange}
            fullWidth
          />
        </Grid>

        <ImageUploader
          setter={setLeasingDetailsData}
          name="leasingImgUrl"
          folderName="vehicle - leasing_documents"
        />
      </Grid>

      <Button
        sx={{ mt: 3, mb: 2 }}
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Box>
  );
};
