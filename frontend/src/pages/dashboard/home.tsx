import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Dashboard } from "../../layouts";
import { Avatar, Card, FormControl, InputLabel, MenuItem, Select, ThemeProvider, createTheme, useTheme } from "@mui/material";
import banner from "../../assets/images/bg.png";
import truck from "../../assets/images/Logistics-bro.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { RootState, useAppSelector } from "../../store/store";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { UserAnalytics } from "../analytics/userAnalytics";
import { VehicleAnalytics } from "../analytics/vehicleAnalytics";
import { HireAnalytics } from "../analytics/hireAnalytics";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

//nested data is ok, see accessorKeys in ColumnDef below


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const data2 = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Home = () => {
  const theme = useTheme();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);


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
          <Grid container>
            <Grid item xs={12}>
              <Box
                mt={theme.spacing(3.752)}
                p={theme.spacing(4)}
                borderRadius={"20px"}
                sx={{
                  backgroundImage: `url(${banner})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-between"}
                  sx={{ flexDirection: { xs: "column", lg: "row" } }}
                >
                  <Box flexGrow={1}>
                    <Typography variant="h2" sx={{ mb: 4, color: "#717171" }}>
                      {` Hi, Welcome Back ${userInfo?.name}`}
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '28px', boxShadow: theme.shadows[1] }}>
                              <Avatar sx={{ width: 72, height: 72, background: theme.palette.background.paper, border: `1px solid #EBEBEB`, marginRight: '20px' }}>
                                <Avatar sx={{ width: 48, height: 48, boxShadow: theme.shadows[5], background: theme.palette.background.paper }}>
                                  <AttachMoneyIcon color="primary" />
                                </Avatar>
                              </Avatar>
                              <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant="h1" color={"#1E88E5 "}>
                                  120,0000
                                </Typography>

                                <Typography variant="h3" sx={{ opacity: 0.72, mt: 1 }}>
                                  Hire Income
                                </Typography>
                              </Box>

                            </Box>
                          </Grid>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '28px', boxShadow: theme.shadows[1] }}>
                              <Avatar sx={{ width: 72, height: 72, background: theme.palette.background.paper, border: `1px solid #EBEBEB`, marginRight: '20px' }}>
                                <Avatar sx={{ width: 48, height: 48, boxShadow: theme.shadows[5], background: theme.palette.background.paper }}>
                                  <DirectionsBusIcon color="primary" />
                                </Avatar>
                              </Avatar>
                              <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant="h1" color={"#1E88E5 "}>
                                  12
                                </Typography>

                                <Typography variant="h3" sx={{ opacity: 0.72, mt: 1 }}>
                                  Hire Count
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item lg={4} md={6} sm={6} xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '28px', boxShadow: theme.shadows[1] }}>
                              <Avatar sx={{ width: 72, height: 72, background: theme.palette.background.paper, border: `1px solid #EBEBEB`, marginRight: '20px' }}>
                                <Avatar sx={{ width: 48, height: 48, boxShadow: theme.shadows[5], background: theme.palette.background.paper }}>
                                  <MonetizationOnOutlinedIcon color="primary"/>
                                </Avatar>
                              </Avatar>
                              <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant="h1" color={"#1E88E5 "}>
                                  10,0000
                                </Typography>

                                <Typography variant="h3" sx={{ opacity: 0.72, mt: 1 }}>
                                  Hire Expenses
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box
                    sx={{
                      order: { xs: 1, md: 2 },
                      mb: { xs: theme.spacing(2), md: 0 },
                      mt: { xs: theme.spacing(7), lg: "-7rem" },
                      ml: "2rem",
                    }}
                  >
                    <img
                      src={truck}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        padding: 0,
                        margin: 0,
                      }}
                      alt="user-img"
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid sx={{ marginTop: '28px' }} container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <UserAnalytics />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <VehicleAnalytics />
            </Grid>
          </Grid>

          {/* <Grid sx={{marginTop:'28px'}} container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                  <HireAnalytics/>
            </Grid>

          </Grid> */}
          <Box sx={{ marginTop: '28px' }}
            boxShadow={"0px 1px 18px 1px #BFD5EB"}
            padding={theme.spacing(5)}
          >
            <Typography flex={1} variant="h3" mb={4}>Hire Anlytics</Typography>
            <Grid container spacing={3}>


              <Grid item xs={12} md={8} lg={8}>
                <Card sx={{ p: 4, boxShadow: theme.shadows[2] }} >
                  <Box display={'flex'} alignItems={'center'} mb={5}>
                    <Typography flex={1} variant="h3">Hire Income</Typography>
                    <Box flex={1}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                        >
                          <MenuItem value={10}>Today</MenuItem>
                          <MenuItem value={20}>Yesterday</MenuItem>
                          <MenuItem value={30}>Last Week</MenuItem>
                          <MenuItem value={40}>Last Month</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Bar options={options} data={data} />;
                </Card>
              </Grid>

              <Grid item xs={12} md={4} lg={4}>
                <Card sx={{ p: 4, boxShadow: theme.shadows[2] }}>
                  <Typography flex={1} variant="h3" mb={4}>Hire Expenses</Typography>
                  <Doughnut data={data2} />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Dashboard>
  );
};
