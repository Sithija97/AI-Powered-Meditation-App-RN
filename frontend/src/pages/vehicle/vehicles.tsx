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
import { ViewVehicle } from "./viewVehicle";
import { UpdateVehicles } from "./updateVehicle";

export const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const modalContentInitValues = { create: false, update: false, view: false };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(modalContentInitValues);


  const toggleDrawer = (type:any, status:any) => (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setModalContent({ ...modalContentInitValues, [type]: true });
    setIsModalOpen(status);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
;
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


  const deleteVehicleData = (vehicleId: string) => {
    if (vehicleId) {
      dispatch(deleteVehicle(vehicleId));
      dispatch(getVehicles());
    }
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Button variant="contained" onClick={toggleDrawer('create', true)}>
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
                     onClick={toggleDrawer('view', true)}
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
                   onClick={toggleDrawer('update', true)}
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
                     onClick={handleClickOpen}
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
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: { sm: '600px', xs: '100%' },
            boxSizing: 'border-box'
          }
        }}
        anchor="right"
        open={isModalOpen}
        onClose={toggleDrawer(null, false)}
      >
        {modalContent.view && <ViewVehicle/>}
        {modalContent.create && <CreateVehicles/>}
        {modalContent.update && <UpdateVehicles/>}
      </Drawer>
      {/* <Drawer open={show} onClose={toggleDrawer} anchor="right">
        <CreateVehicles onClose={toggleDrawer} />
      </Drawer> */}
    </Dashboard>
  );
};
