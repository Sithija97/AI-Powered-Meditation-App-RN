import React, { useState } from "react";
import { Icon } from '@iconify/react';
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
  TablePagination,
  Drawer,
  TextField,
  Popover,
  MenuItem,
  IconButton,
} from "@mui/material";


function createData(
  ownership: string,
  type: string,
  chassieNo: string,
  fuelType: string,
) {
  return { ownership, type, chassieNo, fuelType };
}

const rows = [
  createData("Manager", "Kamal", "123456789V", "abc"),
  createData("Coordinator", "Kamal", "123456789V", "abc"),
  createData("Driver", "Ramal", "123456789V", "abc"),
  createData("Helper", "Jhon", "123456789V", "abc"),
  createData("Helper", "Doe", "123456789V", "abc"),
];

export const Vehicles = () => {

  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenMenu = (event:any) => {
    setOpen(event.currentTarget);
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
        <Container  sx={{ mt: 4, mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h5" gutterBottom>
              Vehicles
            </Typography>
            <Button variant="contained">Add Vehicle</Button>
          </Stack>

          <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Ownership</b></TableCell>
                    <TableCell align="right"><b>Type</b></TableCell>
                    <TableCell align="right"><b>Chassie No</b></TableCell>
                    <TableCell align="right"><b>Fuel Type</b></TableCell>
                    <TableCell align="right"><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.type}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ownership}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.chassieNo}</TableCell>
                      <TableCell align="right">{row.fuelType}</TableCell>
                      <TableCell align="right">
                      <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                      <Icon icon="ri:more-2-fill"  width="18"/>
                            
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
          </Card>

        </Container>

        <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
        <Icon icon="tabler:edit" width="18" />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
        <Icon icon="carbon:delete" width="18" />
          Delete
        </MenuItem>
      </Popover>
      </Box>

      
    </Dashboard>
    
  );
};
