import React, { useState } from "react";
import { Dashboard } from "../../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ImageUploader } from "../../components/imageuploader";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { IUser, RequestStatus } from "../../models";
import { getAllUsers, updateUser } from "../../store/auth/authSlice";

export const UpdateUsers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedUser } = useAppSelector((state: RootState) => state.auth);

  const [baseData, setBaseData] = useState({
    role: selectedUser?.role!,
    title: selectedUser?.title!,
    name: selectedUser?.name!,
    gender: selectedUser?.gender!,
    address: selectedUser?.address!,
    mobileNumber: selectedUser?.mobileNumber!,
    dob: selectedUser?.dob!,
    maritalStatus: selectedUser?.maritalStatus!,
    email: selectedUser?.email!,
    nic: selectedUser?.nic!,
    profileImgUrl: "",
  });
  const [nicData, setNicData] = useState({
    nic:
      selectedUser?.nicDetails?.nic !== ""
        ? selectedUser?.nicDetails?.nic
        : selectedUser?.nic,
    startDate: selectedUser?.nicDetails?.startDate,
    endDate: selectedUser?.nicDetails?.endDate,
    nicImageUrl: selectedUser?.nicDetails?.nicImageUrl,
  });
  const [policeReportData, setPoliceReportData] = useState({
    reportNumber: selectedUser?.policeReportsDetails?.reportNumber,
    startDate: selectedUser?.policeReportsDetails?.startDate,
    endDate: selectedUser?.policeReportsDetails?.endDate,
    policeReportImageUrl:
      selectedUser?.policeReportsDetails?.policeReportImageUrl!,
  });
  const [licenceData, setLicenceData] = useState({
    licenceNumber: selectedUser?.drivingLicenceDetails?.licenceNumber,
    startDate: selectedUser?.drivingLicenceDetails?.startDate,
    endDate: selectedUser?.drivingLicenceDetails?.endDate,
    drivingLicenceImageUrl:
      selectedUser?.drivingLicenceDetails?.drivingLicenceImageUrl!,
  });

  const handleBaseChange = (event: any) => {
    const { name, value } = event.target;
    setBaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNicDataChange = (event: any) => {
    const { name, value } = event.target;
    setNicData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePoliceReportDataChange = (event: any) => {
    const { name, value } = event.target;
    setPoliceReportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLicenceDataChange = (event: any) => {
    const { name, value } = event.target;
    setLicenceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const payload: IUser = {
      ...baseData,
      nicDetails: {
        nic: nicData?.nic!,
        startDate: nicData?.startDate!,
        endDate: nicData?.endDate!,
        nicImageUrl: nicData?.nicImageUrl!,
      },
      policeReportsDetails: {
        reportNumber: policeReportData?.reportNumber!,
        startDate: policeReportData?.startDate!,
        endDate: policeReportData?.endDate!,
        policeReportImageUrl: policeReportData?.policeReportImageUrl!,
      },
      drivingLicenceDetails: {
        licenceNumber: licenceData?.licenceNumber!,
        startDate: licenceData?.startDate!,
        endDate: licenceData?.endDate!,
        drivingLicenceImageUrl: licenceData?.drivingLicenceImageUrl!,
      },
    };

    const userData = {
      id: selectedUser?._id!,
      data: payload,
    };

    await dispatch(updateUser(userData)).then((res) => {
      if (res.meta.requestStatus === RequestStatus.Fulfiled) {
        dispatch(getAllUsers());
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
        <Typography variant="h3">Update User</Typography>
        <IconButton aria-label="delete">
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              label="Type"
              name="role"
              value={baseData.role}
              onChange={handleBaseChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="coordinator">Coordinator</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
              <MenuItem value="helper">Helper</MenuItem>
              <MenuItem value="idle">Idle</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <Select
              label="Title"
              name="title"
              value={baseData.title}
              onChange={handleBaseChange}
            >
              <MenuItem value="untitled">Select Title</MenuItem>
              <MenuItem value="mr">Mr</MenuItem>
              <MenuItem value="mrs">Mrs</MenuItem>
              <MenuItem value="ms">Ms</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Full Name"
            value={baseData.name}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              label="Gender"
              name="gender"
              value={baseData.gender}
              onChange={handleBaseChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Marital Status
            </InputLabel>
            <Select
              label="Marital Status"
              name="maritalStatus"
              value={baseData.maritalStatus}
              onChange={handleBaseChange}
            >
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="unmarried">Unmarried</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            value={baseData.address}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="mobileNumber"
            name="mobileNumber"
            label="Mobile No"
            value={baseData.mobileNumber}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="dob"
            name="dob"
            placeholder="YYYY.MM.DD"
            label="Date of Birth"
            value={baseData.dob}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        NIC Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="nic"
            name="nic"
            label="NIC"
            value={nicData.nic}
            onChange={handleNicDataChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="startDate"
            name="startDate"
            placeholder="YYYY.MM.DD"
            label="Start Date"
            value={nicData.startDate}
            onChange={handleNicDataChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="endDate"
            name="endDate"
            placeholder="YYYY.MM.DD"
            label="End Date"
            value={nicData.endDate}
            onChange={handleNicDataChange}
            fullWidth
          />
        </Grid>
        <ImageUploader
          setter={setNicData}
          name="nicImageUrl"
          folderName="user - nic_details"
        />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Police Report Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="reportNumber"
            name="reportNumber"
            label="Report No"
            value={policeReportData.reportNumber}
            onChange={handlePoliceReportDataChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="startDate"
            name="startDate"
            placeholder="YYYY.MM.DD"
            label="Start Date"
            value={policeReportData.startDate}
            onChange={handlePoliceReportDataChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="endDate"
            name="endDate"
            placeholder="YYYY.MM.DD"
            label="End Date"
            value={policeReportData.endDate}
            onChange={handlePoliceReportDataChange}
            fullWidth
          />
        </Grid>
        <ImageUploader
          setter={setPoliceReportData}
          name="policeReportImageUrl"
          folderName="user - police_reports"
        />
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Driving Licence Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="licenceNumber"
            name="licenceNumber"
            label="Licence No"
            value={licenceData.licenceNumber}
            onChange={handleLicenceDataChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="startDate"
            name="startDate"
            placeholder="YYYY.MM.DD"
            label="Start Date"
            value={licenceData.startDate}
            onChange={handleLicenceDataChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="endDate"
            name="endDate"
            placeholder="YYYY.MM.DD"
            label="End Date"
            value={licenceData.endDate}
            onChange={handleLicenceDataChange}
            fullWidth
          />
        </Grid>
        <ImageUploader
          setter={setLicenceData}
          name="drivingLicenceImageUrl"
          folderName="user - driving_licences"
        />
      </Grid>
      <Button
        sx={{ mt: 3, mb: 2, ms: 3 }}
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Box>
  );
};
