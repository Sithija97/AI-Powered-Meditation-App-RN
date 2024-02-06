// material-ui
import { Avatar, Box, Button, Card, Container, Drawer, Stack, Toolbar, Tooltip, Typography, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ThemeProvider,
  createTheme,
  useTheme,
  Divider, } from '@mui/material';
import { Dashboard } from '../../layouts';
import { useMemo, useState } from 'react';
import CreateHire from './createHire';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { ViewHire } from './viewHire';
import UpdateHire from './updateHire';
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
  const theme = useTheme();
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

  const tableTheme = useMemo(
    () =>
        createTheme({
            palette: {
                primary: theme.palette.secondary,

            },
        }),
    [theme],
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
            <Typography variant="h2" gutterBottom>
              Hires
            </Typography>
            <Button variant="contained" onClick={toggleDrawer('create', true)}>
              Add Hire
            </Button>
          </Stack>
          <Divider/>
          <Box mt={4} boxShadow={'0px 1px 18px 1px #BFD5EB'} padding={theme.spacing(5)}>
             <ThemeProvider theme={tableTheme}>
          <MaterialReactTable columns={columns} data={data} 
           enableRowActions
           positionActionsColumn="last"
           muiTableHeadCellProps={{
            sx: () => ({
              borderTop: '1px solid #ddd',
              background: '#FBFBFB',
              fontFamily: 'poppins',
              fontWeight: 500
          })
           }}
                muiTablePaperProps={{
                  sx: () => ({
                    boxShadow: 'none',
                  })
                }}
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
                  <VisibilityIcon />
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
          </ThemeProvider>
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
        {modalContent.view && <ViewHire/>}
        {modalContent.create && <CreateHire/>}
        {modalContent.update && <UpdateHire/>}
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
  )
};

export default Hire;
