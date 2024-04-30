import React from "react";
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
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { RootState, useAppSelector } from "../../store/store";

export const ViewHire = ({onClose }:any) => {
  const { selectedHire } = useAppSelector((state: RootState) => state.hires);
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
          <Typography variant="h3">View Hire</Typography>
          <IconButton aria-label="delete" onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </Stack>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography>Hire Type</Typography>
          <Typography>{selectedHire?.hireType}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Vehicle</Typography>
          <Typography>{selectedHire?.vehicle?.type} - {selectedHire?.vehicle?.vehicleNo}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Driver</Typography>
          <Typography>{selectedHire?.driver?.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Date</Typography>
          <Typography>{selectedHire?.date}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Start Time</Typography>
          <Typography>{selectedHire?.startTime}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Start Location</Typography>
          <Typography>{selectedHire?.startLocation}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>End Time</Typography>
          <Typography>{selectedHire?.endTime}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>End Location</Typography>
          <Typography>{selectedHire?.endLocation}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Distance</Typography>
          <Typography>{selectedHire?.distance}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Amount</Typography>
          <Typography>{selectedHire?.amount}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Stack>
        <Box>
          <Button
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
