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

export const ViewVehicle = () => {
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
          <IconButton aria-label="delete">
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
          <Typography>Chassie No</Typography>
          <Typography>{selectedVehicle?.chassieNumber}</Typography>
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
