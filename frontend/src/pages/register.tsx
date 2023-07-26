import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { register, reset } from "../store/auth/authSlice";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CustomDatePicker } from "../components/customDatePicker";
import { RequestStatus } from "../models";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDate } from "../utils/dateFormatter";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      Your Website
      {/* </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const InitialState = {
  name: "",
  nic: "",
  title: "",
  password: "",
  confirmPassword: "",
  email: "",
  address: "",
  dob: "",
  maritalStatus: "",
};

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [formData, setFormData] = useState(InitialState);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [userInfo, isError, isSuccess, message, dispatch]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      console.log(formData);
      try {
        const userData = {
          name,
          nic,
          title,
          password,
          email,
          address,
          dob: formatDate(dob),
          maritalStatus,
        };

        dispatch(register(userData)).then((res) => {
          if (res.meta.requestStatus === RequestStatus.Fulfiled) {
            navigate("/login");
          }
        });
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  const {
    name,
    nic,
    title,
    password,
    confirmPassword,
    email,
    address,
    dob,
    maritalStatus,
  } = formData;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  type="text"
                  value={name}
                  autoComplete="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nic"
                  label="NIC"
                  name="nic"
                  type="text"
                  value={nic}
                  autoComplete="nic"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  autoComplete="confirmPassword"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  type="text"
                  value={title}
                  autoComplete="title"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  type="address"
                  value={address}
                  autoComplete="address"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomDatePicker
                    name="dob"
                    label="Date Of Birth"
                    value={dob}
                    onChange={handleChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Marital status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="maritalStatus"
                    name="maritalStatus"
                    value={maritalStatus}
                    type="text"
                    label="Marital status"
                    onChange={handleChange}
                  >
                    <MenuItem value={"married"}>Married</MenuItem>
                    <MenuItem value={"unmarried"}>Unmarried</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !name ||
                !nic ||
                !title ||
                !password ||
                !confirmPassword ||
                !email ||
                !address ||
                !dob ||
                !maritalStatus
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
