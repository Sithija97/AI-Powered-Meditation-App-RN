import React, { useEffect, useMemo, useState } from "react";
import { Dashboard } from "../../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Toolbar,
  Typography,
  CircularProgress,
  Drawer,
  Tooltip,
  Avatar,
} from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { deleteVehicle, getVehicles } from "../../store/vehicle/vehicleSlice";
import { Vehicle } from "../../models";
import { useNavigate } from "react-router-dom";
import { CreateVehicles } from "./createVehicle";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const Vehicles = () => {
  const [show, setShow] = useState(false);
  const toggleDrawer = () => setShow(!show);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  // const [vehicleId, setVehicleId] = useState<string>("");

  const { vehicleInfo, getVehiclesLoading } = useAppSelector(
    (state: RootState) => state.vehicles
  );

  const columns = useMemo<MRT_ColumnDef<Vehicle>[]>(
    () => [
      {
        accessorKey: 'chassieNumber', //access nested data with dot notation
        header: 'Chassie No',
        size: 150,
      },
      {
        accessorKey: 'type', //normal accessorKey
        header: 'Type',
        size: 200,
      },
      {
        accessorKey: 'ownership',
        header: 'Owenership',
        size: 150,
      },
      {
        accessorKey: 'fuelType',
        header: 'Fuel Type',
        size: 150,
      },
    ],
    [],
  );

  useEffect(() => {
    dispatch(getVehicles());
  }, []);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenMenu = (event: any, id: string) => {
    // setVehicleId(id);
    setOpen(event.currentTarget);
  };

  const deleteVehicleData = (vehicleId: string) => {
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
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h3" gutterBottom>
              Vehicles
            </Typography>
            <Button variant="contained" onClick={toggleDrawer}>
              Add Vehicle
            </Button>
          </Stack>
          <Card>
            {getVehiclesLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "15px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <MaterialReactTable columns={columns} data={vehicleInfo} 
              enableRowActions
              positionActionsColumn="last"
              displayColumnDefOptions={{
                'mrt-row-actions': {
                  size: 120 //make actions column wider
                }
              }}
              renderRowActions={({ row }) => (
               <Box sx={{ display: 'flex' }}>
                 <Tooltip title="View">
                   <Avatar
                     sx={{
                       color:"#00c853",
                       background:"#b9f6ca61",
                       margin: '0 8px 0 0'
                     }}
                   >
                     <VisibilityIcon/>
                   </Avatar>
                 </Tooltip>
                 <Tooltip title="Update">
                   <Avatar
                     sx={{
                       color:"#1e88e5",
                       background:"#eef2f6",
                       margin: '0 8px 0 0'
                     }}
                   >
                     <EditNoteIcon />
                   </Avatar>
                 </Tooltip>
                 <Tooltip title="Delete">
                   <Avatar
                  //  onClick={() => {
                  //   deleteVehicleData(Vehicle._id);
                  // }}
                     sx={{
                       color: "#d84315",
                       background:"#fbe9e7"
                     }}
                   >
                     <DeleteOutlineIcon/>
                   </Avatar>
                 </Tooltip>
               </Box>
             )}
             />
            )}
          </Card>
        </Container>

  
      </Box>

      <Drawer open={show} onClose={toggleDrawer} anchor="right">
        <CreateVehicles onClose={toggleDrawer} />
      </Drawer>
    </Dashboard>
  );
};
