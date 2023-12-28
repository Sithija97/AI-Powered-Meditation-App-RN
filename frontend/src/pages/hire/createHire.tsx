// material-ui
import { Box, Toolbar, Typography } from '@mui/material';
import { Dashboard } from '../../layouts';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const Hire = () => (
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
     
    </Box>

    
    
  </Dashboard>
);

export default Hire;
