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
  ThemeProvider,
  createTheme,
  useTheme,
  Divider,
} from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import {
  clearSelectedVehicle,
  deleteVehicle,
  getVehicles,
  setSelectedVehicle,
} from "../../store/vehicle/vehicleSlice";
import { useNavigate } from "react-router-dom";
import { CreateVehicles } from "./createVehicle";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { ViewVehicle } from "./viewVehicle";
import { UpdateVehicles } from "./updateVehicle";

export const Vehicles = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const modalContentInitValues = { create: false, update: false, view: false };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(modalContentInitValues);

  const toggleDrawer = (type: any, status: any, row: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log(row?.original);
    dispatch(setSelectedVehicle(row?.original));
    setModalContent({ ...modalContentInitValues, [type]: true });
    setIsModalOpen(status);
  };

  const dispatch = useAppDispatch();

  const { vehicleInfo, getVehiclesLoading } = useAppSelector(
    (state: RootState) => state.vehicles
  );

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "chassieNumber", //access nested data with dot notation
        header: "Chassie No",
        size: 150,
      },
      {
        accessorKey: "type", //normal accessorKey
        header: "Type",
        size: 200,
      },
      {
        accessorKey: "ownership",
        header: "Owenership",
        size: 150,
      },
      {
        accessorKey: "fuelType",
        header: "Fuel Type",
        size: 150,
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getVehicles());

    return () => {
      dispatch(clearSelectedVehicle());
    };
  }, [dispatch]);

  const deleteVehicleData = (vehicleId: string) => {
    if (vehicleId) {
      dispatch(deleteVehicle(vehicleId));
      dispatch(getVehicles());
    }
  };

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: theme.palette.secondary,
        },
      }),
    [theme]
  );

  return (
    <Dashboard>
      <Box
        component="main"
        sx={{
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
            mb={2}
          >
            <Typography variant="h2" gutterBottom>
              Vehicles
            </Typography>
            <Button
              variant="contained"
              onClick={toggleDrawer("create", true, "")}
            >
              Add Vehicle
            </Button>
          </Stack>
          <Divider />

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
            <Box
              mt={4}
              boxShadow={"0px 1px 18px 1px #BFD5EB"}
              padding={theme.spacing(5)}
            >
              <ThemeProvider theme={tableTheme}>
                <MaterialReactTable
                  columns={columns}
                  data={vehicleInfo}
                  enableRowActions
                  positionActionsColumn="last"
                  muiTableHeadCellProps={{
                    sx: () => ({
                      borderTop: "1px solid #ddd",
                      background: "#FBFBFB",
                      fontFamily: "poppins",
                      fontWeight: 500,
                    }),
                  }}
                  muiTablePaperProps={{
                    sx: () => ({
                      boxShadow: "none",
                    }),
                  }}
                  displayColumnDefOptions={{
                    "mrt-row-actions": {
                      size: 120, //make actions column wider
                    },
                  }}
                  renderRowActions={({ row }) => (
                    <Box sx={{ display: "flex" }}>
                      <Tooltip title="View">
                        <Avatar
                          onClick={toggleDrawer("view", true, row)}
                          sx={{
                            color: "#00c853",
                            background: "#b9f6ca61",
                            margin: "0 15px 0 0",
                          }}
                        >
                          <VisibilityIcon />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Update">
                        <Avatar
                          onClick={toggleDrawer("update", true, row)}
                          sx={{
                            color: "#1e88e5",
                            background: "#eef2f6",
                            margin: "0 15px 0 0",
                          }}
                        >
                          <EditNoteIcon />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          onClick={() => deleteVehicleData(row?.original?._id)}
                          sx={{
                            color: "#d84315",
                            background: "#fbe9e7",
                          }}
                        >
                          <DeleteOutlineIcon />
                        </Avatar>
                      </Tooltip>
                    </Box>
                  )}
                />
              </ThemeProvider>
            </Box>
          )}
        </Container>
      </Box>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: { sm: "600px", xs: "100%" },
            boxSizing: "border-box",
          },
        }}
        anchor="right"
        open={isModalOpen}
        onClose={toggleDrawer(null, false, "")}
      >
        {modalContent.view && <ViewVehicle />}
        {modalContent.create && <CreateVehicles />}
        {modalContent.update && <UpdateVehicles />}
      </Drawer>
      {/* <Drawer open={show} onClose={toggleDrawer} anchor="right">
        <CreateVehicles onClose={toggleDrawer} />
      </Drawer> */}
    </Dashboard>
  );
};
