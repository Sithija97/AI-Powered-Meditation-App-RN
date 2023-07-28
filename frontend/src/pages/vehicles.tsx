import React, { useEffect, useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Toolbar,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  Popover,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, Edit } from "@mui/icons-material";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { deleteVehicle, getVehicles } from "../store/vehicle/vehicleSlice";
import { Vehicle } from "../models";
import { useNavigate } from "react-router-dom";

export const Vehicles = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const [vehicleId, setVehicleId] = useState<string>("");

  const { vehicleInfo, getVehiclesLoading } = useAppSelector(
    (state: RootState) => state.vehicles
  );

  useEffect(() => {
    dispatch(getVehicles());
  }, []);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenMenu = (event: any, id: string) => {
    setVehicleId(id);
    setOpen(event.currentTarget);
  };

  const deleteVehicleData = () => {
    if (vehicleId) {
      dispatch(deleteVehicle(vehicleId));
      dispatch(getVehicles());
    }
    handleCloseMenu();
  };

  return (
    <Dashboard>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h5" gutterBottom>
              Vehicles
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/createVehicle")}
            >
              Add Vehicle
            </Button>
          </Stack>

          <Card>
            {getVehiclesLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Ownership</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Type</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Chassie No</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Fuel Type</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Actions</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehicleInfo.map((vehicle: Vehicle) => (
                      <TableRow
                        key={vehicle._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {vehicle.ownership}
                        </TableCell>
                        <TableCell align="right">{vehicle.type}</TableCell>
                        <TableCell align="right">
                          {vehicle.chassieNumber}
                        </TableCell>
                        <TableCell align="right">{vehicle.fuelType}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(event) =>
                              handleOpenMenu(event, vehicle._id)
                            }
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      {/* <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} /> */}
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            )}
          </Card>
        </Container>

        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              "& .MuiMenuItem-root": {
                px: 1,
                typography: "body2",
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>

          <MenuItem sx={{ color: "error.main" }} onClick={deleteVehicleData}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Popover>
      </Box>
    </Dashboard>
  );
};
