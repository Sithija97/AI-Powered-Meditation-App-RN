import React from "react";
import { Dashboard } from "../../layouts";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { RootState, useAppSelector } from "../../store/store";
import PropTypes from 'prop-types';

export const ViewUsers = ({ onClose }:any) => {
  const { selectedUser } = useAppSelector((state: RootState) => state.auth);

  return (
    <Box sx={{ padding: "20px" }}>
      <Stack className="mt-2 p-2">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h3">View User</Typography>
          <IconButton aria-label="delete" onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </Stack>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography>Role</Typography>
          <Typography>{selectedUser?.role}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Full Name</Typography>
          <Typography>{selectedUser?.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Gender</Typography>
          <Typography>{selectedUser?.gender}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Mobile</Typography>
          <Typography>{selectedUser?.mobileNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Address</Typography>
          <Typography>{selectedUser?.address}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Email</Typography>
          <Typography>{selectedUser?.email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Date Of Birth</Typography>
          <Typography>{selectedUser?.dob}</Typography>
        </Grid>
        </Grid>

        <Divider sx={{ mb: 3, mt: 2 }} />
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h3">Licence Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>NIC</Typography>
          <Typography>{selectedUser?.nic}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Start Date</Typography>
          <Typography>{selectedUser?.nicDetails?.startDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>End Date</Typography>
          <Typography>{selectedUser?.nicDetails?.endDate}</Typography>
        </Grid>
        </Grid>
       
        <Divider sx={{ mb: 3, mt: 2 }} />
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h3">Police Report Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Report No</Typography>
          <Typography>
            {selectedUser?.policeReportsDetails?.reportNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Start Date</Typography>
          <Typography>
            {" "}
            {selectedUser?.policeReportsDetails?.startDate}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>End Date</Typography>
          <Typography>
            {" "}
            {selectedUser?.policeReportsDetails?.endDate}
          </Typography>
        </Grid>
        </Grid>
        <Divider sx={{ mb: 3, mt: 2 }} />
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h3">Driving Licence Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Licence No</Typography>
          <Typography>
            {" "}
            {selectedUser?.drivingLicenceDetails?.licenceNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Start Date</Typography>
          {selectedUser?.drivingLicenceDetails?.startDate}
          <Typography></Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>End Date</Typography>
          {selectedUser?.drivingLicenceDetails?.endDate}
          <Typography></Typography>
        </Grid>
        </Grid>
    
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Stack>
        <Box>
          <Button
          onClick={onClose}
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ViewUsers;

ViewUsers.propTypes = {
  onClose: PropTypes.func
};
