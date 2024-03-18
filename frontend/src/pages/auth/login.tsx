import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { login, reset } from "../../store/auth/authSlice";
import { CircularProgress, Divider, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { RequestStatus } from "../../models";
import loginBgImg from "../../assets/images/bg.png";
import loginImg from "../../assets/images/login.png";
import logo from "../../assets/images/logo.png";
import themes from "../../themes";
import { HOME } from "../../routes";

// TODO remove, this demo shouldn't need to reset the theme.

export const Login = () => {
  const defaultTheme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [userInfo, isError, isSuccess, message, dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) toast.error(message);
    try {
      const userData = {
        nic,
        password,
      };
      dispatch(login(userData)).then((res) => {
        if (res.meta.requestStatus === RequestStatus.Fulfiled) {
          navigate(HOME);
        }
      });
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
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
            xs: "50px 25px 50px 25px",
            sm: "50px 100px 50px 100px",
            lg: "60px 150px 60px 150px",
            xl: "60px 250px 60px 250px",
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
        >
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              padding: {
                xs: "30px",
                md: "150px 50px 150px 50px",
                xl: "150px 50px 150px 50px",
              },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <img src={logo} alt="logo" />
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
                  mt={1}
                  fontWeight={"200"}
                  color={"#3273b7"}
                >
                  / Login
                </Typography>
              </Box>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              mt={defaultTheme.spacing(3)}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="nic"
                label="NIC"
                name="nic"
                autoComplete="nic"
                autoFocus
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
              <TextField
                sx={{ mt: defaultTheme.spacing(3) }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: defaultTheme.spacing(3),
                  width: "124px",
                  borderRadius: "25px",
                  boxShadow: "none",
                  padding: "10px",
                }}
                disabled={!nic || !password}
              >
                Sign In
              </Button>
              <Divider sx={{ mt: 4, mb: 3 }} />
              <Grid container>
                <Grid item xs={12}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Link to="/register">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
