import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AccountCircle, AssignmentInd, Logout } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { logout } from "../store/auth/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Avatar, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth: number = 301;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface IProps {
  open: boolean;
  toggleDrawer: () => void;
}

export const Appbar = ({ open, toggleDrawer }: IProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <AppBar position="absolute" open={open}
    sx={{zIndex:1200}}>
      <Toolbar
        sx={{
          pr: "40px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
         
        </Typography>
        {/* <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        {userInfo && (
          <div>
            
            <Avatar
            id="profile_btn"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            sx={{
              marginRight: '20px',
              cursor: 'pointer',
              width: 42, 
              height: 42
            }}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
          />
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AssignmentInd fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        )}
         <Avatar
        id="notification_btn"
        sx={{
          color: '#1E88E5',
          backgroundColor: theme.palette.background.paper,
          border:`1px solid #ddd`,
          margin: '0 20px 0 0',
          cursor:'pointer'
        }}
      >
       <NotificationsActiveOutlinedIcon/>
      </Avatar>
         <Avatar
        id="logout_btn"
        sx={{
          color: '#1E88E5',
          backgroundColor: theme.palette.background.paper,
          border:`1px solid #ddd`,
          margin: '0 8px 0 0',
          cursor:'pointer'
        }}
      >
       <LogoutIcon/>
      </Avatar>
      </Toolbar>
    </AppBar>
  );
};
