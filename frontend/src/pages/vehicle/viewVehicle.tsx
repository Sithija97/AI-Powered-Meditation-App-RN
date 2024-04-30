import React, { useState } from "react";
import { Dashboard } from "../../layouts";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { RootState, useAppSelector } from "../../store/store";
import PropTypes from 'prop-types';
import ImageIcon from '@mui/icons-material/Image';
import CustomDialog from "../../components/common/customDialog";

export const ViewVehicle = ({ onClose }:any) => {
  const [showLogin, setShowLogin] = useState(false);
  const [title, setTitle] = useState('');
  const { selectedVehicle } = useAppSelector(
    (state: RootState) => state.vehicles
  );
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
          <Typography variant="h3">View Vehicle</Typography>
          <IconButton aria-label="delete" onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </Stack>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography>Ownership</Typography>
          <Typography>{selectedVehicle?.ownership}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Type</Typography>
          <Typography>{selectedVehicle?.type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Fuel Type</Typography>
          <Typography>{selectedVehicle?.fuelType}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Vehicle No</Typography>
          <Typography>{selectedVehicle?.vehicleNo}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Chassie No</Typography>
          <Typography>{selectedVehicle?.chassieNumber}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 3, mt: 2 }} />

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <Box display={'flex'} alignItems={'center'}> 
        <Typography variant="h3">Revenue Licence Details</Typography>
          <Box sx={{ display: "flex" }} ml={2}>
                <Tooltip title="View">
                  <Avatar
                    sx={{
                      color: "#00c853",
                      background: "#b9f6ca61",
                      margin: "0 15px 0 0",
                    }}
                  >
                    <ImageIcon onClick={() => {setShowLogin(true);setTitle('Revenue Licence')}}/>
                  </Avatar>
                </Tooltip>

              </Box>
        </Box>
          
        </Grid>
        <Grid item xs={6}>
          <Typography>Amount</Typography>
          <Typography>{selectedVehicle?.revenueLicenceDetails?.amount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Effective Date</Typography>
          <Typography>{selectedVehicle?.revenueLicenceDetails?.effectiveDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Renewal Date</Typography>
          <Typography>{selectedVehicle?.revenueLicenceDetails?.renewalDate}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3, mt: 2 }} />

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
          <Typography variant="h3">Insurance Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Company</Typography>
          <Typography>{selectedVehicle?.insuaranceDetails?.company}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Amount</Typography>
          <Typography>{selectedVehicle?.insuaranceDetails?.amount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Effective Date</Typography>
          <Typography>{selectedVehicle?.insuaranceDetails?.effectiveDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Renewal Date</Typography>
          <Typography>{selectedVehicle?.insuaranceDetails?.renewalDate}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3, mt: 2 }} />

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
          <Typography variant="h3">Smoke Test Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Amount</Typography>
          <Typography>{selectedVehicle?.smokeTestDetails?.amount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Effective Date</Typography>
          <Typography>{selectedVehicle?.smokeTestDetails?.effectiveDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Renewal Date</Typography>
          <Typography>{selectedVehicle?.smokeTestDetails?.renewalDate}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3, mt: 2 }} />

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
          <Typography variant="h3">Port Permit Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Amount</Typography>
          <Typography>{selectedVehicle?.portPermitDetails?.amount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Effective Date</Typography>
          <Typography>{selectedVehicle?.portPermitDetails?.effectiveDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Renewal Date</Typography>
          <Typography>{selectedVehicle?.portPermitDetails?.renewalDate}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3, mt: 2 }} />

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
          <Typography variant="h3">Leasing Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Company</Typography>
          <Typography>{selectedVehicle?.leasingDetails?.company}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Amount</Typography>
          <Typography>{selectedVehicle?.leasingDetails?.amount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Effective Date</Typography>
          <Typography>{selectedVehicle?.leasingDetails?.effectiveDate}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Renewal Date</Typography>
          <Typography>{selectedVehicle?.leasingDetails?.renewalDate}</Typography>
        </Grid>
      </Grid>
        <Box mt={3}>
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
        <CustomDialog title={title}  show={showLogin} close={() => setShowLogin(false)}/>
    </Box>
   
  );
};

export default ViewVehicle;

ViewVehicle.propTypes = {
  onClose: PropTypes.func
};
