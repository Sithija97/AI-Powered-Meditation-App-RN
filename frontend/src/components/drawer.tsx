import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems } from ".";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import sidebarimg from '../assets/images/asset.png';

const drawerWidth: number = 301;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
    },
    whiteSpace: "nowrap",
    width: drawerWidth,
    background:"#FCEFE6",
    boxShadow:"inset 0px 1px 18px 1px #fdc59e",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
      [theme.breakpoints.down("sm")]: {
        display:'none'
      },
    }),
  },
}));

interface IProps {
  open: boolean;
  toggleDrawer: () => void;
}

export const Sidebar = ({ open, toggleDrawer }: IProps) => {
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {open ? 
      <>
       <Box  sx={{ display: 'flex', justifyContent: 'center',marginTop: theme.spacing(2)}}>
        <Avatar
          alt="Remy Sharp"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          sx={{ width: 90, height: 90, boxShadow: theme.shadows[3], border: `6px solid ${theme.palette.background.paper}` }}/>
      </Box>
       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(2) }}>
       <Typography variant='h4' align="center" sx={{}}  >Hi, Paul Van </Typography>
     </Box>
      </>
       
      :
      <></>
    }
      
     
      <Box sx={{marginTop: theme.spacing(2) }}>
      <List component="nav">
        <MainListItems />
        {/* <Divider sx={{ my: 1 }} />
        {secondaryListItems} */}
      </List>
      </Box>
      <img src={sidebarimg} style={{position:'absolute',bottom:0,width:'100%'}} alt="sidebar-img"/>
    </Drawer>
  );
};
