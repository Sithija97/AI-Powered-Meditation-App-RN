import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Dashboard } from "../layouts";
import { Card } from "@mui/material";
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
import { RootState, useAppSelector } from "../store/store";

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
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
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
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            {` Hi, Welcome Back ${userInfo.name}`}
          </Typography>

          <Grid sx={{ mb: 3 }} container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">120</Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Users
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">100</Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Vehicles
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">180</Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Hires
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ py: 5, boxShadow: 0, textAlign: "center" }}>
                <Typography variant="h3">160</Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  Transactions
                </Typography>
              </Card>
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
