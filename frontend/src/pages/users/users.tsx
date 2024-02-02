import React, { useMemo, useState } from "react";
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
  
} from "@mui/material"

import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { CreateUsers } from "./createUser";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { ViewUsers } from "./viewUser";
import { UpdateUsers } from "./updateUser";


type Person = {
  fullName: string
  address: string;
  mobileNo: string;
  dateOfBirth: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    fullName:'Adam Easton',
    address: '261 Erdman Ford',
    mobileNo: '077345667',
    dateOfBirth: '1990-04-20',
  },
  {
    fullName:'John Doe',
    address: '769 Dominic Grove',
    mobileNo: '077345667',
    dateOfBirth: '1990-04-20',
  }
];



export const Users = () => {
  // const toggleDrawer = () => setShow(!show);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'fullName', //access nested data with dot notation
        header: 'Full Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'mobileNo',
        header: 'Mobile No',
        size: 150,
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'DOB',
        size: 150,
      },
    ],
    [],
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
        <Container maxWidth={false}  sx={{ mt: 4, mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box>
            {/* <Divider orientation='vertical'  sx={{ borderRightWidth: 2, mr:3, color:'red' }}  /> */}
            <Typography variant="h1" gutterBottom>
              Users
            </Typography>
            </Box>
             
            <Button variant="contained" onClick={toggleDrawer('create', true)}>
              Add User
            </Button>
          </Stack>

          <Divider/>
          <Box mt={4}>
          <MaterialReactTable columns={columns} data={data} 
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
                    margin: '0 15px 0 0'
                  }}
                >
                  <VisibilityIcon />
                </Avatar>
              </Tooltip>
              <Tooltip title="Update">
                <Avatar
                onClick={toggleDrawer('update', true)}
                  sx={{
                    color:"#1e88e5",
                    background:"#eef2f6",
                    margin: '0 15px 0 0'
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
          </Box>
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
        {modalContent.view && <ViewUsers/>}
        {modalContent.create && <CreateUsers/>}
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
