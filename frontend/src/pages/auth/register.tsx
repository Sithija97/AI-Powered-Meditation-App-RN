import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { register, reset } from "../../store/auth/authSlice";
import { CircularProgress, Divider, Paper } from "@mui/material";
import { RequestStatus } from "../../models";
import { formatDate } from "../../utils/dateFormatter";
import loginImg from "../../assets/images/login.png";
import logo from "../../assets/images/logonew.png";
import loginBgImg from "../../assets/images/bg.png";
import themes from "../../themes";
import { LOGIN } from "../../routes";
import {
  initialDrivingLicenceDetails,
  initialNicDetails,
  initialPoliceReportDetails,
} from "./data";
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
  const [errors, setErrors] = useState({
    name: "",
    nic: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [userInfo, isError, isSuccess, message, dispatch]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // validation and update error message
    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "Name should only contain letters and spaces",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "",
        }));
      }
    } else if (name === "password") {
      if (value.length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password should be at least 6 characters long",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
    } else if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    } else if (name === "nic") {
      if (!/^\d{9}[vVxX]?$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nic: "Please enter a valid NIC",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nic: "",
        }));
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const userData = {
          name,
          nic,
          title,
          password,
          email,
          address,
          dob,
          maritalStatus,
          nicDetails: initialNicDetails,
          policeReportsDetails: initialPoliceReportDetails,
          drivingLicenceDetails: initialDrivingLicenceDetails,
        };

        const errorMessages = Object.values(errors).filter(
          (error) => error !== ""
        );

        if (errorMessages.length > 0) {
          toast.error(errorMessages.join("\n"));
        } else {
          await dispatch(register(userData)).then((res) => {
            if (res.meta.requestStatus === RequestStatus.Fulfiled) {
              navigate(LOGIN);
            }
          });
        }
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "15px" }}>
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
    <ThemeProvider theme={themes}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: `url(${loginBgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: {
            xs: "20px 25px 40px 25px",
            sm: "40px 100px 40px 100px",
            xl: "40px 250px 40px 250px",
          },
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={6}
          sx={{
            height: { xs: "200px", md: "auto" },
            backgroundImage: `url(${loginImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box mt={5}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ p: 4 }}
            >
              <Box sx={{ display: "flex", mb: 4 }}>
                <img src={logo} width={150} alt="logo" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "4px",
                    marginLeft: "10px",
                  }}
                >
                  <Typography
                    variant="h1"
                    lineHeight={"28px"}
                    fontWeight={"200"}
                    color={"#6b6b6b"}
                  >
                    Transport Management
                  </Typography>
                  <Typography
                    variant="h3"
                    mt={2}
                    fontWeight={"200"}
                    color={defaultTheme.palette.primary.main}
                  >
                    / Signup
                  </Typography>
                </Box>
              </Box>
              <Grid mt={5} container spacing={2}>
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
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
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
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
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
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
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
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
                {/* <Grid item xs={12}>
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
              </Grid> */}
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
                {/* <Grid item xs={12}>
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
              </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomDatePicker
                    name="dob"
                    label="Date Of Birth"
                    value={dob}
                    onChange={handleChange}
                  />
                </LocalizationProvider>
              </Grid> */}
                {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "124px",
                  borderRadius: "25px",
                  boxShadow: "none",
                  padding: "10px",
                }}
                disabled={
                  !name || !nic || !password || !confirmPassword || !email
                }
              >
                Sign Up
              </Button>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
