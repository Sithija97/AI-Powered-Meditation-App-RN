import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Dashboard } from "../../layouts";
import { Card, useTheme } from "@mui/material";
import banner from "../../assets/images/banner.png";
import truck from "../../assets/images/old-truck.png";
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
                    <Typography variant="h2" sx={{ mb: 4, color: "#fff" }}>
                      {/* {` Hi, Welcome Back ${userInfo?.name}`} */}
                    </Typography>
                    <Grid sx={{ mb: 3 }} container spacing={3}>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                          <Typography variant="h1" color={"#E9833D "}>
                            120
                          </Typography>

                          <Typography variant="h3" sx={{ opacity: 0.72 }}>
                            Users
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                          <Typography variant="h1" color={"#E9833D "}>
                            120
                          </Typography>

                          <Typography variant="h3" sx={{ opacity: 0.72 }}>
                            Users
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                          <Typography variant="h1" color={"#E9833D "}>
                            120
                          </Typography>

                          <Typography variant="h3" sx={{ opacity: 0.72 }}>
                            Users
                          </Typography>
                        </Card>
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

          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Card sx={{ p: 4, boxShadow: 0 }}>
                <Bar options={options} data={data} />;
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Card sx={{ p: 4, boxShadow: 0 }}>
                <Doughnut data={data2} />
              </Card>
            </Grid>
          </Grid>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Dashboard>
  );
};
