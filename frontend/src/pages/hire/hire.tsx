// material-ui
import { Avatar, Box, Button, Card, Container, Drawer, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { Dashboard } from '../../layouts';
import { useMemo, useState } from 'react';
import CreateHire from './createHire';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
// ==============================|| HIRE PAGE ||============================== //
type Person = {
  HireType: string
  Vehicle: string;
  Driver: string;
  amount: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    HireType:'Adam Easton',
    Vehicle: '261 Erdman Ford',
    Driver: '077345667',
    amount: '1990-04-20',
  },
  {
    HireType:'John Doe',
    Vehicle: '769 Dominic Grove',
    Driver: '077345667',
    amount: '1990-04-20',
  }
];

const Hire = () => {
  const [show, setShow] = useState(false);
  const toggleDrawer = () => setShow(!show);
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'HireType', //access nested data with dot notation
        header: 'Hire Type',
        size: 150,
      },
      {
        accessorKey: 'Vehicle', //normal accessorKey
        header: 'Vehicle',
        size: 200,
      },
      {
        accessorKey: 'Driver',
        header: 'Driver',
        size: 150,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
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
            <Typography variant="h3" gutterBottom>
              Hires
            </Typography>
            <Button variant="contained" onClick={toggleDrawer}>
              Add Hire
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
        <CreateHire/>
      </Drawer>
  </Dashboard>
  )
};

export default Hire;
