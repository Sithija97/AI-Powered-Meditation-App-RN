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
} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { CreateUsers } from "./createUser";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';


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
  const [show, setShow] = useState(false);
  const toggleDrawer = () => setShow(!show);

  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
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
        <Container maxWidth={false}  sx={{ mt: 4, mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h5" gutterBottom>
              Users
            </Typography>
            <Button variant="contained" onClick={toggleDrawer}>
              Add User
            </Button>
          </Stack>

          <Card>
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
                  sx={{
                    color:"#00c853",
                    background:"#b9f6ca61",
                    margin: '0 8px 0 0'
                  }}
                >
                  <VisibilityIcon />
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
          </Card>
        </Container>
      </Box>

      <Drawer
       sx={{
        '& .MuiDrawer-paper': {
          width: { sm: '600px', xs: '100%' },
          boxSizing: 'border-box',
          zIndex:1300
        }
      }}
      open={show} onClose={toggleDrawer} anchor="right">
        <CreateUsers/>
      </Drawer>
      
    </Dashboard>
  );
};
