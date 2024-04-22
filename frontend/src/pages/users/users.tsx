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
  Drawer,
  Tooltip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  useTheme,
  createTheme,
  ThemeProvider,
  Grid,
  Pagination,
  CircularProgress,
} from "@mui/material";

import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { CreateUsers } from "./createUser";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { ViewUsers } from "./viewUser";
import { UpdateUsers } from "./updateUser";
import {
  clearSelectedUser,
  deleteUser,
  getAllUsers,
  setSelectedUser,
} from "../../store/auth/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { IUser } from "../../models";

export const Users = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const modalContentInitValues = { create: false, update: false, view: false };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(modalContentInitValues);

  const { allRegisteredUsers, isgetAllUsersLoading, userInfo } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(getAllUsers());

    // return () => {
    //   dispatch(clearSelectedUser());
    // };
  }, [dispatch]);

  const toggleDrawer = (type: any, status: any, row?: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch(setSelectedUser(row?.original));
    setModalContent({ ...modalContentInitValues, [type]: true });
    setIsModalOpen(status);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUsers = (userId: string) => {
    if (userId) {
      if (userId === userInfo?._id) {
        alert("Not allowed to delete your own Account");
      } else {
        dispatch(deleteUser(userId));
        dispatch(getAllUsers());
      }
    }
  };

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "dob",
        header: "DOB",
        size: 150,
      },
    ],
    []
  );

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
            <Box>
              <Divider
                orientation="vertical"
                sx={{ borderRightWidth: 2, mr: 3, color: "red" }}
              />
              <Typography variant="h2" gutterBottom>
                Users
              </Typography>
            </Box>
          </Stack>

          <Divider />
          {isgetAllUsersLoading ? (
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
            <Box mt={4}>
              <Box
                boxShadow={"0px 1px 18px 1px #BFD5EB"}
                padding={theme.spacing(5)}
              >
                <ThemeProvider theme={tableTheme}>
                  <MaterialReactTable
                    columns={columns}
                    data={allRegisteredUsers}
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
                            onClick={() => deleteUsers(row?.original?._id!)}
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
              {/* <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <UserCard/>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>   
              <UserCard/>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>   
              <UserCard/>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>   
              <UserCard/>
            </Grid>
          </Grid> */}
              {/* <Stack mt={theme.spacing(4)} spacing={2} justifyContent={'end'}>
              <Pagination count={10} shape="rounded" />
            </Stack> */}
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
        onClose={toggleDrawer(null, false)}
      >
        {modalContent.view && <ViewUsers />}
        {modalContent.create && <CreateUsers />}
        {modalContent.update && <UpdateUsers />}
      </Drawer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure want to delete this ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Dashboard>
  );
};
