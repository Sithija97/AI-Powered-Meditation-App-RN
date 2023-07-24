import React, { useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

function createData(type: string, name: string, nic: string, address: string) {
  return { type, name, nic, address };
}

const rows = [
  createData("Manager", "Kamal", "123456789V", "abc"),
  createData("Coordinator", "Kamal", "123456789V", "abc"),
  createData("Driver", "Ramal", "123456789V", "abc"),
  createData("Helper", "Jhon", "123456789V", "abc"),
  createData("Helper", "Doe", "123456789V", "abc"),
];

export const Users = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenMenu = (event: any) => {
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
        <Container sx={{ mt: 4, mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h5" gutterBottom>
              Users
            </Typography>
            <Button variant="contained" onClick={() => navigate("/createUser")}>
              Add User
            </Button>
          </Stack>

          <Card sx={{ p: 2, mb: 2 }}>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select label="Type">
                      <MenuItem value={10}>Manager</MenuItem>
                      <MenuItem value={20}>Coordinator</MenuItem>
                      <MenuItem value={30}>Driver</MenuItem>
                      <MenuItem value={40}>Helper</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </Card>

          <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Type</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>NIC</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Address</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.type}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.type}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.nic}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={handleOpenMenu}
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
            {/* <EditIcon fontSize="small" /> */}
            Edit
          </MenuItem>
          <MenuItem sx={{ color: "error.main" }}>Delete</MenuItem>
        </Popover>
      </Box>
    </Dashboard>
  );
};
