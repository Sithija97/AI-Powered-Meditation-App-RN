import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import CommuteIcon from "@mui/icons-material/Commute";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { HOME } from "../routes";

export const MainListItems = () => {
  const customization = useSelector((state: any) => state.customization);
  const navigate = useNavigate();
  const item = {
    borderTop: `1px solid #ddd`,
    height: 52,
  };
  return (
    <React.Fragment>
      <ListItemButton selected={true} sx={item} onClick={() => navigate(HOME)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <Divider orientation="vertical" sx={{ borderRightWidth: 2, mr: 3 }} />
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton sx={item} onClick={() => navigate("/vehicles")}>
        <ListItemIcon>
          <CommuteIcon />
        </ListItemIcon>
        <Divider orientation="vertical" sx={{ borderRightWidth: 2, mr: 3 }} />
        <ListItemText primary="Vehicles" />
      </ListItemButton>
      <ListItemButton sx={item} onClick={() => navigate("/users")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Divider orientation="vertical" sx={{ borderRightWidth: 2, mr: 3 }} />
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton sx={item} onClick={() => navigate("/hire")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <Divider orientation="vertical" sx={{ borderRightWidth: 2, mr: 3 }} />
        <ListItemText primary="Hire" />
      </ListItemButton>
      <ListItemButton sx={item} disabled>
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <Divider orientation="vertical" sx={{ borderRightWidth: 2, mr: 3 }} />
        <ListItemText primary="Expenses" />
      </ListItemButton>
      <ListItemButton sx={item} disabled>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <Divider orientation="vertical" sx={{ borderRightWidth: 2, mr: 3 }} />
        <ListItemText primary="Settings" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
